let element=document.querySelectorAll(".elem");
let img=document.querySelector("img");
element.forEach(val => {
    val.addEventListener("mousemove",(e)=>{
        val.childNodes[3].style.opacity="1";
        val.childNodes[3].style.left = e.pageX + "px";
        val.childNodes[3].style.top = e.pageY + "px";
    })
     val.childNodes[3].style.opacity="0"
});

   // element.addEventListener("mousemove",(e)=>{
    //     img.style.left = e.pageX + "px";
    //     img.style.top = e.pageY + "px";
        
    // })