const form = document.querySelector("#contact-form");
const inputNom = document.querySelector("#nom");
const inputEmail = document.querySelector("#email");
const inputMessage = document.querySelector("#message");
const nomError = document.querySelector("#nom-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const formSuccess = document.querySelector("#form-success");

const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");

function effacerErreurs() {
  nomError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  formSuccess.hidden = true;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  effacerErreurs();

  if (inputNom.value.trim().length < 2) {
    nomError.textContent = "Le nom doit contenir au moins 2 caractères.";
    return;
  }

  const email = inputEmail.value.trim();
  if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Email invalide.";
    return;
  }

  if (inputMessage.value.trim().length < 10) {
    messageError.textContent = "Le message doit contenir au moins 10 caractères.";
    return;
  }

  formSuccess.hidden = false;
  formSuccess.textContent = "Message envoyé ! Je vous répondrai bientôt.";
  form.reset();
});

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav-open");
});

navMenu.querySelectorAll("a").forEach((lien) => {
  lien.addEventListener("click", (event) => {
    event.preventDefault();
    const href = lien.getAttribute("href");
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    navMenu.classList.remove("nav-open");
  });
});

const btnContact = document.querySelector("#accueil .btn");
btnContact.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
});

const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

fadeElements.forEach((element) => fadeObserver.observe(element));
