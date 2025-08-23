let currentIndex = 0;
const slidesWrapper = document.querySelector('.slides-wrapper');
const dots = document.querySelectorAll('.dot');
const totalSlides = dots.length;

function showSlide(index) {
  slidesWrapper.style.transform = `translateX(-${index * 100}vw)`;

  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) {
      dot.classList.add('active');
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

setInterval(nextSlide, 4000);

document.addEventListener("DOMContentLoaded", function () {
  // Animate sections on scroll
  const sections = document.querySelectorAll("#contact, #awards, #about, #why-choose");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => observer.observe(section));

  // Navbar scroll effect
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight * 0.001) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const offScreenMenu = document.getElementById("offScreenMenu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close menu on any link click inside .menu-content
  document.querySelectorAll(".menu-content a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      offScreenMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Close menu when clicking "contact us here" link on responsive
  const contactLink = document.getElementById('contact-link');
  if (contactLink) {
    contactLink.addEventListener('click', () => {
      hamburger.classList.remove('active');
      offScreenMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  }
});
