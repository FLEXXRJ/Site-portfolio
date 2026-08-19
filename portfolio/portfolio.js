const form = document.querySelector("#contact-form");
const FORMSPREE_URL = form.action;

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

  if (FORMSPREE_URL.includes("VOTRE_ID")) {
    messageError.textContent = "Formulaire non configuré — remplacez VOTRE_ID par votre ID Formspree.";
    return;
  }

  const bouton = form.querySelector('button[type="submit"]');
  bouton.disabled = true;

  fetch(FORMSPREE_URL, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        formSuccess.hidden = false;
        formSuccess.textContent = "Message envoyé ! Je vous répondrai bientôt.";
        form.reset();
      } else {
        messageError.textContent = "Erreur lors de l'envoi. Réessayez plus tard.";
      }
    })
    .catch(() => {
      messageError.textContent = "Erreur réseau. Réessayez plus tard.";
    })
    .finally(() => {
      bouton.disabled = false;
    });
});

menuToggle.addEventListener("click", () => {
  const ouvert = navMenu.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", ouvert);
});

document.querySelectorAll('a[href^="#"]').forEach((lien) => {
  lien.addEventListener("click", (event) => {
    const href = lien.getAttribute("href");
    if (!href || href === "#") return;

    const section = document.querySelector(href);
    if (section) {
      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });
      navMenu.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
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
}, { threshold: 0.2, rootMargin: "0px 0px -60px 0px" });

fadeElements.forEach((element) => fadeObserver.observe(element));
