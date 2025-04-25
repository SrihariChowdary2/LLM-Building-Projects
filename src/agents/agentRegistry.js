// Agent Registry to manage all agents and handle routing based on serial numbers
export default class AgentRegistry {
  constructor() {
    this.agents = new Map();
    this.serialNumberMap = new Map();
    this.defaultAgent = null;
  }

  // Register an agent with the registry
  registerAgent(agent, isDefault = false) {
    const serialNumber = agent.serialNumber;
    
    if (this.agents.has(serialNumber)) {
      console.warn(`Agent with serial number ${serialNumber} already exists. Overwriting.`);
    }
    
    this.agents.set(serialNumber, agent);
    
    // Store mapping from agent type to serial number for backward compatibility
    const agentType = this.getAgentTypeFromSerialNumber(serialNumber);
    if (agentType) {
      this.serialNumberMap.set(agentType, serialNumber);
    }
    
    // Set as default agent if specified or if it's the first agent
    if (isDefault || this.agents.size === 1) {
      this.defaultAgent = serialNumber;
    }
    
    return this;
  }

  // Get agent by serial number
  getAgent(serialNumber) {
    // If serialNumber is actually an agent type (for backward compatibility)
    if (this.serialNumberMap.has(serialNumber)) {
      serialNumber = this.serialNumberMap.get(serialNumber);
    }
    
    return this.agents.get(serialNumber) || this.agents.get(this.defaultAgent);
  }

  // Get all registered agents
  getAllAgents() {
    return Array.from(this.agents.values());
  }

  // Get all serial numbers
  getAllSerialNumbers() {
    return Array.from(this.agents.keys());
  }

  // Route a query to the appropriate agent based on serial number
  async routeQuery(query, serialNumber) {
    const agent = this.getAgent(serialNumber);
    
    if (!agent) {
      console.error(`No agent found for serial number: ${serialNumber}`);
      return "Sorry, I couldn't find an agent to handle your request.";
    }
    
    try {
      return await agent.processQuery(query);
    } catch (error) {
      console.error(`Error routing query to agent ${serialNumber}:`, error);
      return "Sorry, I encountered an error processing your request.";
    }
  }

  // Helper method to extract agent type from serial number
  getAgentTypeFromSerialNumber(serialNumber) {
    const prefix = serialNumber.substring(0, 2).toLowerCase();
    
    switch (prefix) {
      case 'ra':
        return 'research';
      case 'ca':
        return 'creative';
      case 'co':
        return 'code';
      case 'ps':
        return 'project';
      default:
        return null;
    }
  }
}