
document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      menuToggle.classList.toggle('open');
      navLinks.classList.toggle('active');
      body.classList.toggle('menu-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active', 'open');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active', 'open');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active', 'open');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
      }
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert("Thank you for your message! I’ll get back to you soon.");
      this.reset();
    });
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  function animateBars() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
      try {
        if (isInViewport(bar) && !bar.classList.contains('animated')) {
          bar.style.width = bar.getAttribute('data-skill-level') || '';
          bar.classList.add('animated');
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  function setupSkillAccordion() {
    const categories = document.querySelectorAll('.skill-category');
    categories.forEach(cat => {
      const btn = cat.querySelector('.category-toggle');
      const panel = cat.querySelector('.category-panel');
      if (!btn || !panel) return;
      const open = cat.getAttribute('data-open') === 'true';
      if (open) {
        cat.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        panel.querySelectorAll('.bar').forEach(b => {
          b.style.width = b.getAttribute('data-skill-level') || '';
          b.classList.add('animated');
        });
      } else {
        btn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = '0';
      }

      btn.addEventListener('click', () => toggleCategory(cat));
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCategory(cat);
        }
      });
    });
  }

  function toggleCategory(cat) {
    const btn = cat.querySelector('.category-toggle');
    const panel = cat.querySelector('.category-panel');
    if (!btn || !panel) return;
    const isOpen = cat.classList.contains('open');
    if (isOpen) {
      cat.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = '0';
      panel.querySelectorAll('.bar').forEach(b => {
        b.style.width = '0';
        b.classList.remove('animated');
      });
    } else {
      cat.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
      panel.querySelectorAll('.bar').forEach(b => {
        b.style.width = b.getAttribute('data-skill-level') || '';
        b.classList.add('animated');
      });
    }
  }

  window.addEventListener('scroll', animateBars);
  window.addEventListener('load', function () {
    setupSkillAccordion();
    animateBars();
  });

});

