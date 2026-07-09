export const smoothScrollToSection = (sectionId, onComplete) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Call onComplete after scroll animation completes
    if (onComplete) {
      setTimeout(onComplete, 1000);
    }
  }
};

export const highlightElement = (elementId, duration = 2000) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Add highlight class
  element.style.transition = 'all 0.6s ease-out';
  element.style.boxShadow = '0 0 30px rgba(0, 217, 255, 0.5), inset 0 0 20px rgba(0, 217, 255, 0.2)';
  element.style.borderColor = 'rgba(0, 217, 255, 0.8)';

  // Remove highlight after duration
  setTimeout(() => {
    element.style.boxShadow = '';
    element.style.borderColor = '';
    element.style.transition = '';
  }, duration);
};

export const scrollToAndHighlight = (sectionId) => {
  smoothScrollToSection(sectionId, () => {
    highlightElement(sectionId);
  });
};
