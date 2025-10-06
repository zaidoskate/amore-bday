export function createHearts() {
    const container = document.querySelector(".floating-hearts");
    if (!container)
        return;
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        const size = Math.random() * 15 + 15;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.backgroundColor = "#ff4d6d";
        heart.style.animationDuration = `${Math.random() * 4 + 6}s`;
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }, 600);
}
export function initMainPage() {
    const button = document.getElementById("revealButton");
    const finalMessage = document.getElementById("finalMessage");
    if (button && finalMessage) {
        button.addEventListener("click", () => {
            finalMessage.classList.toggle("show");
        });
    }
    createHearts();
}
