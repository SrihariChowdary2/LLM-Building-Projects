import { 
  ChatPromptTemplate, 
  HumanMessagePromptTemplate, 
  SystemMessagePromptTemplate 
} from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatGroq } from "@langchain/groq";

// Initialize Multi Agent Service using LangChain
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

    // Create different agents with specific system prompts
    const createAgent = (systemPrompt, agentName) => {
      const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(systemPrompt),
        HumanMessagePromptTemplate.fromTemplate("{input}")
      ]);

      return RunnableSequence.from([
        chatPrompt,
        model
      ]);
    };

    // Create specialized agents
    const researchAgent = createAgent(
      "You are a research assistant that provides detailed information on topics.",
      "Research Agent"
    );

    const creativeAgent = createAgent(
      "You are a creative assistant that helps generate innovative ideas and content.",
      "Creative Agent"
    );

    const codeAgent = createAgent(
      "You are a coding assistant that helps write and explain code.",
      "Code Agent"
    );

    console.log("Multi Agent Service initialized successfully");

    return {
      researchAgent,
      creativeAgent,
      codeAgent,
      // Function to route queries to appropriate agent
      routeQuery: async (query, agentType) => {
        let agent;
        switch (agentType) {
          case 'research':
            agent = researchAgent;
            break;
          case 'creative':
            agent = creativeAgent;
            break;
          case 'code':
            agent = codeAgent;
            break;
          default:
            agent = researchAgent;
        }

        try {
          const response = await agent.invoke({ input: query });
          return response.content;
        } catch (error) {
          console.error(`Error with ${agentType} agent:`, error);
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
