# Project Builder & Chat Assistant with Groq LLM

This project is a web application that combines a project builder interface with an AI-powered chat assistant using Groq's LLM services and a multi-agent system.

## Features

- **Project Builder**: Create and manage your projects with intuitive tools
- **AI Chat Assistant**: Get help from AI-powered assistants with different specializations:
  - **Research Assistant**: Provides detailed information on various topics
  - **Creative Assistant**: Helps generate innovative ideas and content
  - **Code Assistant**: Assists with writing and explaining code
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

3. Set up your Groq API key:
   - Sign up for a Groq account at [https://console.groq.com/](https://console.groq.com/) if you don't have one
   - Get your API key from the Groq console
   - Create a `.env` file in the project root with the following content:
     ```
     GROQ_API_KEY=your_api_key_here
     ```
   - Alternatively, you can directly replace the placeholder in the code:
     - Open `src/services/groqService.js` and `src/services/multiAgentService.js`
     - Find the line with `apiKey: process.env.GROQ_API_KEY || "your-api-key-here"`
     - Replace `"your-api-key-here"` with your actual Groq API key

### Running the Application

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## Using the AI Assistant

1. Select the type of assistant you want to interact with from the dropdown menu:
   - Research Assistant: For factual information and detailed explanations
   - Creative Assistant: For generating ideas, content, and creative suggestions
   - Code Assistant: For help with programming and code explanations

2. Type your question or request in the text area

3. Press the "Send" button or hit Enter to submit your message

4. Wait for the AI to respond (you'll see a "Thinking..." indicator while it processes)

## Technical Details

This project uses:
- Vite for frontend tooling
- Groq API for LLM services
- LangChain for the multi-agent system
- Vanilla JavaScript for the UI

## Project Structure

The project follows a modular architecture for better maintainability and scalability:

```
src/
├── components/           # UI components
│   ├── chatComponent.js  # Chat UI functionality
│   └── counterComponent.js # Counter demo functionality
├── services/             # External service integrations
│   ├── groqService.js    # Groq LLM service initialization
│   └── multiAgentService.js # Multi-agent system using LangChain
├── styles/               # CSS styles
│   └── main.css          # Main stylesheet
└── index.js              # Application entry point

public/                   # Static assets
├── fonts/                # Font files
├── style.css             # Base styles
└── *.svg                 # SVG assets
```

- **components/**: Contains UI-related functionality
- **services/**: Contains external service integrations and business logic
- **styles/**: Contains CSS stylesheets
- **index.js**: Main entry point that initializes services and components

## Troubleshooting

If you encounter issues with the AI assistant:

1. Check that your Groq API key is correctly set up
2. Ensure you have an active internet connection
3. Check the browser console for any error messages
4. Make sure you have sufficient API credits in your Groq account

## License

This project is licensed under the MIT License - see the LICENSE file for details.
