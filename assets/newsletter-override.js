document.addEventListener('DOMContentLoaded', function() {
  // Create a marker element to check if the CSS was loaded properly
  const marker = document.createElement('div');
  marker.id = 'newsletter-override-loaded';
  document.body.appendChild(marker);
  
  // Check if marker element has expected styles from CSS
  const markerStyle = window.getComputedStyle(marker);
  const isCSSLoaded = markerStyle.display === 'none';
  
  // Target the newsletter section
  const newsletterSections = document.querySelectorAll('[id^="shopify-section-"][id*="newsletter-premium"]');
  
  newsletterSections.forEach(section => {
    const inputField = section.querySelector('.newsletter-form .field__input');
    const submitButton = section.querySelector('.newsletter-form__button');
    
    if (inputField && !isCSSLoaded) {
      console.warn('Newsletter CSS not loaded properly, applying inline styles');
      
      // Apply styles directly to input field
      Object.assign(inputField.style, {
        backgroundColor: 'var(--newsletter-bg-color, transparent)',
        color: 'var(--newsletter-text-color, inherit)',
        borderColor: 'var(--newsletter-border-color, #d9d9d9)',
        borderWidth: 'var(--newsletter-border-width, 1px)',
        borderStyle: 'solid',
        borderRadius: 'var(--newsletter-border-radius, 4px)',
        padding: 'var(--newsletter-padding, 10px)',
        width: '100%',
        boxSizing: 'border-box'
      });
      
      // Apply focus event listener
      inputField.addEventListener('focus', function() {
        this.style.outlineColor = 'var(--newsletter-focus-color, #000)';
        this.style.borderColor = 'var(--newsletter-focus-color, #000)';
      });
    }
    
    if (submitButton && !isCSSLoaded) {
      // Apply styles directly to button
      Object.assign(submitButton.style, {
        backgroundColor: 'var(--newsletter-button-bg-color, inherit)',
        color: 'var(--newsletter-button-text-color, inherit)',
        borderRadius: 'var(--newsletter-button-radius, 4px)',
        padding: 'var(--newsletter-button-padding, 10px)',
        fontWeight: 'var(--newsletter-button-weight, 600)'
      });
    }
  });
}); 