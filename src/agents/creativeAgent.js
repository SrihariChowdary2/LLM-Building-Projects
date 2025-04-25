import BaseAgent from './baseAgent.js';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

export default class CreativeAgent extends BaseAgent {
  constructor(model, serialNumber = 'CA001') {
    const systemPrompt = "You are a creative assistant that helps generate innovative ideas and content. You excel at brainstorming, storytelling, and thinking outside the box. Provide unique perspectives and creative solutions to problems.";
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
      console.error(`Error in CreativeAgent (${this.serialNumber}):`, error);
      return "Sorry, I encountered an error while generating creative content for your query.";
    }
  }
}