// global store for selected queries
let bubble = document.querySelector(".circle");
let board = document.querySelector(".bottom");
let timer=document.querySelector(".timer")
let initTime=60;
let initscore=0;
// let randomnum=
let targetHit=document.querySelector(".hit");
// make bubble
function makeBubble(){
  for(let i = 0;i<10*15;i++){
    let div= document.createElement("div");
    div.classList.add("circle");
    div.textContent=`${Math.floor(Math.random()*10)}`
    board.appendChild(div);
  }
}
makeBubble()
// timer
function runtimer(){
let runtime = setInterval(()=>{
    if(initTime>=0){
        timer.innerHTML=`${initTime}`
        initTime--;
    }else{
        clearInterval(runtime);
    }
},1000) 
}
// generate terget 
function getHitTarget(){
    let hitrn= Math.floor(Math.random()*10);
    targetHit.textContent=`${hitrn}`;
}
// incscore
function incscore(){
score++;
}
function decscore() {
    score--;

}
// game-mech
board.addEventListener("click", (e) => {
    runtimer()
  console.log(e.target.textContent);

});