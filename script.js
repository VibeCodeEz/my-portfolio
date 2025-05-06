// script.js
document.addEventListener('DOMContentLoaded', function() {
  console.log("Portfolio site loaded.");
  
  // Initialize all functionality
  setupSmoothScrolling();
  setupProgressBars();
  setupProjectFilters();
  setupContactForm();
});

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth'
              });
              
              // Update URL without page jump
              if (history.pushState) {
                  history.pushState(null, null, targetId);
              } else {
                  window.location.hash = targetId;
              }
          }
      });
  });
}

// Animate progress bars when skills section comes into view
function setupProgressBars() {
  const skillsSection = document.getElementById('skills');
  
  if (!skillsSection) return;
  
  const progressBars = document.querySelectorAll('.progress');
  
  // Set initial width to 0
  progressBars.forEach(bar => {
      bar.style.width = '0';
  });
  
  function animateProgressBars() {
      if (isInViewport(skillsSection)) {
          progressBars.forEach(bar => {
              const value = bar.getAttribute('data-value');
              bar.style.width = value + '%';
          });
          window.removeEventListener('scroll', animateProgressBars);
      }
  }
  
  function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
      );
  }
  
  window.addEventListener('scroll', animateProgressBars);
  animateProgressBars(); // Check on initial load
}

// Project filtering functionality
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length === 0 || projectCards.length === 0) return;
  
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          const filterValue = button.getAttribute('data-filter');
          
          // Filter projects
          projectCards.forEach(card => {
              const categories = card.getAttribute('data-category').split(' ');
              
              if (filterValue === 'all' || categories.includes(filterValue)) {
                  card.style.display = 'block';
                  setTimeout(() => {
                      card.style.opacity = '1';
                      card.style.transform = 'scale(1)';
                  }, 50);
              } else {
                  card.style.opacity = '0';
                  card.style.transform = 'scale(0.8)';
                  setTimeout(() => {
                      card.style.display = 'none';
                  }, 300);
              }
          });
      });
  });
}

// Contact form handling
function setupContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (!contactForm) return;
  
  // Create feedback elements
  const formSuccess = document.createElement('div');
  formSuccess.classList.add('form-success');
  formSuccess.innerHTML = '<i class="fas fa-check-circle"></i><strong>Success!</strong> Your message has been sent.';
  formSuccess.style.display = 'none';
  
  const formError = document.createElement('div');
  formError.classList.add('form-error');
  formError.innerHTML = '<i class="fas fa-exclamation-circle"></i><strong>Error!</strong> Please fill all fields.';
  formError.style.display = 'none';
  
  contactForm.parentNode.insertBefore(formSuccess, contactForm.nextSibling);
  contactForm.parentNode.insertBefore(formError, formSuccess.nextSibling);
  
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Hide any previous messages
      formSuccess.style.display = 'none';
      formError.style.display = 'none';
      
      // Get form values
      const formData = {
          name: document.getElementById('name').value.trim(),
          email: document.getElementById('email').value.trim(),
          subject: document.getElementById('subject').value.trim(),
          message: document.getElementById('message').value.trim()
      };
      
      // Validate form
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
          formError.style.display = 'block';
          return;
      }
      
      // Validate email format
      if (!validateEmail(formData.email)) {
          formError.innerHTML = '<i class="fas fa-exclamation-circle"></i><strong>Error!</strong> Please enter a valid email.';
          formError.style.display = 'block';
          return;
      }
      
      // Simulate form submission (in a real app, you would use fetch or AJAX here)
      simulateFormSubmission(formData)
          .then(() => {
              formSuccess.style.display = 'block';
              contactForm.reset();
              setTimeout(() => {
                  formSuccess.style.display = 'none';
              }, 5000);
          })
          .catch(() => {
              formError.innerHTML = '<i class="fas fa-exclamation-circle"></i><strong>Error!</strong> Submission failed. Please try again.';
              formError.style.display = 'block';
          });
  });
  
  // Email validation helper
  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }
  
  // Simulate form submission (replace with actual API call)
  function simulateFormSubmission(data) {
      return new Promise((resolve, reject) => {
          // Simulate network delay
          setTimeout(() => {
              // Simulate 90% success rate for demo purposes
              Math.random() > 0.1 ? resolve() : reject();
          }, 1000);
      });
  }
}

// Add this to your existing script.js
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const body = document.body;
    
    if (!menuToggle || !navContainer) return;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    
    // Toggle menu function
    function toggleMenu() {
      navContainer.classList.toggle('active');
      overlay.classList.toggle('active');
      body.classList.toggle('no-scroll');
      
      // Change icon based on menu state
      const icon = menuToggle.querySelector('i');
      if (navContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        if (navContainer.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }
  
  // Add setupMobileMenu to your DOMContentLoaded function
  document.addEventListener('DOMContentLoaded', function() {
    console.log("Portfolio site loaded.");
    
    // Initialize all functionality
    setupSmoothScrolling();
    setupProgressBars();
    setupProjectFilters();
    setupContactForm();
    setupMobileMenu(); // Add this line
  });

// Scroll to Top Button
function setupScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // ... existing code
  
  // Setup scroll to top button
  setupScrollToTop();
});

// Typing Animation
function setupTypingAnimation() {
    const typedTextSpan = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    
    if (!typedTextSpan || !cursor) return;
    
    const words = ['Computer Engineering Student', 'Frontend Developer', 'UI/UX Enthusiast', 'Python Programmer'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newWordDelay = 2000;
    let charIndex = 0;
    let wordIndex = 0;
    
    // Type a word
    function type() {
      if (charIndex < words[wordIndex].length) {
        if (!cursor.classList.contains('typing')) {
          cursor.classList.add('typing');
        }
        typedTextSpan.textContent += words[wordIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        cursor.classList.remove('typing');
        setTimeout(erase, newWordDelay);
      }
    }
    
    // Erase a word
    function erase() {
      if (charIndex > 0) {
        if (!cursor.classList.contains('typing')) {
          cursor.classList.add('typing');
        }
        typedTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        cursor.classList.remove('typing');
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, typingDelay);
      }
    }
    
    // Start the animation
    if (words.length) setTimeout(type, newWordDelay / 2);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // ... existing code
    
    // Setup typing animation
    setupTypingAnimation();
  });

// Image Lightbox
function setupLightbox() {
    const projectImages = document.querySelectorAll('.project-card img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    if (!lightbox || !lightboxImg || !closeLightbox) return;
    
    // Open lightbox when clicking on project images
    projectImages.forEach(img => {
      img.addEventListener('click', function() {
        lightbox.style.display = 'block';
        lightboxImg.src = this.src;
        
        // Get project title for caption
        const projectTitle = this.parentElement.querySelector('h3').textContent;
        lightboxCaption.textContent = projectTitle;
        
        // Prevent scrolling when lightbox is open
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close lightbox when clicking on X
    closeLightbox.addEventListener('click', function() {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Close lightbox with ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.style.display === 'block') {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // ... existing code
    
    // Setup lightbox
    setupLightbox();
  });

  function setupDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateIcon(newTheme);
    });
    
    function updateIcon(theme) {
      icon.classList.toggle('fa-moon', theme === 'light');
      icon.classList.toggle('fa-sun', theme === 'dark');
    }
  }
  
  // Add to DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    // ... existing code
    setupDarkMode();
  });
// Add this to your main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    // Send email using EmailJS
    emailjs.send('service_nia59eu', 'template_9kmnmd9', formData, 'wPYloQaakZU1ImSMY')
      .then(function(response) {
        showMessage('Your message has been sent successfully!', 'success');
        contactForm.reset();
      }, function(error) {
        showMessage('Failed to send message. Please try again later.', 'error');
      });
  });
  
  function validateForm() {
    let isValid = true;
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
      const input = group.querySelector('input, textarea');
      const errorMessage = group.querySelector('.error-message');
      
      if (!input.value.trim()) {
        errorMessage.style.display = 'block';
        isValid = false;
      } else {
        errorMessage.style.display = 'none';
      }
      
      // Additional email validation
      if (input.type === 'email' && input.value.trim()) {
        if (!validateEmail(input.value)) {
          errorMessage.textContent = 'Please enter a valid email address';
          errorMessage.style.display = 'block';
          isValid = false;
        }
      }
    });
    
    return isValid;
  }
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
});



// Make sure to include EmailJS library in your HTML head
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
// And initialize it with your public key
// <script>emailjs.init('wPYloQaakZU1ImSMY');</script>