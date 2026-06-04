
let unit = document.querySelector("h1");
window.addEventListener("keydown", (dets) => {
    unit.textContent = `${dets.key}`
})