// Smooth active nav highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#9d5cf6' : '';
  });
});

// Animate skill bars on scroll
const bars = document.querySelectorAll('.bar div');
const skillSection = document.getElementById('skills');
let animated = false;

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !animated) {
    animated = true;
    bars.forEach(bar => {
      const target = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.transition = 'width 1s ease'; bar.style.width = target; }, 100);
    });
  }
});
observer.observe(skillSection);

// Contact form mailto
function sendMail(e) {
  e.preventDefault();
  const name = e.target[0].value;
  const email = e.target[1].value;
  const msg = e.target[2].value;
  window.location.href = `mailto:ismailhasan3451@gmail.com?subject=Portfolio Contact from ${name}&body=${msg}%0A%0AFrom: ${email}`;
}

// Fade-in on scroll for cards
const fadeEls = document.querySelectorAll('.project-card, .info-card, .skill-item');
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});
