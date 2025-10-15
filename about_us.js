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
    bar.addEventListener('click', () => {
      const direction = i > currentIndex ? 'next' : 'prev';
      goToSlide(i, direction);
    });
    indicatorsContainer.appendChild(bar);
  });
}

function updateCarousel(direction = 'next') {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  
  cards.forEach((card, i) => {
    card.classList.remove('active', 'slide-from-left', 'slide-from-right', 'slide-out-left', 'slide-out-right');
    
    if (i === currentIndex) {
      if (direction === 'next') {
        card.classList.add('slide-from-right');
      } else {
        card.classList.add('slide-from-left');
      }
      
      setTimeout(() => {
        card.classList.add('active');
        card.classList.remove('slide-from-left', 'slide-from-right');
      }, 50);
    }
  });

  document.querySelectorAll('.progress-bar').forEach((bar, i) => {
    if (i === currentIndex) {
      bar.classList.remove('shrink-left', 'shrink-right');
      bar.classList.add('active');
      if (direction === 'prev') {
        bar.classList.add('animate-left');
      } else {
        bar.classList.add('animate-right');
      }
    } else {
      bar.classList.remove('active', 'animate-left', 'animate-right');
      if (direction === 'prev') {
        bar.classList.add('shrink-right');
      } else {
        bar.classList.add('shrink-left');
      }
    }
  });

  currentSpan.textContent = String(currentIndex + 1).padStart(2, '0');
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === cards.length - 1;
}

function goToSlide(index, direction = 'next') {
  currentIndex = Math.max(0, Math.min(index, cards.length - 1));
  updateCarousel(direction);
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel('prev');
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarousel('next');
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
      updateCarousel('next');
    } else if (diff < 0 && currentIndex > 0) {
      currentIndex--;
      updateCarousel('prev');
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
    updateCarousel('prev');
  } else if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarousel('next');
  }
});

createIndicators();
updateCarousel('next');

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