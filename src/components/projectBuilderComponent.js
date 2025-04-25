// Function to set up the project builder UI
export const setupProjectBuilderUI = (multiAgentService) => {
  const projectPromptContainer = document.getElementById('project-prompt-container');
  const projectOutput = document.getElementById('project-output');
  const promptInput = document.getElementById('prompt-input');
  const generateButton = document.getElementById('generate-project');
  const projectBuilder = document.getElementById('project-builder');

  // Clear any existing output when initialized
  if (projectOutput) {
    projectOutput.innerHTML = '';
  }

  // Function to display the project structure
  const displayProjectStructure = (structure) => {
    if (!projectOutput) return;

    projectOutput.innerHTML = '';

    // Create a pre element for formatted output
    const preElement = document.createElement('pre');
    preElement.classList.add('project-structure');
    preElement.textContent = structure;

    projectOutput.appendChild(preElement);
  };

  // Function to handle generating a project structure
  const generateProjectStructure = async () => {
    if (!promptInput || !promptInput.value.trim()) return;

    const prompt = promptInput.value.trim();

    // Show loading indicator
    if (projectOutput) {
      projectOutput.innerHTML = '<div class="loading">Generating project structure...</div>';
    }

    try {
      // Get response from the project structure agent
      if (multiAgentService) {
        const response = await multiAgentService.routeQuery(
          prompt,
          'PS001' // Use the ProjectStructureAgent by serial number
        );

        // Display the project structure
        displayProjectStructure(response);
      } else {
        // Display error message if service is not available
        if (projectOutput) {
          projectOutput.innerHTML = '<div class="error">Sorry, the AI service is not available at the moment. Please check your API key configuration.</div>';
        }
      }
    } catch (error) {
      console.error('Error generating project structure:', error);

      // Display error message
      if (projectOutput) {
        projectOutput.innerHTML = '<div class="error">Sorry, there was an error processing your request. Please try again later.</div>';
      }
    }
  };

  // Add event listeners
  generateButton?.addEventListener('click', generateProjectStructure);

  // Add event listener for Enter key in textarea
  promptInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      generateProjectStructure();
    }
  });

  // Reset project builder when it becomes visible
  const projectObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        if (projectBuilder.style.display === 'block') {
          // Clear existing output and input
          if (projectOutput) {
            projectOutput.innerHTML = '';
          }
          if (promptInput) {
            promptInput.value = '';
          }
        }
      }
    });
  });

  // Start observing the project builder section for visibility changes
  if (projectBuilder) {
    projectObserver.observe(projectBuilder, { attributes: true });
  }
};
