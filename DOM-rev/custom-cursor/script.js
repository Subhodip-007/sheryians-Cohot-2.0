let main=document.querySelector("#main");
let cursor=document.querySelector(".cursor")
main.addEventListener("mousemove",(dets)=>{
  cursor.style = `top: ${dets.clientY}px; left: ${dets.clientX}px;`;
  
})