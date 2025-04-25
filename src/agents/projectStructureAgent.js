import BaseAgent from './baseAgent.js';
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

export default class ProjectStructureAgent extends BaseAgent {
  constructor(model, serialNumber = 'PS001') {
    const systemPrompt = "You are a project structure specialist that helps design and organize software projects. You excel at creating logical file and directory structures, following best practices for different types of applications. Always provide clear explanations for your design decisions.";
    super(model, systemPrompt, serialNumber);
  }

  async processQuery(query) {
    try {
      const enhancedQuery = `Generate a project structure based on this description: ${query}. Format the response as a directory tree with explanations for each file.`;
      
      const chatPrompt = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(this.systemPrompt),
        HumanMessagePromptTemplate.fromTemplate("{input}")
      ]);

      const chain = RunnableSequence.from([
        chatPrompt,
        this.model
      ]);

      const response = await chain.invoke({ input: enhancedQuery });
      return response.content;
    } catch (error) {
      console.error(`Error in ProjectStructureAgent (${this.serialNumber}):`, error);
      return "Sorry, I encountered an error while generating the project structure.";
    }
  }
}