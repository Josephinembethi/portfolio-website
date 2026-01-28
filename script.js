
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message! I’ll get back to you soon.");
  this.reset();
});
// Animate bars 
const bars = document.querySelectorAll('.bar');

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function animateBars() {
  bars.forEach(bar => {
    if (isInViewport(bar) && !bar.classList.contains('animated')) {
      bar.style.width = bar.getAttribute('data-skill-level');
      bar.classList.add('animated');
    }
  });
}

// Run on scroll and on page load
window.addEventListener('scroll', animateBars);
window.addEventListener('load', animateBars);
