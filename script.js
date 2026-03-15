
  (function() {
    // animate skill bars on load (percentage from data-skill-level)
    function setBars() {
      const bars = document.querySelectorAll('.bar[data-skill-level]');
      bars.forEach(bar => {
        const level = bar.getAttribute('data-skill-level');
        if (level && !bar.classList.contains('no-bar')) {
          bar.style.width = level;  // e.g. "90%"
        }
      });
    }
    window.addEventListener('load', setBars);

    // Hamburger menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (menuToggle && navLinks) {
      // Toggle menu on hamburger click
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
      });

      // Close menu when clicking a link
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          body.classList.remove('menu-open');
        });
      });

      // Close menu when clicking outside
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

    // smooth scroll for anchor links (optional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === "#" || href === "") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          
          // Update URL without jumping
          history.pushState(null, null, href);
        }
      });
    });
  })();

