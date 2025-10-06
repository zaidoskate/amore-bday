var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const messages = [
    { text: "Mi amor, feliz cumpleaños", sub: "" },
    { text: "Espero que este regalo te guste", sub: "Con todo mi cariño" },
];
const MESSAGE_DURATION = 5000;
const FADE_DURATION = 1000;
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
        .then((html) => __awaiter(this, void 0, void 0, function* () {
        main.innerHTML = html;
        main.classList.add("show");
        main.style.opacity = "1";
        const { initMainPage } = yield import("./main.js");
        initMainPage();
    }))
        .catch((err) => console.error(err));
}
function runSequence() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!black)
            return;
        fadeBlackTo(1);
        yield sleep(500);
        fadeBlackTo(0);
        yield sleep(FADE_DURATION);
        showMessage(0);
        yield sleep(MESSAGE_DURATION);
        fadeBlackTo(1);
        yield sleep(FADE_DURATION);
        showMessage(1);
        yield sleep(500);
        fadeBlackTo(0);
        yield sleep(MESSAGE_DURATION);
        fadeBlackTo(1);
        yield sleep(FADE_DURATION);
        hideOverlayAndShowMain();
    });
}
document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.style.setProperty("--transition", `${FADE_DURATION}ms`);
    runSequence();
});
