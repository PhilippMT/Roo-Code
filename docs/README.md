# Roo Code Wiki

Welcome to the Roo Code Wiki! This documentation provides comprehensive information about Roo Code, an AI-powered autonomous coding agent that lives in your editor.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Features](#features)
- [Modes](#modes)
- [AI Providers](#ai-providers)
- [Tools](#tools)
- [Customization](#customization)
- [Advanced Usage](#advanced-usage)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## Introduction

Roo Code (previously known as Roo Cline) is a VS Code extension that provides an AI-powered autonomous coding agent. It can communicate in natural language, read and write files directly in your workspace, run terminal commands, automate browser actions, and integrate with various AI models.

Whether you're seeking a flexible coding partner, a system architect, or specialized roles like a QA engineer or product manager, Roo Code can help you build software more efficiently.

## Getting Started

### Installation

1. Install Roo Code from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=RooVeterinaryInc.roo-cline)
2. Connect your AI provider in the settings
3. Start using Roo Code by opening the chat interface

### Quick Start

1. Open the Roo Code panel by clicking on the Roo Code icon in the activity bar
2. Select your preferred AI provider and model
3. Start a conversation with Roo Code by typing in the chat interface
4. Try asking Roo Code to help you with a coding task

## Features

Roo Code comes with a wide range of features to help you with your coding tasks:

- **Natural Language Communication**: Interact with Roo Code using natural language
- **Code Generation**: Generate code from natural language descriptions
- **Refactoring & Debugging**: Get help with refactoring and debugging your code
- **Documentation**: Write and update documentation for your code
- **Codebase Understanding**: Ask questions about your codebase
- **Task Automation**: Automate repetitive tasks
- **Project Creation**: Create new files and projects

## Modes

Roo Code adapts to your needs with specialized modes:

### Built-in Modes

- **Code Mode**: For general-purpose coding tasks
- **Architect Mode**: For planning and technical leadership
- **Ask Mode**: For answering questions and providing information
- **Debug Mode**: For systematic problem diagnosis

### Custom Modes

You can create unlimited specialized personas for security auditing, performance optimization, documentation, or any other task. Custom modes allow you to define:

- Custom instructions for the AI
- Specific tools and capabilities
- Specialized knowledge and expertise

## AI Providers

Roo Code supports multiple AI providers, allowing you to choose the one that best fits your needs:

- **Anthropic Claude**: High-quality AI models with strong reasoning capabilities
- **OpenAI**: GPT-4 and other models for versatile coding assistance
- **AWS Bedrock**: Access to various foundation models through AWS
- **Google Vertex AI**: Google's AI models for coding assistance
- **Local Models**: Run models locally for privacy and offline use
- **Custom Endpoints**: Connect to your own AI endpoints

### Claude 3.7 Sonnet with Extended Thinking

Roo Code supports Claude 3.7 Sonnet's extended thinking capabilities, which allows the model to perform step-by-step reasoning before providing a response. This feature is available through both the Anthropic API and AWS Bedrock.

The extended thinking feature can be configured with an adjustable thinking budget, which controls how many tokens the model can use for its internal reasoning process. This budget is clamped between a minimum of 1024 tokens and a maximum of 80% of the model's total token limit.

## Tools

Roo Code comes with powerful tools that extend its capabilities:

### File Operations

- Read and write files in your project
- Create new files and directories
- Modify existing files

### Terminal Integration

- Execute commands in your VS Code terminal
- View and analyze command output
- Automate command sequences

### Web Browser Control

- Control a web browser for research and automation
- Interact with web applications
- Fetch information from the web

### MCP (Model Context Protocol)

MCP extends Roo Code's capabilities by allowing you to add unlimited custom tools. Integrate with external APIs, connect to databases, or create specialized development tools - MCP provides the framework to expand Roo Code's functionality to meet your specific needs.

## Customization

Make Roo Code work your way with various customization options:

### Custom Instructions

Provide custom instructions to guide Roo Code's behavior and responses. You can specify:

- Coding style preferences
- Documentation standards
- Project-specific requirements

### Auto-Approval Settings

Configure which actions Roo Code can perform without explicit approval:

- File operations
- Terminal commands
- Web browser actions

### Model Settings

Fine-tune the AI model's behavior:

- Temperature (creativity level)
- Maximum token limit
- Thinking budget for supported models

## Advanced Usage

### Prompt Caching

Roo Code supports prompt caching for compatible models, which can significantly improve response times and reduce token usage for repeated or similar queries.

### Extended Thinking

For supported models like Claude 3.7 Sonnet, Roo Code provides extended thinking capabilities with an adjustable thinking budget. This allows the model to perform more thorough reasoning before responding.

### Multi-language Support

Roo Code supports multiple languages for both the user interface and code generation. It can understand and generate code in various programming languages.

## Contributing

We welcome contributions to Roo Code! Here's how you can contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please read the [CONTRIBUTING.md](../CONTRIBUTING.md) file for detailed guidelines.

## Troubleshooting

### Common Issues

- **API Key Issues**: Ensure your API key is correctly configured in the settings
- **Model Availability**: Check if the selected model is available from your provider
- **Permission Errors**: Make sure Roo Code has the necessary permissions to access files and run commands

### Getting Help

If you encounter any issues or have questions, you can:

- Join the [Discord community](https://discord.gg/roocode)
- Visit the [Reddit community](https://www.reddit.com/r/RooCode/)
- Report issues on [GitHub](https://github.com/RooVetGit/Roo-Code/issues)

