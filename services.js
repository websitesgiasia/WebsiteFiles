document.addEventListener("DOMContentLoaded", function () {
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

    const modal = document.getElementById("serviceModal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const closeBtn = document.querySelector(".modal .close");

    const serviceCards = document.querySelectorAll(".service-card");

    const serviceDetails = {
        "Penetration Testing": "Penetration-test, atau security assessment, adalah evaluasi aktif terhadap keamanan sistem informasi dengan cara langsung menguji sistem untuk menemukan celah keamanan, bukan sekadar audit teoretis. Hasil evaluasi akan disusun dalam laporan dan dipresentasikan pada sesi debriefing, di mana pertanyaan dapat dijawab serta strategi perbaikan dibahas secara terbuka.",
        "Secure Code Review": "Code review adalah pemeriksaan sistematis terhadap kode sumber untuk menemukan dan memperbaiki kesalahan yang terlewat pada tahap awal pengembangan, sehingga meningkatkan kualitas perangkat lunak sekaligus keterampilan pengembang. Proses ini bisa dilakukan melalui pair programming, walkthrough, atau inspeksi formal, serta efektif mencegah kerentanan umum seperti format string exploit, race condition, memory leak, dan buffer overflow. Dengan dukungan repositori online seperti Git atau Subversion serta alat kolaborasi khusus, code review menjadi lebih efisien, sementara perangkat lunak otomatis juga membantu memeriksa kerentanan dalam skala besar, yang menurut studi VDC Research sudah digunakan oleh 17,6% engineer perangkat lunak tertanam dan diperkirakan akan mencapai 23,7% dalam dua tahun ke depan.",
        "Digital Forensics": "Computer forensics, atau ilmu forensik komputer, adalah cabang dari digital forensics yang berfokus pada bukti hukum yang terdapat di komputer maupun media penyimpanan digital. Tujuannya adalah memeriksa media digital secara forensik untuk mengidentifikasi, melestarikan, memulihkan, menganalisis, serta menyajikan fakta maupun opini terkait informasi yang ditemukan. Teknik ini digunakan untuk mencari, menyimpan, dan menganalisis data pada sistem komputer guna menemukan bukti potensial bagi proses hukum, dengan metode yang serupa dengan investigasi di TKP tetapi memiliki karakteristik digital yang unik. Saat ini, investigasi forensik komputer didukung oleh berbagai alat modern seperti AccessData Forensics Toolkit (FTK), Guidance Software EnCase, dan X-Ways Forensics.",
        "Red Teaming": "Red Teaming adalah simulasi serangan siber yang dirancang untuk meniru perilaku penyerang nyata dengan skenario dunia nyata. Tujuan utamanya adalah menguji sejauh mana sistem, proses, dan manusia dalam organisasi dapat mendeteksi, merespons, serta memitigasi serangan. Layanan ini membantu organisasi memahami titik lemah yang tidak terlihat melalui audit tradisional, sekaligus memberikan gambaran realistis tentang ketahanan keamanan secara menyeluruh.",
        "vCISO": "vCISO (Virtual Chief Information Security Officer) adalah layanan strategis di mana kami berperan sebagai CISO virtual untuk mengarahkan strategi keamanan informasi organisasi. Kami menyediakan panduan kebijakan keamanan, manajemen risiko, kepatuhan regulasi, hingga perencanaan investasi keamanan tanpa harus menanggung biaya penuh seorang CISO permanen. Layanan ini ideal untuk organisasi yang ingin memiliki arah keamanan siber yang matang dengan fleksibilitas tinggi.",
        "Purple Teaming": "Purple Teaming adalah pendekatan kolaboratif antara Red Team (penyerang) dan Blue Team (defender) untuk meningkatkan kemampuan deteksi serta respons ancaman siber. Alih-alih bekerja secara terpisah, kedua tim berbagi informasi secara real-time sehingga organisasi dapat memvalidasi efektivitas kontrol keamanan dan memperkuat kemampuan pertahanan. Dengan metode ini, deteksi ancaman lebih cepat dan strategi mitigasi lebih efektif.",
        "IS/IT Audit": "IS/IT Audit adalah proses pemeriksaan menyeluruh terhadap sistem informasi dan infrastruktur teknologi organisasi. Audit ini menilai efektivitas kontrol keamanan, kepatuhan terhadap regulasi, serta efisiensi operasional TI. Melalui audit, organisasi dapat mengidentifikasi celah kepatuhan, potensi risiko teknologi, dan peluang untuk meningkatkan tata kelola TI, sehingga tercapai keseimbangan antara keamanan, efisiensi, dan kepatuhan.",
        "SOC Workforce": "SOC Workforce adalah layanan yang menyediakan tenaga ahli dan program pelatihan untuk membangun atau memperkuat Security Operations Center (SOC). Kami memastikan organisasi memiliki tim yang kompeten, siap 24/7 dalam memantau, mendeteksi, dan merespons ancaman siber. Layanan ini mencakup rekrutmen, pelatihan berkelanjutan, hingga simulasi insiden, sehingga organisasi dapat menjaga kesiapan dan daya tanggap terhadap serangan secara optimal."
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