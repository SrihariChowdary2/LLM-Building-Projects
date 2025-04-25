import { ChatGroq } from "@langchain/groq";
import { createAgentRegistry } from '../agents/index.js';

// Initialize Multi Agent Service using LangChain and the new agent system
const initMultiAgentService = async () => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('Groq API key not found. Please check your environment variables.');
    }

    // Create a Groq chat model through LangChain
    const model = new ChatGroq({
      apiKey: apiKey,
      model: "llama3-70b-8192", // Using Llama 3 model from Groq
    });

    // Create agent registry with all agents
    const agentRegistry = createAgentRegistry(model);

    console.log("Multi Agent Service initialized successfully with serial number routing");
    console.log("Available agents:", agentRegistry.getAllSerialNumbers());

    // Return an object with the same interface as before for backward compatibility
    return {
      // Legacy agent references (for backward compatibility)
      researchAgent: agentRegistry.getAgent('research'),
      creativeAgent: agentRegistry.getAgent('creative'),
      codeAgent: agentRegistry.getAgent('code'),

      // New properties
      agentRegistry,
      getAllAgents: () => agentRegistry.getAllAgents(),
      getAllSerialNumbers: () => agentRegistry.getAllSerialNumbers(),

      // Function to route queries to appropriate agent by serial number
      routeQuery: async (query, serialNumberOrType) => {
        try {
          return await agentRegistry.routeQuery(query, serialNumberOrType);
        } catch (error) {
          console.error(`Error routing query to agent ${serialNumberOrType}:`, error);
          return "Sorry, I encountered an error processing your request.";
        }
      }
    };
  } catch (error) {
    console.error("Failed to initialize Multi Agent Service:", error);
    return null;
  }
};

export default initMultiAgentService;
