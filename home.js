let currentIndex = 0;
const slidesWrapper = document.querySelector('.slides-wrapper');
const dots = document.querySelectorAll('.dot');
const totalSlides = dots.length;
let autoSlideInterval;

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

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function restartAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showSlide(currentIndex);
    restartAutoSlide(); 
  });
  
  dot.style.cursor = 'pointer';
});

startAutoSlide();

const faqs = document.querySelectorAll('.faq-item');

faqs.forEach(faq => {
  const question = faq.querySelector('.faq-question');
  const answer = faq.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    if (faq.classList.contains('active')) {
      answer.style.maxHeight = null;
      faq.classList.remove('active');
    } else {
      faqs.forEach(f => {
        f.classList.remove('active');
        f.querySelector('.faq-answer').style.maxHeight = null;
      });

      faq.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
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
        text: "Mr. Semi's explanation was very easy to understand because he delivered it in such a simple, straightforward way, and even included examples that were really relatable to everyday life.",
        author: "Raden Ayu Intan Rizky Amelia",
        company: "OJK"
    },
    {
        text: "This CISA training really complements our role as supervisors in the financial services industry, especially in understanding how the industry manages IT risks.",
        author: "Aditya Pamudji",
        company: "OJK"
    }
];

let currentIndek = 0;
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteContent = document.getElementById("quoteContent");
const dot = document.querySelectorAll('.testimonial-dot');

function updateTestimonial(index) {
    quoteContent.classList.add("fade-out");
    quoteAuthor.classList.add("fade-out");
    
    dot.forEach(dot => dot.classList.remove('active'));
    dot[index].classList.add('active');

    setTimeout(() => {
        currentIndek = index;
        quoteText.textContent = testimonials[index].text;
        quoteAuthor.innerHTML = `${testimonials[index].author}<br><span>${testimonials[index].company}</span>`;
        quoteContent.classList.remove("fade-out");
        quoteAuthor.classList.remove("fade-out");
    }, 400);
}

setInterval(() => {
    const nextIndex = (currentIndek + 1) % testimonials.length;
    updateTestimonial(nextIndex);
}, 7000);

dot.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        updateTestimonial(index);
    });
});

window.addEventListener('load', function() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  function showToast(message, type = "success") {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.className = 'toast hidden';
      }, 1800);
    }, 3000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const captchaResponse = grecaptcha.getResponse();
      if (!captchaResponse) {
        showToast("Please complete the reCAPTCHA before submitting.", "error");
        return; 
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending, please wait...";

      try {
        const formData = new FormData(this);
        
        const response = await fetch('/.netlify/functions/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            captcha: captchaResponse
          })
        });

        const data = await response.json();

        if (response.ok) {
          showToast("Message sent successfully! We will reach out to you soon!", "success");
          contactForm.reset();
          grecaptcha.reset();
        } else {
          console.error('Server error:', data);
          showToast(data.error || "Failed to send message. Please try again.", "error");
        }
      } catch (error) {
        console.error('Network error:', error);
        showToast("Failed to send message. Please try again.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "SEND MESSAGE";
      }
    });
  }
});