// ===========================
// VICTRIX CAPITAL - MAIN SCRIPT
// ===========================

document.addEventListener('DOMContentLoaded', function() {
  
  // Active navigation link
  highlightActiveNavLink();
  
  // Smooth scroll for anchor links
  setupSmoothScroll();
  
  // Mobile menu toggle (if implemented)
  setupMobileMenu();
  
  // Scroll animations
  setupScrollAnimations();
  
  // Contact form validation (if exists)
  setupContactForm();
  
});

// Highlight active navigation link based on current page
function highlightActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Mobile menu toggle
function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
}

// Scroll animations - fade in elements on scroll
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all cards and sections
  document.querySelectorAll('.card, section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add fade-in class styles
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

// Contact form validation
function setupContactForm() {
  const form = document.querySelector('#contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      if (!data.name || !data.email || !data.message) {
        showMessage('Por favor, preencha todos os campos.', 'error');
        return;
      }
      
      if (!isValidEmail(data.email)) {
        showMessage('Por favor, insira um e-mail válido.', 'error');
        return;
      }
      
      // Here you would typically send the data to a backend
      console.log('Form data:', data);
      showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
      form.reset();
    });
  }
}

// Email validation helper
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Show message helper
function showMessage(message, type) {
  const messageEl = document.createElement('div');
  messageEl.className = `message message-${type}`;
  messageEl.textContent = message;
  
  messageEl.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 2rem;
    background-color: ${type === 'success' ? '#88E833' : '#C0392B'};
    color: ${type === 'success' ? '#0E1C0E' : '#FFFFFF'};
    border-radius: 4px;
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(messageEl);
  
  setTimeout(() => {
    messageEl.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => messageEl.remove(), 300);
  }, 3000);
}

// Add animations
const animationStyle = document.createElement('style');
animationStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(animationStyle);
