class CustomAnnouncementBar extends HTMLElement {
  constructor() {
    super();
    this.slideIndex = 0;
    this.slides = this.querySelectorAll('.announcement-slide');
    this.indicators = this.querySelectorAll('.slide-indicator');
    this.autoRotate = this.getAttribute('data-auto-rotate') === 'true';
    this.rotateSpeed = parseInt(this.getAttribute('data-rotate-speed') || 5) * 1000;
    this.slideInterval = null;
    
    if (this.slides.length > 0) {
      this.setupSlideshow();
    }
  }
 
  setupSlideshow() {
    this.showSlide(this.slideIndex);
    
    // Set up event listeners for controls
    const prevButton = this.querySelector('.slide-control--prev');
    const nextButton = this.querySelector('.slide-control--next');
    
    if (prevButton) {
      prevButton.addEventListener('click', () => this.changeSlide(-1));
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => this.changeSlide(1));
    }
    
    // Set up indicators
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });
    
    // Start auto-rotation if enabled
    if (this.autoRotate && this.slides.length > 1) {
      this.startAutoRotation();
      
      // Pause on hover
      this.addEventListener('mouseenter', () => this.pauseAutoRotation());
      this.addEventListener('mouseleave', () => this.startAutoRotation());
      
      // Pause on focus within
      this.addEventListener('focusin', () => this.pauseAutoRotation());
      this.addEventListener('focusout', () => this.startAutoRotation());
    }
  }
  
  showSlide(index) {
    // Handle index boundaries
    if (index >= this.slides.length) {
      this.slideIndex = 0;
    } else if (index < 0) {
      this.slideIndex = this.slides.length - 1;
    } else {
      this.slideIndex = index;
    }
    
    // Hide all slides and remove active class from indicators
    this.slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    this.indicators.forEach(indicator => {
      indicator.classList.remove('active');
    });
    
    // Show the current slide and set active indicator
    this.slides[this.slideIndex].classList.add('active');
    
    if (this.indicators[this.slideIndex]) {
      this.indicators[this.slideIndex].classList.add('active');
    }
  }
  
  changeSlide(direction) {
    this.showSlide(this.slideIndex + direction);
  }
  
  goToSlide(index) {
    this.showSlide(index);
  }
  
  startAutoRotation() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    
    this.slideInterval = setInterval(() => {
      this.changeSlide(1);
    }, this.rotateSpeed);
  }
  
  pauseAutoRotation() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
}

customElements.define('custom-announcement-bar', CustomAnnouncementBar); 