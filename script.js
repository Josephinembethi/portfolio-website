
  (function() {
    function setBars() {
      const bars = document.querySelectorAll('.bar[data-skill-level]');
      bars.forEach(bar => {
        const level = bar.getAttribute('data-skill-level');
        if (level && !bar.classList.contains('no-bar')) {
          bar.style.width = level; 
        }
      });
    }
    window.addEventListener('load', setBars);

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle && navLinks) {
    
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
      });

      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          body.classList.remove('menu-open');
        });
      });

      document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          body.classList.remove('menu-open');
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          body.classList.remove('menu-open');
        }
      });
    }
        
        
    });

