let allElem = document.querySelectorAll(".elem");
let allpage=document.querySelectorAll(".full-page-elem")
let allBackbutton=document.querySelectorAll(".back-btn")
allElem.forEach(elem => {
    elem.addEventListener("click",()=>{
    //    console.log(allpage[elem.id])
    allpage[elem.id].style.display="block"
    })
});
allBackbutton.forEach((btn)=>btn.addEventListener("click",()=>allpage[btn.id].style.display="none"))
