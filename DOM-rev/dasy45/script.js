// create a card-> a bar  outer and inner percentage and download 
//btn.style.pointerEvents="none"; make the range randow
let card=document.querySelector(".card");
let fill=document.querySelector(".fill");
let btn=document.querySelector("#downloadbutton");
let display=document.querySelector(".display");
btn.addEventListener("click",()=>{
    btn.style.pointerEvents="none";
    let rn=50*Math.floor(Math.random()*10);
    let leng=0;
    let intv=setInterval(()=>{
        leng++;
        display.innerHTML=`${leng}%`
        fill.style.width=`${leng}%`;
    },rn)
 setTimeout(()=>{
 clearInterval(intv)
 let success=document.createElement("p");
   success.innerHTML="download completed"
   card.appendChild(success);
   setTimeout(()=>{

   },2000)
 },rn*100)
})
