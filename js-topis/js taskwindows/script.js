// document.addEventListener("DOMContentLoaded", () => {
    let bar = document.querySelector("#bottombar");

    bar.addEventListener("mouseover", () => {
    bar.style.bottom = "0";
});

bar.addEventListener("mouseout", () => {
    setTimeout(()=>{
          bar.style.bottom = "-7%";
    },1000)
  
});

function updateDateTime() {
    const now = new Date();

    document.getElementById("time").textContent =
        now.toLocaleTimeString();

    document.getElementById("date").textContent =
        now.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
}

updateDateTime();
setInterval(updateDateTime, 1000);