document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("#services, #grids, #training, #clients");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => observer.observe(section));

  const hamburger = document.getElementById("hamburger");
  const offScreenMenu = document.getElementById("offScreenMenu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  document.querySelectorAll(".menu-content a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      offScreenMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  const contactLink = document.getElementById('contact-link');
  if (contactLink) {
    contactLink.addEventListener('click', () => {
      hamburger.classList.remove('active');
      offScreenMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  }
});

function toggleCard(button) {
    const card = button.closest('.service-card');
    const isExpanded = card.classList.contains('expanded');

    document.querySelectorAll('.service-card').forEach(c => {
    c.classList.remove('expanded');
    const btn = c.querySelector('.expand-btn');
    btn.innerHTML = `Learn More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 9l-7 7-7-7"/></svg>`;
    });

    if (!isExpanded) {
    card.classList.add('expanded');
    button.innerHTML = `Show Less <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M19 9l-7 7-7-7"/></svg>`;
    }
}