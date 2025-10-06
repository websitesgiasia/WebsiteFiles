const track = document.getElementById('track');
const cards = document.querySelectorAll('.quote-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');
const currentSpan = document.getElementById('current');
const totalSpan = document.getElementById('total');

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

totalSpan.textContent = String(cards.length).padStart(2, '0');

function createIndicators() {
  cards.forEach((_, i) => {
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    if (i === 0) bar.classList.add('active');
    
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    bar.appendChild(fill);
    
    bar.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(bar);
  });
}

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  cards.forEach((card, i) => {
    card.classList.toggle('active', i === currentIndex);
  });

  document.querySelectorAll('.progress-bar').forEach((bar, i) => {
    bar.classList.toggle('active', i === currentIndex);
  });

  currentSpan.textContent = String(currentIndex + 1).padStart(2, '0');

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === cards.length - 1;
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, cards.length - 1));
  updateCarousel();
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

track.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });

track.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && currentIndex < cards.length - 1) {
      currentIndex++;
    } else if (diff < 0 && currentIndex > 0) {
      currentIndex--;
    }
    updateCarousel();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  } else if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

createIndicators();
updateCarousel();

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("#about ,#achievements, #timeline, #quote, #vismis");
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

window.addEventListener('resize', updateSlider);
document.addEventListener('DOMContentLoaded', updateSlider);