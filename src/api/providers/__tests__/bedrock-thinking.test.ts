// npx jest src/api/providers/__tests__/bedrock-thinking.test.ts

import { AwsBedrockHandler } from "../bedrock"
import { ProviderSettings } from "../../../schemas"

// Mock AWS SDK credential providers and Bedrock client
jest.mock("@aws-sdk/credential-providers", () => ({
	fromIni: jest.fn().mockReturnValue({}),
}))

// Mock the BedrockRuntimeClient
let mockSend = jest.fn()
jest.mock("@aws-sdk/client-bedrock-runtime", () => {
	return {
		BedrockRuntimeClient: jest.fn().mockImplementation(() => ({
			send: mockSend,
			config: {
				region: "us-east-1",
			},
		})),
		ConverseStreamCommand: jest.fn(),
		ConverseCommand: jest.fn(),
	}
})

describe("AwsBedrockHandler with thinking", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		mockSend = jest.fn()
		const { BedrockRuntimeClient } = require("@aws-sdk/client-bedrock-runtime")
		BedrockRuntimeClient().send = mockSend
	})

	it("should configure thinking budget correctly for streaming", async () => {
		// Create a handler with the thinking model
		const mockOptions: ProviderSettings = {
			apiProvider: "bedrock",
			apiModelId: "anthropic.claude-3-7-sonnet-20250219-v1:0:thinking",
			awsRegion: "us-east-1",
			modelMaxThinkingTokens: 5000,
		}

		const handler = new AwsBedrockHandler(mockOptions)

		// Spy on the send method to capture the payload
		let capturedPayload: any = null
		mockSend.mockImplementation((command) => {
			capturedPayload = command
			return {
				stream: {
					[Symbol.asyncIterator]: async function* () {
						yield {
							messageStart: { role: "assistant" },
						}
						yield {
							messageStop: { stopReason: "end_turn" },
						}
					},
				},
			}
		})

		// Start a streaming request
		const generator = handler.createMessage("You are a helpful assistant.", [
			{ role: "user", content: "Hello" },
		])
		
		// Consume the generator to trigger the API call
		for await (const _ of generator) {
			// Just consume the generator
		}

		// Verify the thinking configuration was set correctly
		expect(capturedPayload).toBeTruthy()
		expect(capturedPayload.input.inferenceConfig).toHaveProperty("thinking")
		expect(capturedPayload.input.inferenceConfig.thinking).toEqual({
			enabled: true,
			budget_tokens: 5000,
		})
		
		// Verify the model ID was set correctly (without the :thinking suffix)
		expect(capturedPayload.input.modelId).toBe("anthropic.claude-3-7-sonnet-20250219-v1:0")
	})

	it("should clamp thinking budget to at least 1024 tokens", async () => {
		// Create a handler with the thinking model and a small thinking budget
		const mockOptions: ProviderSettings = {
			apiProvider: "bedrock",
			apiModelId: "anthropic.claude-3-7-sonnet-20250219-v1:0:thinking",
			awsRegion: "us-east-1",
			modelMaxThinkingTokens: 500, // Too small, should be clamped to 1024
		}

		const handler = new AwsBedrockHandler(mockOptions)

		// Spy on the send method to capture the payload
		let capturedPayload: any = null
		mockSend.mockImplementation((command) => {
			capturedPayload = command
			return {
				stream: {
					[Symbol.asyncIterator]: async function* () {
						yield {
							messageStart: { role: "assistant" },
						}
						yield {
							messageStop: { stopReason: "end_turn" },
						}
					},
				},
			}
		})

		// Start a streaming request
		const generator = handler.createMessage("You are a helpful assistant.", [
			{ role: "user", content: "Hello" },
		])
		
		// Consume the generator to trigger the API call
		for await (const _ of generator) {
			// Just consume the generator
		}

		// Verify the thinking budget was clamped to the minimum
		expect(capturedPayload.input.inferenceConfig.thinking).toEqual({
			enabled: true,
			budget_tokens: 1024,
		})
	})

	it("should clamp thinking budget to at most 80% of max tokens", async () => {
		// Create a handler with the thinking model and a large thinking budget
		const mockOptions: ProviderSettings = {
			apiProvider: "bedrock",
			apiModelId: "anthropic.claude-3-7-sonnet-20250219-v1:0:thinking",
			awsRegion: "us-east-1",
			modelMaxThinkingTokens: 200000, // Too large, should be clamped to 80% of max tokens
		}

		const handler = new AwsBedrockHandler(mockOptions)

		// Spy on the send method to capture the payload
		let capturedPayload: any = null
		mockSend.mockImplementation((command) => {
			capturedPayload = command
			return {
				stream: {
					[Symbol.asyncIterator]: async function* () {
						yield {
							messageStart: { role: "assistant" },
						}
						yield {
							messageStop: { stopReason: "end_turn" },
						}
					},
				},
			}
		})

		// Start a streaming request
		const generator = handler.createMessage("You are a helpful assistant.", [
			{ role: "user", content: "Hello" },
		])
		
		// Consume the generator to trigger the API call
		for await (const _ of generator) {
			// Just consume the generator
		}

		// Verify the thinking budget was clamped to 80% of max tokens (128000 * 0.8 = 102400)
		expect(capturedPayload.input.inferenceConfig.thinking).toEqual({
			enabled: true,
			budget_tokens: 102400,
		})
	})

	it("should configure thinking budget correctly for non-streaming", async () => {
		// Create a handler with the thinking model
		const mockOptions: ProviderSettings = {
			apiProvider: "bedrock",
			apiModelId: "anthropic.claude-3-7-sonnet-20250219-v1:0:thinking",
			awsRegion: "us-east-1",
			modelMaxThinkingTokens: 5000,
		}

		const handler = new AwsBedrockHandler(mockOptions)

		// Spy on the send method to capture the payload
		let capturedPayload: any = null
		mockSend.mockImplementation((command) => {
			capturedPayload = command
			return {
				output: {
					message: {
						content: [
							{
								text: "Hello, I'm Claude!",
							},
						],
					},
				},
			}
		})

		// Make a non-streaming request
		await handler.completePrompt("Hello")

		// Verify the thinking configuration was set correctly
		expect(capturedPayload).toBeTruthy()
		expect(capturedPayload.input.inferenceConfig).toHaveProperty("thinking")
		expect(capturedPayload.input.inferenceConfig.thinking).toEqual({
			enabled: true,
			budget_tokens: 5000,
		})
		
		// Verify the model ID was set correctly (without the :thinking suffix)
		expect(capturedPayload.input.modelId).toBe("anthropic.claude-3-7-sonnet-20250219-v1:0")
	})
})

