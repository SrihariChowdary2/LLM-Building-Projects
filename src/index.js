import initGroqService from './services/groqService';
import initMultiAgentService from './services/multiAgentService';
import { setupCounter } from './components/counterComponent';
import { setupChatUI } from './components/chatComponent';

// Initialize services and set up UI
const initServices = async () => {
  // Initialize the Groq service
  const groqService = await initGroqService();

  // Initialize the Multi Agent Service
  const multiAgentService = await initMultiAgentService();

  // Set up UI event handlers
  setupChatUI(multiAgentService);

  // Set up navigation
  setupNavigation();

  // Set up counter
  setupCounter(document.getElementById('counter-value'));

  console.log("All services initialized");
};

// Set up navigation between sections
const setupNavigation = () => {
  const landingPage = document.getElementById('landing-page');
  const projectBuilder = document.getElementById('project-builder');
  const chatSection = document.getElementById('chat-section');

  // Start Building button
  document.getElementById('start-building').addEventListener('click', () => {
    landingPage.style.display = 'none';
    projectBuilder.style.display = 'block';
    chatSection.style.display = 'none';
  });

  // Chat Now button
  document.getElementById('start-chat').addEventListener('click', () => {
    landingPage.style.display = 'none';
    projectBuilder.style.display = 'none';
    chatSection.style.display = 'block';
  });

  // Back to Home buttons
  document.getElementById('back-to-landing').addEventListener('click', () => {
    landingPage.style.display = 'flex';
    projectBuilder.style.display = 'none';
    chatSection.style.display = 'none';
  });

  document.getElementById('back-to-landing-chat').addEventListener('click', () => {
    landingPage.style.display = 'flex';
    projectBuilder.style.display = 'none';
    chatSection.style.display = 'none';
  });
};

// Initialize the application
initServices().catch(error => {
  console.error("Failed to initialize services:", error);
});