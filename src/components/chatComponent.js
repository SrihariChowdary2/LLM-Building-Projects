// Function to set up the chat UI
export const setupChatUI = (multiAgentService) => {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-message');
  const agentTypeSelect = document.getElementById('agent-type');
  const chatSection = document.getElementById('chat-section');

  // Clear any existing messages when chat is initialized
  if (chatMessages) {
    chatMessages.innerHTML = '';
  }

  // Populate agent dropdown with available agents if the new system is available
  if (multiAgentService?.getAllSerialNumbers && agentTypeSelect) {
    // Clear existing options
    agentTypeSelect.innerHTML = '';

    // Get all agents
    const agents = multiAgentService.getAllAgents();

    // Add options for each agent
    agents.forEach(agent => {
      const option = document.createElement('option');
      option.value = agent.serialNumber;
      option.textContent = `${agent.getInfo().serialNumber} - ${agent.systemPrompt.substring(0, 30)}...`;
      agentTypeSelect.appendChild(option);
    });
  }

  // Function to add a message to the chat
  const addMessage = (text, isUser) => {
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // Function to handle sending a message
  const sendMessage = async () => {
    if (!userInput || !userInput.value.trim()) return;

    const message = userInput.value.trim();

    // Add user message to chat
    addMessage(message, true);

    // Clear input
    userInput.value = '';

    // Get selected agent type
    const agentType = agentTypeSelect?.value || 'RA001'; // Default to Research Agent if no selection

    try {
      // Show loading indicator
      const loadingDiv = document.createElement('div');
      loadingDiv.classList.add('message', 'ai-message');
      loadingDiv.textContent = 'Thinking...';
      chatMessages?.appendChild(loadingDiv);

      // Get response from selected agent
      if (multiAgentService) {
        const response = await multiAgentService.routeQuery(message, agentType);

        // Remove loading indicator
        chatMessages?.removeChild(loadingDiv);

        // Add AI response to chat
        addMessage(response, false);
      } else {
        // Remove loading indicator
        chatMessages?.removeChild(loadingDiv);

        // Add error message if service is not available
        addMessage("Sorry, the AI service is not available at the moment. Please check your API key configuration.", false);
      }
    } catch (error) {
      console.error('Error getting response:', error);

      // Remove loading indicator if it exists
      const loadingElement = chatMessages?.querySelector('.ai-message:last-child');
      if (loadingElement?.textContent === 'Thinking...') {
        chatMessages?.removeChild(loadingElement);
      }

      // Add error message
      addMessage("Sorry, there was an error processing your request. Please try again later.", false);
    }
  };

  // Add event listeners
  sendButton?.addEventListener('click', sendMessage);

  // Add event listener for Enter key in textarea
  userInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  // Add initial welcome message when chat section becomes visible
  const chatObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        if (chatSection.style.display === 'block') {
          // Clear existing messages and add welcome message
          if (chatMessages) {
            chatMessages.innerHTML = '';
            addMessage("Hello! I'm your AI assistant powered by Groq. How can I help you today?", false);
          }
        }
      }
    });
  });

  // Start observing the chat section for visibility changes
  if (chatSection) {
    chatObserver.observe(chatSection, { attributes: true });
  }
};
