
let btn=document.querySelector("button")
let color=document.querySelector(".color");
btn.addEventListener("click",function(){
    let rn1=Math.floor(Math.random()*256);
let rn2=Math.floor(Math.random()*256);
let rn3=Math.floor(Math.random()*256);
    color.style.backgroundColor=`rgb(${rn1},${rn2},${rn3})`

})
