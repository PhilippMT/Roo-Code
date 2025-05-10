# AWS Bedrock Extended Thinking

This document provides information about the extended thinking feature for AWS Bedrock models, specifically for Claude 3.7 Sonnet.

## Overview

Extended thinking is a feature that allows Claude 3.7 Sonnet to perform step-by-step reasoning before providing a response. This can lead to more accurate and thoughtful answers, especially for complex tasks that require careful analysis.

The extended thinking feature works by allocating a portion of the model's token budget to internal reasoning. This reasoning is then used to guide the model's final response.

## Supported Models

Currently, the extended thinking feature is supported by the following AWS Bedrock models:

- `anthropic.claude-3-7-sonnet-20250219-v1:0:thinking`

## Configuration

### Thinking Budget

The thinking budget controls how many tokens the model can use for its internal reasoning process. This budget is configurable through the Roo Code settings.

The thinking budget is clamped between:
- **Minimum**: 1024 tokens
- **Maximum**: 80% of the model's total token limit

This ensures that the model has enough tokens for meaningful reasoning while still leaving enough tokens for the final response.

### Setting the Thinking Budget

You can set the thinking budget in the Roo Code settings:

1. Open VS Code settings
2. Search for "Roo Code"
3. Find the "Model Max Thinking Tokens" setting
4. Enter your desired thinking budget

## Usage

To use the extended thinking feature with AWS Bedrock:

1. Select "AWS Bedrock" as your AI provider
2. Choose the `anthropic.claude-3-7-sonnet-20250219-v1:0:thinking` model
3. Configure your thinking budget (optional)
4. Start using Roo Code as usual

## Benefits

Extended thinking provides several benefits:

- **Improved Reasoning**: The model can work through complex problems step-by-step
- **Better Code Generation**: More thorough analysis leads to better code solutions
- **Enhanced Problem Solving**: The model can explore multiple approaches before settling on a solution
- **Reduced Errors**: More careful reasoning helps catch potential issues before they appear in the final response

## Technical Implementation

The extended thinking feature is implemented by adding a `thinking` configuration to the AWS Bedrock API request. This configuration includes:

- `enabled`: Set to `true` to enable extended thinking
- `budget_tokens`: The number of tokens allocated for thinking

The implementation ensures that the thinking budget is properly clamped and that the model ID is correctly handled (the `:thinking` suffix is removed before making the API request).

## Example

Here's an example of how the extended thinking feature works:

1. You ask Roo Code to solve a complex coding problem
2. The model uses its thinking budget to analyze the problem, explore different approaches, and reason through the solution
3. The model then provides a final response based on its reasoning

## Limitations

- Extended thinking uses more tokens, which may impact usage costs
- The thinking process may take longer than standard responses
- Not all models support extended thinking

## Comparison with Direct Anthropic API

The extended thinking feature in AWS Bedrock works similarly to the same feature in the direct Anthropic API, but with some AWS-specific implementation details. Both implementations use the same core concept of allocating a token budget for internal reasoning.

