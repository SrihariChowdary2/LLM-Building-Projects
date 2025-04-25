import BaseAgent from './baseAgent.js';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

export default class CodeAgent extends BaseAgent {
  constructor(model, serialNumber = 'CO001') {
    const systemPrompt = "You are a coding assistant that helps write and explain code. You excel at providing clean, efficient, and well-documented code examples. Always explain your code and consider best practices and potential edge cases.";
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
      console.error(`Error in CodeAgent (${this.serialNumber}):`, error);
      return "Sorry, I encountered an error while generating code for your query.";
    }
  }
}