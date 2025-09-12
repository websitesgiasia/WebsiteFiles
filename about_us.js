const cardList = document.getElementById('cardList');
const cards = document.querySelectorAll('.card-item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const indicators = document.getElementById('indicators');

let currentIndex = 0;

let touchStartX = 0;
let touchCurrentX = 0;
let isSwiping = false;
let startTransformX = 0;

function updateSlider() {
    cardList.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateIndicators();

    if (window.innerWidth > 768) {
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex === cards.length - 1 ? 'none' : 'block';
    } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }
}

function updateIndicators() {
    indicators.innerHTML = '';
    cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
        indicators.appendChild(dot);
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
});

cardList.addEventListener('touchstart', (e) => {
    if (window.innerWidth <= 768) {
        isSwiping = true;
        touchStartX = e.touches[0].clientX;
        const transformMatch = cardList.style.transform.match(/translateX\(([-.\d]+)%\)/);
        startTransformX = transformMatch ? parseFloat(transformMatch[1]) : 0;
        cardList.style.transition = 'none';
    }
}, { passive: true });

cardList.addEventListener('touchmove', (e) => {
    if (window.innerWidth <= 768 && isSwiping) {
        touchCurrentX = e.touches[0].clientX;
        const diffX = touchCurrentX - touchStartX;
        const newTransformPercentage = startTransformX + (diffX / cardList.offsetWidth) * 100;
        cardList.style.transform = `translateX(${newTransformPercentage}%)`;
    }
}, { passive: true });

cardList.addEventListener('touchend', () => {
    if (window.innerWidth <= 768 && isSwiping) {
        isSwiping = false;
        cardList.style.transition = 'transform 0.5s ease-in-out';

        const swipeThreshold = 50;
        const movedBy = touchCurrentX - touchStartX;

        if (movedBy < -swipeThreshold) {
            currentIndex = Math.min(currentIndex + 1, cards.length - 1);
        } else if (movedBy > swipeThreshold) {
            currentIndex = Math.max(currentIndex - 1, 0);
        }
        updateSlider();
    }
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("#about ,#achievements, #timeline, #leadership, #vismis");
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