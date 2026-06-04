// document.addEventListener("DOMContentLoaded", () => 

    let bar = document.querySelector("#bottombar");
    let main=document.querySelector("#mainscreen");
    let windowsicon=document.querySelector(".ri-microsoft-fill");
    let windomsmenu=document.querySelector("#on-click-window-menu")
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
windowsicon.addEventListener("click",()=>{
    windomsmenu.style.bottom="9%"
   
})
windomsmenu.addEventListener("click",()=>{
    windomsmenu.style.bottom="-100%"
})

let cursor=document.querySelector("#right-click-window")
main.addEventListener("mousemove",(dets)=>{
  cursor.style = `top: ${dets.clientY}px; left: ${dets.clientX}px;`;
  
})
main.addEventListener("contextmenu",()=>{
    cursor.style.position="fixed";
    cursor.style.display="block";
})