let head=document.querySelector("span")
document.querySelector("#select").addEventListener("change",(dets)=>{
head.textContent="KONSA "`${dets.target.value}`
})