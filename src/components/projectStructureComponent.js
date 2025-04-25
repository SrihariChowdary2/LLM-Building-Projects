export const setupProjectStructureUI = (multiAgentService) => {
  const projectStructureContainer = document.getElementById('project-structure-analysis');
  const analysisOutput = document.getElementById('analysis-output');
  const projectInput = document.getElementById('project-input');
  const analyzeButton = document.getElementById('analyze-project');

  // Function to display the analysis result
  const displayAnalysis = (analysis) => {
    analysisOutput.innerHTML = '';
    const preElement = document.createElement('pre');
    preElement.classList.add('project-structure');
    preElement.textContent = analysis;
    analysisOutput.appendChild(preElement);
  };

  // Function to handle project analysis
  const analyzeProjectStructure = async () => {
    const prompt = projectInput.value.trim();
    if (!prompt) return;

    analysisOutput.innerHTML = '<div class="loading">Analyzing project structure...</div>';

    try {
      if (multiAgentService) {
        const response = await multiAgentService.routeQuery(
          prompt,
          'PS001' // Use the ProjectStructureAgent
        );
        displayAnalysis(response);
      } else {
        analysisOutput.innerHTML = '<div class="error">Sorry, the AI service is not available at the moment.</div>';
      }
    } catch (error) {
      console.error('Error analyzing project structure:', error);
      analysisOutput.innerHTML = '<div class="error">Sorry, there was an error processing your request. Please try again later.</div>';
    }
  };

  // Add event listeners
  analyzeButton?.addEventListener('click', analyzeProjectStructure);
  projectInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      analyzeProjectStructure();
    }
  });
};