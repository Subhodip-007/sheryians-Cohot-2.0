let board=document.querySelector(".bottom")
let bubble=document.querySelector(".circle")
let timerDisplay = document.querySelector(".timer");
let score=document.querySelector(".score")
let hit=document.querySelector(".hit")
let rn=Math.floor(Math.random() * 10);
let initScore=0;
let flag=false;


// make bubble
function makebubble(){
let rows = board.clientHeight / 40;
let cols = board.clientWidth / 40;
for(let i = 0; i <= rows * cols; i++){
    let div = document.createElement("div");
    div.classList.add("circle");
    board.appendChild(div);
    let hitrn=Math.floor(Math.random() * 10);
    div.textContent=`${hitrn}`
}
}
// timer
function setTimer() {
    let timer = 60;
 
    timerDisplay.textContent = timer;
    let intervalId = setInterval(() => {
        if (timer > 0) {
            timer--;
            timerDisplay.textContent = `Time: ${timer}`;
        } else {
            board.innerHTML = `
         <div class="game-over">
         <h2>Game Over</h2>
         <p>Your Score: ${initScore}</p>
         <button onclick="restart()">Restart</button>
         </div>
        `;
            flag=true;
            clearInterval(intervalId);

        }
    }, 100);
}
// inc score
function incscore(){
    initScore+=10;
    score.textContent=`score : ${initScore}`

}
// dec score
function decscore(){
    initScore -= 10;

    if (initScore < 0) initScore = 0;

    score.textContent = `score : ${initScore}`;
}
//generatehit
function getHitrn(){
  rn = Math.floor(Math.random() * 10);
  hit.textContent = `Hit : ${rn}`;
}
makebubble()
getHitrn()
setTimer();
board.addEventListener("click", (e) => {
 if(flag)return 
  let clicked = e.target.textContent.trim();
  let target = hit.textContent.split(":")[1].trim();

  if (clicked === target) {
    console.log("Same text");
    makebubble();
    getHitrn();
    incscore();
  } else {
    console.log("Different text");
    decscore();
  }
});
// fun reset
let intervalId; // 🔥 global (important)

function restart(){
    // reset state
    gameOver = false;
    initScore = 0;
    score.textContent = "score : 0";

    // clear old timer
    clearInterval(intervalId);

    // reset UI
    board.innerHTML = "";

    // restart systems
    makebubble();
    getHitrn();
    setTimer();
}