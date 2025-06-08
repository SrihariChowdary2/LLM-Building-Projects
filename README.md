# Project Builder & Chat Assistant with Groq LLM

This project is a web application that combines a project builder interface with an AI-powered chat assistant using Groq's LLM services and a multi-agent system.

## Features

- **Project Builder**: Create and manage your projects with intuitive tools
- **AI Chat Assistant**: Get help from AI-powered assistants with different specializations:
  - **Research Agent (RA001)**: Provides detailed information on various topics
  - **Creative Agent (CA001)**: Helps generate innovative ideas and content
  - **Code Agent (CO001)**: Assists with writing and explaining code
  - **Project Structure Agent (PS001)**: Helps design and organize software projects
- **Demo Counter**: A simple counter demonstration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd node-js-own
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   - Sign up for a Groq account at [https://console.groq.com/](https://console.groq.com/) if you don't have one
   - Get your API key from the Groq console
   - Copy the example environment file:
     ```
     cp .env.example .env
     ```
   - Edit the `.env` file and replace the placeholder values with your actual API keys:
     ```
     GROQ_API_KEY=your_actual_groq_api_key_here
     API_SECRET_KEY=your_secret_key_for_server_auth
     VITE_GROQ_API_KEY=your_actual_groq_api_key_here
     VITE_API_SECRET_KEY=your_secret_key_for_server_auth
     ```

### Running the Application

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Using the AI Assistant

1. Select the agent you want to interact with from the dropdown menu:
   - Research Agent (RA001): For factual information and detailed explanations
   - Creative Agent (CA001): For generating ideas, content, and creative suggestions
   - Code Agent (CO001): For help with programming and code explanations
   - Project Structure Agent (PS001): For designing and organizing software projects

2. Type your question or request in the text area

3. Press the "Send" button or hit Enter to submit your message

4. Wait for the AI to respond (you'll see a "Thinking..." indicator while it processes)

For more detailed information about the agent system, see the [Agent System Documentation](docs/AGENTS.md).

## Technical Details

This project uses:
- Vite for frontend tooling
- Groq API for LLM services
- LangChain for the multi-agent system
- Serial number-based routing for agent selection
- Object-oriented design with inheritance for agent implementation
- Vanilla JavaScript for the UI
- GitHub Actions for CI/CD

## Project Structure

The project follows a modular architecture for better maintainability and scalability:

```
src/
├── agents/               # Agent system
│   ├── baseAgent.js      # Base agent class
│   ├── researchAgent.js  # Research agent implementation
│   ├── creativeAgent.js  # Creative agent implementation
│   ├── codeAgent.js      # Code agent implementation
│   ├── projectStructureAgent.js # Project structure agent implementation
│   ├── agentRegistry.js  # Agent registry for routing
│   └── index.js          # Exports all agent classes
├── components/           # UI components
│   ├── chatComponent.js  # Chat UI functionality
│   ├── counterComponent.js # Counter demo functionality
│   └── projectBuilderComponent.js # Project builder UI
├── services/             # External service integrations
│   ├── groqService.js    # Groq LLM service initialization
│   └── multiAgentService.js # Multi-agent system using agents
├── styles/               # CSS styles
│   └── main.css          # Main stylesheet
└── index.js              # Application entry point

public/                   # Static assets
├── fonts/                # Font files
├── style.css             # Base styles
└── *.svg                 # SVG assets

docs/                     # Documentation
└── AGENTS.md             # Agent system documentation
```

- **agents/**: Contains the agent system implementation
- **components/**: Contains UI-related functionality
- **services/**: Contains external service integrations and business logic
- **styles/**: Contains CSS stylesheets
- **docs/**: Contains project documentation
- **index.js**: Main entry point that initializes services and components

## Troubleshooting

If you encounter issues with the AI assistant:

1. Check that your Groq API key is correctly set up
2. Ensure you have an active internet connection
3. Check the browser console for any error messages
4. Make sure you have sufficient API credits in your Groq account

## License

This project is licensed under the MIT License - see the LICENSE file for details.
