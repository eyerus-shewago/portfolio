document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ==========================================================================
     MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      });
    });
  }

  /* ==========================================================================
     STICKY HEADER & NAV ACTIVE STATES
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    // Sticky header
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll active link indicator
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     TYPEWRITER EFFECT
     ========================================================================== */
  const typingSpan = document.getElementById('typing-text');
  const roles = ['Software Solutions.', 'Full-Stack Apps.', 'Modern Web Apps.', 'UI/UX Designs.'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingSpan.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting is faster
    } else {
      typingSpan.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  if (typingSpan) {
    type();
  }

  /* ==========================================================================
     IDE CARD INTERACTIVE GLOW
     ========================================================================== */
  const ideCard = document.getElementById('ide-card');
  const ideGlow = document.getElementById('ide-glow');

  if (ideCard && ideGlow) {
    ideCard.addEventListener('mousemove', (e) => {
      const rect = ideCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ideGlow.style.left = `${x}px`;
      ideGlow.style.top = `${y}px`;
      ideGlow.style.opacity = 1;
    });

    ideCard.addEventListener('mouseleave', () => {
      ideGlow.style.opacity = 0;
    });
  }

  /* ==========================================================================
     SKILLS TAB SWITCHING
     ========================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const skillGrids = document.querySelectorAll('.skills-grid');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      skillGrids.forEach(grid => {
        grid.classList.remove('active');
        if (grid.getAttribute('id') === `${targetTab}-skills`) {
          grid.classList.add('active');
          // Reset progress bar widths to trigger transition again
          const progressBars = grid.querySelectorAll('.skill-progress');
          progressBars.forEach(bar => {
            const finalWidth = bar.parentElement.previousElementSibling.querySelector('.skill-percent').textContent;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = finalWidth;
            }, 50);
          });
        }
      });
    });
  });

  /* ==========================================================================
     PROJECT FILTERING
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Add card exit animation
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95) translateY(10px)';
        
        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  /* ==========================================================================
     SCROLL REVEAL & SKILLS INITIAL ANIMATION
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        
        // If the skills section is revealed, animate the active skill bars
        if (entry.target.id === 'skills') {
          const activeGrid = document.querySelector('.skills-grid.active');
          if (activeGrid) {
            const progressBars = activeGrid.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
              const finalWidth = bar.parentElement.previousElementSibling.querySelector('.skill-percent').textContent;
              bar.style.width = finalWidth;
            });
          }
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });

  /* ==========================================================================
     CONTACT FORM VALIDATION
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      // Name Validation
      if (nameInput.value.trim() === '') {
        nameInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('invalid');
      }

      // Email Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('invalid');
      }

      // Message Validation
      if (messageInput.value.trim() === '') {
        messageInput.parentElement.classList.add('invalid');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('invalid');
      }

      if (isValid) {
        // Prepare data for Web3Forms
        // IMPORTANT: You need to get your free access key from https://web3forms.com/
        const Web3FormsAccessKey = 'b9d04fb1-ce2e-4318-841b-03a1ecf70eb5'; 

        const originalText = submitBtn.querySelector('span').textContent;
        const icon = submitBtn.querySelector('i');
        
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Sending...';
        icon.setAttribute('data-lucide', 'loader');
        lucide.createIcons();

        // Send real network request to Web3Forms
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: Web3FormsAccessKey,
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value,
            subject: 'New Contact Form Submission from Portfolio'
          })
        })
        .then(async (response) => {
          let json = await response.json();
          if (response.status === 200) {
            formStatus.classList.add('show');
            contactForm.reset();
          } else {
            console.log(response);
            alert(json.message || 'Something went wrong!');
          }
        })
        .catch(error => {
          console.log(error);
          alert('Something went wrong!');
        })
        .finally(() => {
          // Restore button state after some time
          setTimeout(() => {
            formStatus.classList.remove('show');
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
            icon.setAttribute('data-lucide', 'send');
            lucide.createIcons();
          }, 4000);
        });
      }
    });

    // Remove invalid states on input
    const inputs = contactForm.querySelectorAll('.form-input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
          input.parentElement.classList.remove('invalid');
        }
      });
    });
  }
});
