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

const faqs = document.querySelectorAll('.faq-item');

faqs.forEach(faq => {
  faq.querySelector('.faq-question').addEventListener('click', () => {
    faq.classList.toggle('active');
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("#contact, #awards, #about, #why-choose, #testimonial, #faq");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => observer.observe(section));

  const nav = document.querySelector("nav");
  window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight * 0.001) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

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

const testimonials = [
      {
      text: "Mr. Semi’s explanation was very easy to understand because he delivered it in such a simple, straightforward way, and even included examples that were really relatable to everyday life.",
      author: "Raden Ayu Intan Rizky Amelia",
      company: "OJK"
    },  
      {
      text: "This CISA training really complements our role as supervisors in the financial services industry, especially in understanding how the industry manages IT risks.",
      author: "Aditya Pamudji",
      company: "OJK"
    }
  ];

  let index = 0;
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");
  const quoteContent = document.getElementById("quoteContent");

  setInterval(() => {
    quoteContent.classList.add("fade-out");
    quoteAuthor.classList.add("fade-out");

    setTimeout(() => {
      index = (index + 1) % testimonials.length;

      quoteText.textContent = testimonials[index].text;
      quoteAuthor.innerHTML = `${testimonials[index].author}<br><span>${testimonials[index].company}</span>`;

      quoteContent.classList.remove("fade-out");
      quoteAuthor.classList.remove("fade-out");
    }, 800); 
  }, 7000);