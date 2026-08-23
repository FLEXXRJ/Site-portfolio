const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-open");
});

/* Scroll fluide pour TOUS les liens internes (#accueil, #horaires, bouton "Nous trouver"...) */
document.querySelectorAll('a[href^="#"]').forEach((lien) => {
  lien.addEventListener("click", (event) => {
    const href = lien.getAttribute("href");
    if (!href || href === "#") return;

    const section = document.querySelector(href);
    if (section) {
      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
      navMenu.classList.remove("nav-open");
    }
  });
});

const fadeElements = document.querySelectorAll(".fade-in");
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.35,
  rootMargin: "0px 0px -80px 0px",
});

fadeElements.forEach((el) => fadeObserver.observe(el));
