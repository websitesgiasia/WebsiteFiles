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
  }
];

const container = document.getElementById('activitiesContainer');
const categoryFilter = document.getElementById('categoryFilter');
const yearFilter = document.getElementById('yearFilter');
const locationFilter = document.getElementById('locationFilter');

function renderActivities(data) {
  container.innerHTML = '';
  if (data.length === 0) {
    container.innerHTML = '<p>No activities match your filters.</p>';
    return;
  }

  data.forEach((act, index) => {
  const card = document.createElement('div');
  card.className = 'event-card';
  card.style.animationDelay = `${index * 100}ms`; 
  card.innerHTML = `
    <img src="${act.image}" alt="event image" class="event-image" />
    <div class="event-info">
      <div class="event-meta">
      <p class="event-location"><i class="fa fa-map-marker-alt"></i> ${act.location}</p>
      <span class="event-date"><i class="fa fa-calendar-alt"></i> ${act.date}</span>
    </div>
      <h3>${act.title}</h3>
      <div class="tag-wrapper">
        <button class="tag ${act.category}">${act.category}</button>
        </div>
    </div>`;
    container.appendChild(card);
    });
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
}

categoryFilter.addEventListener('change', filterActivities);
yearFilter.addEventListener('change', filterActivities);
locationFilter.addEventListener('change', filterActivities);

renderActivities(activities);

//Hamburger on navbar
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const hamburger = document.getElementById("hamburger");
  const offScreenMenu = document.getElementById("offScreenMenu");

  // Scroll behavior
  window.addEventListener("scroll", function () {
    if (window.scrollY > window.innerHeight * 0.001) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  // Hamburger toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when clicking "contact us here" link on responsive
  document.querySelectorAll(".menu-content a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      offScreenMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
});