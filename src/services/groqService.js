import axios from 'axios';

// Initialize Groq client using axios
const initGroqService = async () => {
  try {
    const apiKey = import.meta.env.VITE_API_SECRET_KEY;
    if (!apiKey) {
      throw new Error('API secret key not found. Please check your environment variables.');
    }

    const groqClient = {
      chat: {
        completions: {
          create: async (params) => {
            const response = await axios.post(
              'http://localhost:3000/api/chat',
              {
                messages: params.messages || [],
                model: params.model || 'meta-llama/llama-4-scout-17b-16e-instruct',
                temperature: params.temperature || 1,
                max_completion_tokens: params.max_tokens || 1024,
                top_p: params.top_p || 1,
                stream: params.stream || true,
                stop: params.stop || null
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': apiKey
                }
              }
            );
            return response.data;
          }
        }
      }
    };

    console.log("Groq LLM service initialized successfully using middleware");
    return groqClient;
  } catch (error) {
    console.error("Failed to initialize Groq LLM service:", error);
    return null;
  }
};

export default initGroqService;
