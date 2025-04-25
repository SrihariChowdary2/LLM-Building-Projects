// Function to set up the chat UI
export const setupChatUI = (multiAgentService) => {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-message');
  const agentTypeSelect = document.getElementById('agent-type');

  // Function to add a message to the chat
  const addMessage = (text, isUser) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Function to handle sending a message
  const sendMessage = async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, true);

    // Clear input
    userInput.value = '';

    // Get selected agent type
    const agentType = agentTypeSelect.value;

    try {
      // Show loading indicator
      const loadingDiv = document.createElement('div');
      loadingDiv.classList.add('message', 'ai-message');
      loadingDiv.textContent = 'Thinking...';
      chatMessages.appendChild(loadingDiv);

      // Get response from selected agent
      if (multiAgentService) {
        const response = await multiAgentService.routeQuery(message, agentType);

        // Remove loading indicator
        chatMessages.removeChild(loadingDiv);

        // Add AI response to chat
        addMessage(response, false);
      } else {
        // Remove loading indicator
        chatMessages.removeChild(loadingDiv);

        // Add error message if service is not available
        addMessage("Sorry, the AI service is not available at the moment. Please check your API key configuration.", false);
      }
    } catch (error) {
      console.error('Error getting response:', error);

      // Remove loading indicator if it exists
      const loadingElement = chatMessages.querySelector('.ai-message:last-child');
      if (loadingElement && loadingElement.textContent === 'Thinking...') {
        chatMessages.removeChild(loadingElement);
      }

      // Add error message
      addMessage("Sorry, there was an error processing your request. Please try again later.", false);
    }
  };

  // Add event listener for send button
  sendButton.addEventListener('click', sendMessage);

  // Add event listener for Enter key in textarea
  userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  // Add initial message
  addMessage("Hello! I'm your AI assistant powered by Groq. How can I help you today?", false);
};