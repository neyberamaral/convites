// =========================================================
// ANA & LUCAS — JAVASCRIPT
// Capa interativa + contagem + RSVP + animações
// =========================================================

const cover = document.getElementById("invitationCover");
const openButton = document.getElementById("openInvitation");
const invitationContent = document.getElementById("invitationContent");
const heroPhoto = document.getElementById("heroPhoto");
const photoPlaceholder = document.getElementById("photoPlaceholder");

// =========================================================
// ABERTURA DO CONVITE
// =========================================================

openButton.addEventListener("click", () => {
  // Impede cliques repetidos durante a animação.
  if (cover.classList.contains("is-opening")) return;

  cover.classList.add("is-opening");

  // Libera o conteúdo e inicia o desaparecimento da capa.
  setTimeout(() => {
    document.body.classList.add("cover-open");
    invitationContent.classList.add("is-visible");
  }, 350);

  // Depois da animação dos laços, remove a capa.
  setTimeout(() => {
    cover.classList.add("is-open");
    invitationContent.setAttribute("aria-hidden", "false");

    // Começa a observar as seções somente após abrir.
    startRevealObserver();
  }, 1450);
});

// =========================================================
// FOTO DOS NOIVOS
// =========================================================

heroPhoto.addEventListener("error", () => {
  heroPhoto.style.display = "none";
  photoPlaceholder.style.display = "flex";
});

// =========================================================
// CONTAGEM REGRESSIVA
// Data atual do modelo: 13/02/2027 às 16:30
// =========================================================

const weddingDate = new Date(2027, 1, 13, 16, 30, 0).getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML =
      "<p style='grid-column:1/-1;font-family:Cormorant Garamond,serif;font-size:2.4rem;'>Hoje é o grande dia! ♡</p>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =========================================================
// ANIMAÇÃO DAS SEÇÕES AO ROLAR
// =========================================================

let revealStarted = false;

function startRevealObserver() {
  if (revealStarted) return;
  revealStarted = true;

  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach((element) => observer.observe(element));
}

// =========================================================
// CONFIRMAÇÃO DE PRESENÇA VIA WHATSAPP
// =========================================================

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const guestName = document.getElementById("guestName").value.trim();
  const guests = document.getElementById("guests").value;

  if (!guestName) return;

  // Troque pelo WhatsApp dos noivos:
  // DDI + DDD + número, sem espaços ou símbolos.
  const phoneNumber = "5564999999999";

  const message =
    `Olá! Sou ${guestName} e gostaria de confirmar minha presença ` +
    `no casamento de Ana & Lucas para ${guests} pessoa(s). 💍🤍`;

  const whatsappURL =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
});
