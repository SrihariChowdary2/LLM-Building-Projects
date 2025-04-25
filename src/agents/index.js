// Export all agent classes and the registry
import BaseAgent from './baseAgent.js';
import ResearchAgent from './researchAgent.js';
import CreativeAgent from './creativeAgent.js';
import CodeAgent from './codeAgent.js';
import ProjectStructureAgent from './projectStructureAgent.js';
import AgentRegistry from './agentRegistry.js';

export {
  BaseAgent,
  ResearchAgent,
  CreativeAgent,
  CodeAgent,
  ProjectStructureAgent,
  AgentRegistry
};

// Helper function to create a registry with all agents
export const createAgentRegistry = (model) => {
  const registry = new AgentRegistry();
  
  // Register all agents
  registry.registerAgent(new ResearchAgent(model));
  registry.registerAgent(new CreativeAgent(model));
  registry.registerAgent(new CodeAgent(model));
  registry.registerAgent(new ProjectStructureAgent(model));
  
  return registry;
};