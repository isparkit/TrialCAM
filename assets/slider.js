// Slider functionality for components using the slider class
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all sliders on the page
  const sliders = document.querySelectorAll('.slider-component');
  
  sliders.forEach(slider => {
    // Basic slider setup was handled inline in the section
    // This file provides fallback functionality if needed

    // Add touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe(slider);
    }, { passive: true });
    
    function handleSwipe(slider) { 
      const swipeThreshold = 50;
      const prevButton = slider.querySelector('.slider-button--prev');
      const nextButton = slider.querySelector('.slider-button--next');
      
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left (next)
        if (nextButton) nextButton.click();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right (prev)
        if (prevButton) prevButton.click();
      }
    }
  });
}); 