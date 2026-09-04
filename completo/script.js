const loading = document.getElementById("loading");
const opening = document.getElementById("opening");
const site = document.getElementById("site");
const enterButton = document.getElementById("enterButton");

const music = document.getElementById("music");
const musicControl = document.getElementById("musicControl");
const musicIcon = document.getElementById("musicIcon");

document.body.classList.add("locked");

window.addEventListener("load", () => {
    setTimeout(() => {
        loading.classList.add("hide");
    }, 500);
});

enterButton.addEventListener("click", () => {
    opening.classList.add("opened");
    site.classList.add("visible");
    document.body.classList.remove("locked");

    music.play()
        .then(() => {
            musicControl.classList.add("playing");
            musicIcon.textContent = "Ⅱ";
        })
        .catch(() => {
            // O navegador pode bloquear o áudio.
        });
});

musicControl.addEventListener("click", () => {
    if (music.paused) {
        music.play()
            .then(() => {
                musicControl.classList.add("playing");
                musicIcon.textContent = "Ⅱ";
            })
            .catch(() => {});
    } else {
        music.pause();
        musicControl.classList.remove("playing");
        musicIcon.textContent = "♫";
    }
});

// Contagem regressiva
const weddingDate = new Date("October 18, 2026 17:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach(id => {
            document.getElementById(id).textContent = "00";
        });
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);
