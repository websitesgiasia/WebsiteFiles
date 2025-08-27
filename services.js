document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector('.service-grid.auto-scroll');
    const wrapper = document.querySelector('.scroll-wrapper');

    if (grid && wrapper) {
        const originalContent = grid.innerHTML;

        grid.innerHTML += originalContent;
        grid.innerHTML += originalContent;

        let originalGridWidth = 0;

        const measureOriginalContentWidth = () => {
            const tempDiv = document.createElement('div');
            tempDiv.style.visibility = 'hidden';
            tempDiv.style.position = 'absolute';
            tempDiv.style.whiteSpace = 'nowrap';
            tempDiv.style.display = 'flex';
            tempDiv.style.gap = '2rem';

            const parser = new DOMParser();
            const doc = parser.parseFromString(originalContent, 'text/html');
            Array.from(doc.body.children).forEach(child => tempDiv.appendChild(child.cloneNode(true)));

            document.body.appendChild(tempDiv);
            originalGridWidth = tempDiv.scrollWidth;
            document.body.removeChild(tempDiv);
        };

        measureOriginalContentWidth();
        window.addEventListener('load', measureOriginalContentWidth);

        let scrollSpeed = 0.5;
        let rafId;

        const autoScroll = () => {
            wrapper.scrollLeft += scrollSpeed;

            if (wrapper.scrollLeft >= originalGridWidth) {
                wrapper.scrollLeft -= originalGridWidth;
            }
            
            rafId = requestAnimationFrame(autoScroll);
        };

        let isDown = false;
        let startX;
        let scrollLeftStart;
        let animationPausedByDrag = false;

        wrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            animationPausedByDrag = true;
            cancelAnimationFrame(rafId);
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeftStart = wrapper.scrollLeft;
            wrapper.classList.add('dragging');
        });

        document.addEventListener('mouseup', () => {
            if (isDown) {
                isDown = false;
                wrapper.classList.remove('dragging');
                if (animationPausedByDrag) {
                    autoScroll();
                }
                animationPausedByDrag = false;
            }
        });

        document.addEventListener('mouseleave', () => {
        });

        wrapper.addEventListener('touchstart', (e) => {
            isDown = true;
            animationPausedByDrag = true;
            cancelAnimationFrame(rafId);
            startX = e.touches[0].pageX - wrapper.offsetLeft;
            scrollLeftStart = wrapper.scrollLeft;
            wrapper.classList.add('dragging');
        });

        wrapper.addEventListener('touchend', () => {
            if (isDown) {
                isDown = false;
                wrapper.classList.remove('dragging');
                if (animationPausedByDrag) {
                    autoScroll();
                }
                animationPausedByDrag = false;
            }
        });

        wrapper.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - wrapper.offsetLeft;
            const walk = (x - startX) * 1;
            wrapper.scrollLeft = scrollLeftStart - walk;
        });

        autoScroll();

        let scrollTimeout;
        wrapper.addEventListener('scroll', () => {
            cancelAnimationFrame(rafId);
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (!isDown) {
                    autoScroll();
                }
            }, 500);
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Animate sections on scroll
  const sections = document.querySelectorAll("#services, #training, #clients");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => observer.observe(section));


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