interface Message {
  text: string;
  sub?: string;
}

const messages: Message[] = [
  { text: "Mi amor, feliz cumpleaños", sub: "" },
  { text: "Espero que este regalo te guste", sub: "Con todo mi cariño" },
];

const MESSAGE_DURATION = 5000;
const FADE_DURATION = 1000;

const overlay = document.getElementById("messageOverlay") as HTMLElement | null;
const black = document.getElementById("blackOverlay") as HTMLElement | null;
const messageText = document.getElementById("messageText") as HTMLElement | null;
const messageSub = document.getElementById("messageSub") as HTMLElement | null;
const main = document.getElementById("mainContent") as HTMLElement | null;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

function fadeBlackTo(value: number) {
  if (!black) return;
  black.style.transition = `opacity ${FADE_DURATION}ms ease`;
  black.style.opacity = String(value);
}

function showMessage(index: number) {
  if (!overlay || !messageText || !messageSub) return;
  const m = messages[index];
  messageText.textContent = m.text;
  messageSub.textContent = m.sub || "";
  overlay.style.display = "flex";
  overlay.style.opacity = "1";
}

function hideOverlayAndShowMain() {
  if (!overlay || !black || !main) return;

  overlay.style.display = "none";
  black.style.display = "none";

  fetch("main.html")
    .then((response) => {
      if (!response.ok) throw new Error("Error al cargar main.html");
      return response.text();
    })
    .then(async (html) => {
      main.innerHTML = html;
      main.classList.add("show");
      main.style.opacity = "1";

      const { initMainPage } = await import("./main.js");
      initMainPage();
    })
    .catch((err) => console.error(err));
}

async function runSequence() {
  if (!black) return;
  fadeBlackTo(1);
  await sleep(500);
  fadeBlackTo(0);
  await sleep(FADE_DURATION);
  showMessage(0);
  await sleep(MESSAGE_DURATION);
  fadeBlackTo(1);
  await sleep(FADE_DURATION);
  showMessage(1);
  await sleep(500);
  fadeBlackTo(0);
  await sleep(MESSAGE_DURATION);
  fadeBlackTo(1);
  await sleep(FADE_DURATION);
  hideOverlayAndShowMain();
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.style.setProperty("--transition", `${FADE_DURATION}ms`);
  runSequence();
});
