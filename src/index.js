import initGroqService from './services/groqService';
import initMultiAgentService from './services/multiAgentService';
import { setupCounter } from './components/counterComponent';
import { setupChatUI } from './components/chatComponent';
import { setupProjectBuilderUI } from './components/projectBuilderComponent';
import { setupProjectStructureUI } from './components/projectStructureComponent';

// Initialize services and set up UI
const initServices = async () => {
  // Initialize the Groq service
  const groqService = await initGroqService();

  // Initialize the Multi Agent Service
  const multiAgentService = await initMultiAgentService();

  // Set up UI components
  if (multiAgentService) {
    setupChatUI(multiAgentService);
    setupProjectBuilderUI(multiAgentService);
  }

  // Set up navigation
  setupNavigation();

  console.log("All services initialized");
};

// Set up navigation between sections
const setupNavigation = () => {
  const landingPage = document.getElementById('landing-page');
  const projectBuilder = document.getElementById('project-builder');
  const chatSection = document.getElementById('chat-section');

  const showSection = (section) => {
    // Hide all sections first
    landingPage.style.display = 'none';
    projectBuilder.style.display = 'none';
    chatSection.style.display = 'none';

    // Show the requested section
    section.style.display = section === landingPage ? 'flex' : 'block';
  };

  // Start Building button
  document.getElementById('start-building')?.addEventListener('click', () => {
    showSection(projectBuilder);
  });

  // Chat Now button
  document.getElementById('start-chat')?.addEventListener('click', () => {
    showSection(chatSection);
  });

  // Back to Home buttons
  document.getElementById('back-to-landing')?.addEventListener('click', () => {
    showSection(landingPage);
  });

  document.getElementById('back-to-landing-chat')?.addEventListener('click', () => {
    showSection(landingPage);
  });
};

// Initialize the application
initServices().catch(error => {
  console.error("Failed to initialize services:", error);
});
