/* ── NAV TOGGLE ── */
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

/* ── HEADER SCROLL SHADOW ── */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    header.style.boxShadow = 'none';
  }
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.service-card, .skills-col, .project-card, .cert-card, ' +
  '.about-grid, .info-item, .contact-info, .contact-form-wrap'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── SKILL BARS ── */
const skillBars = document.querySelectorAll('.bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bars = entry.target.querySelectorAll('.bar-fill');
      bars.forEach(bar => {
        const level = bar.getAttribute('data-skill-level');
        bar.style.width = level;
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* ── PROJECT FILTER ── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        setTimeout(() => {
          contactForm.reset(); 
          contactForm.style.display = 'block';
          formSuccess.style.display = 'none';
        }, 30000); 
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch(() => {
      alert("Network error. Please try again later.");
    });
  });
}
