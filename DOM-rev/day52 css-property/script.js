let box=document.querySelector(".box2");
box.addEventListener("mousemove",(dets)=>{
  box.style.setProperty("--x", x + "px");
  box.style.setProperty("--y", y + "px");
})