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

    // === Modal Logic untuk detail service ===
    const modal = document.getElementById("serviceModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const closeBtn = document.querySelector(".modal .close");

    const serviceCards = document.querySelectorAll(".service-card");

    // Data detail tambahan per service
    const serviceDetails = {
        "Penetration Testing": "Detail lengkap tentang Penetration Testing. Kami melakukan pengujian menyeluruh menggunakan metode manual maupun automated tools untuk memastikan keamanan aplikasi, jaringan, dan sistem.",
        "Secure Code Review": "Detail lengkap tentang Secure Code Review. Proses ini mencakup analisis manual dan otomatis pada source code untuk mendeteksi celah keamanan lebih dalam.",
        "Digital Forensics": "Detail lengkap tentang Digital Forensics. Kami membantu mengungkap bukti digital, investigasi insiden, dan pemulihan data pasca serangan.",
        "Red Teaming": "Detail lengkap tentang Red Teaming. Tim kami meniru perilaku attacker sungguhan dengan skenario real-world untuk menguji ketahanan organisasi.",
        "vCISO": "Detail lengkap tentang vCISO. Kami berperan sebagai Chief Information Security Officer virtual untuk mengarahkan strategi keamanan organisasi.",
        "Purple Teaming": "Detail lengkap tentang Purple Teaming. Kolaborasi antara Red Team & Blue Team untuk meningkatkan deteksi dan respon ancaman.",
        "IS/IT Audit": "Detail lengkap tentang IS/IT Audit. Audit sistem informasi untuk menilai efektivitas kontrol, kepatuhan regulasi, dan efisiensi operasional.",
        "SOC Workforce": "Detail lengkap tentang SOC Workforce. Layanan staffing & training SOC agar organisasi siap 24/7 dalam monitoring ancaman."
    };

    serviceCards.forEach(card => {
        card.addEventListener("click", () => {
            const title = card.querySelector("h3").innerText;
            const desc = serviceDetails[title] || card.querySelector("p").innerText;

            modalTitle.innerText = title;
            modalDesc.innerText = desc;

            modal.style.display = "block";
        });
    });

    closeBtn.onclick = () => { modal.style.display = "none"; };
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

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

    if (hamburger && offScreenMenu) {
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
    }
});
