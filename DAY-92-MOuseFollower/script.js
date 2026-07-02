const cursor=document.querySelector('.Mouse-Follower');
let X=0;
let Y=0;
addEventListener("mousemove",(e)=>{
    const { clientX,clientY }= e;
    console.log(clientX,clientY);
        X=clientX;
    Y=clientY;
    far()
    // cursor.style.top=clientY + 'px'
    // cursor.style.left=clientX + 'px'
    // To optamise this test this both in bromser
    // cursor.style.transform=`translate(${clientX + 'px'},${clientY + 'px'})`
}) 
// another 
 function far(){

    cursor.style.transform=`translate(${X + 'px'},${Y + 'px'})`
    requestAnimationFrame(far) // browser have fix FPS max 60 fps 
    // so this function do is importent for 3 js
    
 }
 far()
