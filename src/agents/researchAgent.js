import BaseAgent from './baseAgent.js';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

export default class ResearchAgent extends BaseAgent {
  constructor(model, serialNumber = 'RA001') {
    const systemPrompt = "You are a research assistant that provides detailed information on topics. You excel at finding and presenting comprehensive information in a clear, structured format. Always cite sources when possible.";
    super(model, systemPrompt, serialNumber);
  }

  async processQuery(query) {
    try {
      const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(this.systemPrompt),
        HumanMessagePromptTemplate.fromTemplate("{input}")
      ]);

      const chain = RunnableSequence.from([
        chatPrompt,
        this.model
      ]);

      const response = await chain.invoke({ input: query });
      return response.content;
    } catch (error) {
      console.error(`Error in ResearchAgent (${this.serialNumber}):`, error);
      return "Sorry, I encountered an error while researching your query.";
    }
  }
}