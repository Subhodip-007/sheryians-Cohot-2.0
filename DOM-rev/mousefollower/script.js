let screen=document.querySelector("#main");
let crsr=document.querySelector(".cursor");

screen.addEventListener("mousemove",function(e){
    // console.log(dets.clientX,dets.clientY)
    crsr.style.top = e.pageY + "px";
    crsr.style.left = e.pageX + "px";
})
