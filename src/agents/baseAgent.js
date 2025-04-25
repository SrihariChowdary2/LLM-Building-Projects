// Base Agent class that all agents will extend
export default class BaseAgent {
  constructor(model, systemPrompt, serialNumber) {
    this.model = model;
    this.systemPrompt = systemPrompt;
    this.serialNumber = serialNumber;
  }

  // Method to process a query
  async processQuery(query) {
    try {
      // This method should be overridden by subclasses
      throw new Error('processQuery method must be implemented by subclasses');
    } catch (error) {
      console.error(`Error processing query with agent ${this.serialNumber}:`, error);
      return "Sorry, I encountered an error processing your request.";
    }
  }

  // Method to get agent information
  getInfo() {
    return {
      serialNumber: this.serialNumber,
      systemPrompt: this.systemPrompt,
      model: this.model.model || 'unknown'
    };
  }
}