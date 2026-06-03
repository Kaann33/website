const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const form = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "Bedankt! Uw aanvraag is ontvangen. Wij nemen zo snel mogelijk contact met u op.";
  form.reset();
});

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) backToTop.classList.add("visible");
  else backToTop.classList.remove("visible");
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// Werkende zoekbalk: zoekt op woorden zoals diensten, prijzen, contact, offerte, reviews, missie...
const searchInput = document.getElementById("siteSearch");
const searchBtn = document.getElementById("searchBtn");
const searchResult = document.getElementById("searchResult");

const searchMap = {
  "home": "#home",
  "start": "#home",
  "diensten": "#diensten",
  "dienst": "#diensten",
  "kantoor": "#diensten",
  "kantoorschoonmaak": "#diensten",
  "winkel": "#diensten",
  "winkels": "#diensten",
  "oplevering": "#diensten",
  "opleveringsschoonmaak": "#diensten",
  "dieptereiniging": "#diensten",
  "periodieke schoonmaak": "#diensten",
  "particulier": "#diensten",
  "particuliere": "#diensten",
  "over": "#over",
  "over ons": "#over",
  "prijzen": "#prijzen",
  "prijs": "#prijzen",
  "offerte": "#contact",
  "aanvraag": "#contact",
  "contact": "#contact",
  "mail": "#contact",
  "email": "#contact",
  "whatsapp": "#contact",
  "bellen": "#contact",
  "kwaliteit": "#kwaliteit",
  "waarom": "#kwaliteit",
  "werkwijze": "#werkwijze",
  "planning": "#werkwijze",
  "missie": ".mission-vision",
  "visie": ".mission-vision",
  "reviews": "#resultaten",
  "review": "#resultaten",
  "resultaten": "#resultaten",
  "foto": "#resultaten",
  "fotos": "#resultaten"
};

function clearHighlights(){
  document.querySelectorAll(".search-highlight").forEach(el => {
    el.classList.remove("search-highlight");
  });
}

function doSearch(){
  if(!searchInput) return;
  const query = searchInput.value.toLowerCase().trim();
  clearHighlights();

  if(!query){
    if(searchResult) searchResult.textContent = "";
    return;
  }

  let targetSelector = null;

  for(const key in searchMap){
    if(query.includes(key) || key.includes(query)){
      targetSelector = searchMap[key];
      break;
    }
  }

  if(!targetSelector){
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      if(!targetSelector && section.innerText.toLowerCase().includes(query)){
        targetSelector = "#" + section.id;
      }
    });
  }

  const target = targetSelector ? document.querySelector(targetSelector) : null;

  if(target){
    target.scrollIntoView({behavior:"smooth", block:"start"});
    target.classList.add("search-highlight");
    if(searchResult) searchResult.textContent = "Gevonden: " + query;
    setTimeout(() => target.classList.remove("search-highlight"), 1800);
  } else {
    if(searchResult) searchResult.textContent = "Geen resultaat gevonden.";
  }
}

if(searchBtn){
  searchBtn.addEventListener("click", doSearch);
}
if(searchInput){
  searchInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
      e.preventDefault();
      doSearch();
    }
  });
}


// Actieve navigatie: de link wordt roze wanneer je in die sectie zit
const navItems = document.querySelectorAll(".nav-links a[href^='#']");
const pageSections = Array.from(navItems)
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNav(){
  let currentId = "home";
  pageSections.forEach(section => {
    const top = section.offsetTop - 160;
    if(window.scrollY >= top){
      currentId = section.id;
    }
  });

  navItems.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

navItems.forEach(link => {
  link.addEventListener("click", () => {
    navItems.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});
