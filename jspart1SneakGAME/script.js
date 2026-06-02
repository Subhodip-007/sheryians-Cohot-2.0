let board =document.querySelector(".board");
let columns=Math.floor(board.clientWidth/30);
let rows=Math.floor(board.clientHeight/30);
let direction="right";

let arrayBlocks=[]; 
let food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*columns)}

let sneak=[{x:1,y:2}]
for(let i=0;i<rows;i++){
    for(let j=0;j<columns;j++){
       
        let block=document.createElement("div")
        block.classList.add("block");
        board.appendChild(block);
         block.textContent=`${i},${j}`;
         arrayBlocks[`${i},${j}`]=block;
        block.style.color="white";
        
    }

}
function render(){
    sneak.forEach(obj => {
      arrayBlocks[`${obj.x},${obj.y}`].classList.add("fill")
    });
}
arrayBlocks[`${food.x},${food.y}`].classList.add('food')
let intvid=setInterval(()=>{
        
    let head=null
    if(direction==="left"){
        head={x:sneak[0].x,y:sneak[0].y-1}
    }else if(direction==="right"){
         head={x:sneak[0].x,y:sneak[0].y+1}
    }else if(direction==="up"){
          head={x:sneak[0].x-1,y:sneak[0].y}
    }else if(direction==="down"){
          head={x:sneak[0].x+1,y:sneak[0].y}
    }
    if(head.x<0 || head.x>=rows|| head.y<0 || head.y>=columns){
        alert("out of bound")
        clearInterval(intvid)
    }
    if(head.x===food.x && head.y===food.y){
        console.log("food !!!!")
        arrayBlocks[`${food.x},${food.y}`].classList.remove("food")
        food={x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*columns)}
        arrayBlocks[`${food.x},${food.y}`].classList.add("food")
        sneak.unshift(head)
        

    }

    sneak.unshift(head);
         sneak.forEach(obj => {
      arrayBlocks[`${obj.x},${obj.y}`].classList.remove("fill")
    });
    sneak.pop()

       render()

},300)
console.log(arrayBlocks)
addEventListener("keydown",function(evt){
    if(evt.key==="ArrowUp"){
        direction="up"
    }else if(evt.key==="ArrowDown"){
        direction="down"
    }else if(evt.key==="ArrowLeft"){
        direction="left"
    }else if(evt.key==="ArrowRight"){
        direction="right"
    }
 console.log(direction)
})