const activities = [
  {
    title: "Cyber Security Awareness Seminar (Speaking Engagement)",
    location: "Pontianak, Indonesia",
    category: "seminar",
    year: "2017",
    date: "23 November 2017",
    image: "Activities/CSAS.jpg"
  },
  {
    title: "IT Security Program (Curriculum Development)",
    location: "Mandaluyong City, Philippine",
    category: "program",
    year: "2017",
    date: "22 November 2017",
    image: "Activities/ITSP.jpg"
  },
  {
    title: "What The Hack 2017: Security Event (Speaking Engagement)",
    location: "Mandaluyong City, Philippine",
    category: "seminar",
    year: "2017",
    date: "26 May 2017",
    image: "Activities/WTHSP.jpg"
  },
  {
    title: "Dissecting Malware: Malware Analysis Training (Speaking Engagement)",
    location: "Mandaluyong City, Philippine",
    category: "seminar",
    year: "2017",
    date: "15 July 2017",
    image: "Activities/DMMAT.jpg"
  },
  {
    title: "Cyber Safety and HR Data Security: Cyber Security Seminar (Speaking Engagement)",
    location: "Makati City, Philippine",
    category: "seminar",
    year: "2017",
    date: "16 Agustus 2017",
    image: "Activities/CSHRDS.jpg"
  },
  {
    title: "Cyber Safety and Data Privacy: Cyber Security Seminar (Speaking Engagement)",
    location: "Makati City, Philippine",
    category: "seminar",
    year: "2017",
    date: "22 November 2017",
    image: "Activities/CSDP.jpg"
  },
  {
    title: "Signing of Memorandum of Agreement (MOA) SGI Asia and euodoó Technologies, Inc.",
    location: "Manila, Philippine",
    category: "partnership",
    year: "2018",
    date: "05 March 2018",
    image: "Activities/SGIeudoo.jpg"
  },
  {
    title: "Cyber Security Connect 2024",
    location: "Jakarta, Indonesia",
    category: "expo",
    year: "2024",
    date: "09 October 2024",
    image: "Activities/Cyber Security Connect 2024.jpg"
  },
  {
    title: "Digitalization and Cyber Security Awareness",
    location: "-",
    category: "seminar",
    year: "-",
    date: "-",
    image: "Activities/Digitalization and Cyber Security Awareness.jpg"
  },
  {
    title: "Basic SQL and Operation Training",
    location: "-",
    category: "training",
    year: "-",
    date: "-",
    image: "Activities/Training Basic SQL and Operation.jpg"
  },
  {
    title: "CISA Public Training",
    location: "-",
    category: "training",
    year: "-",
    date: "-",
    image: "Activities/Training CISA_Public(2).jpg"
  },
  {
    title: "CISA Training at OJK(Otoritas Jasa Keuangan)",
    location: "-",
    category: "training",
    year: "-",
    date: "-",
    image: "Activities/Training CISA.jpg"
  },
  {
    title: "Cyber Security for DPO Training",
    location: "-",
    category: "training",
    year: "-",
    date: "-",
    image: "Activities/Training Cyber Security for DPO.jpg"
  },
  {
    title: "DevSecOps Training",
    location: "-",
    category: "training",
    year: "-",
    date: "-",
    image: "Activities/Training DevSecOps.jpg"
  }
];

const grid = document.getElementById('activitiesGrid');
const categoryFilter = document.getElementById('categoryFilter');
const yearFilter = document.getElementById('yearFilter');
const locationFilter = document.getElementById('locationFilter');
const resultsCount = document.getElementById('resultsCount');

function hasIncompleteInfo(activity) {
    return activity.location.includes('-') || 
            activity.date.includes('-') || 
            activity.year.includes('-');
}

function renderActivities(data) {
    grid.innerHTML = '';

    const showingAll = categoryFilter.value === '' && 
                      yearFilter.value === '' && 
                      locationFilter.value === '';
    
    if (data.length === 0) {
        grid.innerHTML = '<div class="no-results">No activities match your filters</div>';
        return;
    }

    const completeActivities = data.filter(act => !hasIncompleteInfo(act));
    const incompleteActivities = data.filter(act => hasIncompleteInfo(act));

    const activitiesToShow = showingAll ? completeActivities : data;

    activitiesToShow.forEach((activity, index) => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        card.style.animationDelay = `${index * 50}ms`;

        const metaHtml = (!activity.location.includes('-') || !activity.date.includes('-')) ? `
            <div class="activity-meta">
                ${!activity.location.includes('-') ? `
                    <div class="meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${activity.location}</span>
                    </div>
                ` : ''}
                ${!activity.date.includes('-') ? `
                    <div class="meta-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${activity.date}</span>
                    </div>
                ` : ''}
            </div>
        ` : '';

        card.innerHTML = `
            <img src="${activity.image}" alt="${activity.title}" class="activity-image">
            <div class="activity-content">
                ${metaHtml}
                <h3 class="activity-title">${activity.title}</h3>
                <span class="activity-tag tag-${activity.category}">${activity.category}</span>
            </div>
        `;

        grid.appendChild(card);
    });

    if (showingAll && incompleteActivities.length > 0) {
        const separator = document.createElement('div');
        separator.className = 'separator';
        separator.innerHTML = `
            <div class="separator-line"></div>
            <span class="separator-text">Others</span>
            <div class="separator-line"></div>
        `;
        grid.appendChild(separator);

        incompleteActivities.forEach((activity, index) => {
            const card = document.createElement('div');
            card.className = 'activity-card';
            card.style.animationDelay = `${(activitiesToShow.length + index) * 50}ms`;

            card.innerHTML = `
                <img src="${activity.image}" alt="${activity.title}" class="activity-image">
                <div class="activity-content">
                    <h3 class="activity-title">${activity.title}</h3>
                    <span class="activity-tag tag-${activity.category}">${activity.category}</span>
                </div>
            `;

            grid.appendChild(card);
        });
    }
}

function filterActivities() {
    const cat = categoryFilter.value;
    const year = yearFilter.value;
    const loc = locationFilter.value.toLowerCase();

    const filtered = activities.filter(act =>
        (cat === '' || act.category === cat) &&
        (year === '' || act.year === year) &&
        (loc === '' || act.location.toLowerCase().includes(loc))
    );

    renderActivities(filtered);
    updateResultsCount(filtered.length);
}

function updateResultsCount(count) {
    resultsCount.textContent = `${count} ${count === 1 ? 'result' : 'results'}`;
}

categoryFilter.addEventListener('change', filterActivities);
yearFilter.addEventListener('change', filterActivities);
locationFilter.addEventListener('change', filterActivities);

renderActivities(activities);
updateResultsCount(activities.length);

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
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
});