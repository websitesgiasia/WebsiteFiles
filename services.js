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
    const learnMoreBtns = document.querySelectorAll(".learn-more-btn");
    const serviceGrid = document.querySelector(".service-grid.auto-scroll");

    const serviceDetails = {
        "Penetration Testing": "Penetration testing, or security assessment, is an active evaluation of the security of an information system by directly testing the system to identify vulnerabilities, rather than conducting a purely theoretical audit. The results of the evaluation will be compiled into a report and presented in a debriefing session, where questions can be addressed and remediation strategies can be openly discussed.",
        "Secure Code Review": "Code review is the systematic examination of source code to find and fix errors that were missed in the early stages of development, thereby improving both software quality and developer skills. This process can be carried out through pair programming, walkthroughs, or formal inspections, and is effective in preventing common vulnerabilities such as format string exploits, race conditions, memory leaks, and buffer overflows. With the support of online repositories like Git or Subversion and dedicated collaboration tools, code review becomes more efficient, while automated software also helps detect vulnerabilities on a large scale, which according to a VDC Research study is already used by 17.6% of embedded software engineers and is expected to reach 23.7% within the next two years.", 
        "Digital Forensics": "Computer forensics, or forensic computing, is a branch of digital forensics that focuses on legal evidence found in computers and digital storage media. Its purpose is to examine digital media forensically in order to identify, preserve, recover, analyze, and present facts as well as opinions related to the information discovered. This technique is used to search for, store, and analyze data on computer systems to uncover potential evidence for legal proceedings, with methods similar to crime scene investigations but possessing unique digital characteristics. Today, computer forensic investigations are supported by various modern tools such as AccessData Forensics Toolkit (FTK), Guidance Software EnCase, and X-Ways Forensics.", 
        "Red Teaming": "Red Teaming is a cyber attack simulation designed to mimic the behavior of real attackers using real-world scenarios. Its primary objective is to test how well an organization’s systems, processes, and people can detect, respond to, and mitigate attacks. This service helps organizations identify weaknesses that are not visible through traditional audits, while providing a realistic view of overall security resilience.", 
        "vCISO": "vCISO (Virtual Chief Information Security Officer) is a strategic service where we act as a virtual CISO to guide an organization’s information security strategy. We provide security policy guidance, risk management, regulatory compliance, and security investment planning without the full cost of a permanent CISO. This service is ideal for organizations that want to have a mature cybersecurity direction with high flexibility.", 
        "Purple Teaming": "Purple Teaming is a collaborative approach between the Red Team (attackers) and the Blue Team (defenders) to improve cyber threat detection and response capabilities. Instead of working separately, both teams share information in real time, allowing the organization to validate the effectiveness of security controls and strengthen defensive capabilities. With this method, threat detection becomes faster and mitigation strategies more effective.", 
        "IS/IT Audit": "IS/IT Audit is a comprehensive examination of an organization’s information systems and technology infrastructure. This audit assesses the effectiveness of security controls, regulatory compliance, and IT operational efficiency. Through the audit, organizations can identify compliance gaps, potential technology risks, and opportunities to improve IT governance, thereby achieving a balance between security, efficiency, and compliance.", 
        "SOC Workforce": "SOC Workforce is a service that provides experts and training programs to build or strengthen a Security Operations Center (SOC). We ensure that organizations have a competent team, ready 24/7 to monitor, detect, and respond to cyber threats. This service covers recruitment, continuous training, and incident simulations, enabling organizations to maintain readiness and responsiveness to attacks optimally."
    };

    let scrollX = 0;
    let speed = 3; 
    let animationId;

    function animateScroll() {
    scrollX -= speed;
    serviceGrid.style.transform = `translateX(${scrollX}px)`;

    if (Math.abs(scrollX) >= serviceGrid.scrollWidth / 2) {
        scrollX = 0;
    }

    animationId = requestAnimationFrame(animateScroll);
    }

    animateScroll(); 

    learnMoreBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const card = btn.closest(".service-card");
        const title = card.querySelector("h3").innerText;
        const desc = serviceDetails[title] || card.querySelector("p").innerText;
        modalTitle.innerText = title;
        modalDesc.innerText = desc;
        modal.style.display = "block";
        speed = 1; 
    });
    });

    closeBtn.onclick = () => { 
    modal.style.display = "none"; 
    speed = 3; 
    };

    window.onclick = (e) => { 
    if (e.target == modal) {
        modal.style.display = "none"; 
        speed = 3; 
    }
    };
});