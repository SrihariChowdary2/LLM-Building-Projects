# Agent System Documentation

## Overview

The agent system is a modular framework for creating and managing AI agents with different capabilities. Each agent has a unique serial number that can be used to route queries to the appropriate agent. The system is designed to be extensible, allowing for the addition of new agent types as needed.

## Agent Types

The system currently includes the following agent types:

1. **Research Agent (RA001)** - Provides detailed information on topics, excels at finding and presenting comprehensive information.
2. **Creative Agent (CA001)** - Helps generate innovative ideas and content, excels at brainstorming and thinking outside the box.
3. **Code Agent (CO001)** - Helps write and explain code, provides clean, efficient, and well-documented code examples.
4. **Project Structure Agent (PS001)** - Helps design and organize software projects, creates logical file and directory structures.

## Architecture

The agent system consists of the following components:

### BaseAgent

The `BaseAgent` class is the foundation for all agent implementations. It provides common functionality and defines the interface that all agents must implement.

```javascript
class BaseAgent {
  constructor(model, systemPrompt, serialNumber) {
    this.model = model;
    this.systemPrompt = systemPrompt;
    this.serialNumber = serialNumber;
  }

  async processQuery(query) {
    // Must be implemented by subclasses
  }

  getInfo() {
    // Returns agent information
  }
}
```

### Agent Implementations

Each agent type extends the `BaseAgent` class and implements the `processQuery` method to handle queries specific to its domain.

```javascript
class ResearchAgent extends BaseAgent {
  constructor(model, serialNumber = 'RA001') {
    const systemPrompt = "You are a research assistant...";
    super(model, systemPrompt, serialNumber);
  }

  async processQuery(query) {
    // Implementation specific to research queries
  }
}
```

### AgentRegistry

The `AgentRegistry` class manages all agents and handles routing based on serial numbers.

```javascript
class AgentRegistry {
  constructor() {
    this.agents = new Map();
    this.serialNumberMap = new Map();
    this.defaultAgent = null;
  }

  registerAgent(agent, isDefault = false) {
    // Register an agent
  }

  getAgent(serialNumber) {
    // Get agent by serial number
  }

  async routeQuery(query, serialNumber) {
    // Route query to appropriate agent
  }
}
```

## Using the Agent System

### Initializing the Agent System

The agent system is initialized in the `multiAgentService.js` file:

```javascript
const initMultiAgentService = async () => {
  // Create a Groq chat model
  const model = new ChatGroq({
    apiKey: apiKey,
    model: "llama3-70b-8192",
  });

  // Create agent registry with all agents
  const agentRegistry = createAgentRegistry(model);
  
  // Return service object
  return {
    agentRegistry,
    getAllAgents: () => agentRegistry.getAllAgents(),
    getAllSerialNumbers: () => agentRegistry.getAllSerialNumbers(),
    routeQuery: async (query, serialNumberOrType) => {
      // Route query to appropriate agent
    }
  };
};
```

### Routing Queries

Queries can be routed to agents using their serial numbers:

```javascript
const response = await multiAgentService.routeQuery(
  "What is the capital of France?",
  "RA001" // Research Agent
);
```

For backward compatibility, queries can also be routed using agent types:

```javascript
const response = await multiAgentService.routeQuery(
  "What is the capital of France?",
  "research" // Research Agent
);
```

## Adding New Agents

To add a new agent type:

1. Create a new class that extends `BaseAgent`
2. Implement the `processQuery` method
3. Register the agent with the `AgentRegistry`

Example:

```javascript
// Create a new agent class
class TranslationAgent extends BaseAgent {
  constructor(model, serialNumber = 'TA001') {
    const systemPrompt = "You are a translation assistant...";
    super(model, systemPrompt, serialNumber);
  }

  async processQuery(query) {
    // Implementation specific to translation queries
  }
}

// Register the agent
agentRegistry.registerAgent(new TranslationAgent(model));
```

## Serial Number Format

Serial numbers follow the format `XX000` where:
- `XX` is a two-letter code representing the agent type (e.g., RA for Research Agent)
- `000` is a three-digit number that can be incremented for multiple instances of the same agent type

## Best Practices

1. Always use serial numbers for routing queries to ensure consistency
2. When creating new agents, follow the existing pattern and extend the `BaseAgent` class
3. Use descriptive system prompts that clearly define the agent's role and capabilities
4. Handle errors appropriately in the `processQuery` method
5. Register new agents with the `AgentRegistry` to make them available for routing