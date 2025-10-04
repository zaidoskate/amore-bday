const messages = [
    { text: "Mi amor feliz cumpleaños", sub: "" },
    { text: "Espero que este regalo te guste", sub: "Con todo mi cariño" },
];
const MESSAGE_DURATION = 5000; // duración visible de cada mensaje (ms)
const FADE_DURATION = 1000; // duración del fundido (ms)
const overlay = document.getElementById("messageOverlay");
const black = document.getElementById("blackOverlay");
const messageText = document.getElementById("messageText");
const messageSub = document.getElementById("messageSub");
const main = document.getElementById("mainContent");
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
function fadeBlackTo(value) {
    if (!black)
        return;
    black.style.transition = `opacity ${FADE_DURATION}ms ease`;
    black.style.opacity = String(value);
}
function showMessage(index) {
    if (!overlay || !messageText || !messageSub)
        return;
    const m = messages[index];
    messageText.textContent = m.text;
    messageSub.textContent = m.sub || "";
    overlay.style.display = "flex";
    overlay.style.opacity = "1";
}
function hideOverlayAndShowMain() {
    if (!overlay || !black || !main)
        return;
    overlay.style.display = "none";
    black.style.display = "none";
    fetch("main.html")
        .then((response) => {
        if (!response.ok)
            throw new Error("Error al cargar main.html");
        return response.text();
    })
        .then((html) => {
        main.innerHTML = html;
        main.classList.add("show");
        main.style.opacity = "1";
    })
        .catch((err) => console.error(err));
}
async function runSequence() {
    if (!black)
        return;
    // --- FADE IN inicial ---
    fadeBlackTo(1); // aseguramos que empiece negro
    await sleep(500); // pequeña pausa por estética
    fadeBlackTo(0); // se desvanece lentamente
    await sleep(FADE_DURATION);
    // --- Primer mensaje ---
    showMessage(0);
    await sleep(MESSAGE_DURATION);
    // --- Transición a negro ---
    fadeBlackTo(1);
    await sleep(FADE_DURATION);
    // --- Segundo mensaje ---
    showMessage(1);
    await sleep(500); // cambio de texto antes de desvanecer negro
    fadeBlackTo(0);
    await sleep(MESSAGE_DURATION);
    // --- Transición final a negro ---
    fadeBlackTo(1);
    await sleep(FADE_DURATION);
    // --- Mostrar página principal ---
    hideOverlayAndShowMain();
}
// Ejecutar secuencia cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.style.setProperty("--transition", `${FADE_DURATION}ms`);
    runSequence();
});
