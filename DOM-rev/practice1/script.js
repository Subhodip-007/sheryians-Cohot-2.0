let img=document.querySelector("img");
let text=document.querySelector("h1");
let addbtn=document.querySelector(".add-friend-button");
let like=document.querySelector(".ri-thumb-up-fill");
let flag=1;
addbtn.addEventListener("click",function(){
    if(flag==1){
            text.textContent="following";
            addbtn.textContent="remove from following"

            flag=0;
    }else{
    img.src='angry.png';
    text.textContent="removed form following...";
    setTimeout(()=>{
    img.src='https://i.pinimg.com/736x/b6/e0/ae/b6e0ae56450627de8bcdfc1290e20a10.jpg';
    text.textContent="suggested to follow";
                addbtn.textContent="start following"
    clearTimeout();
    },1000)
    flag=1;
    }

});
img.addEventListener("dblclick",function(){
            like.style.transform="translate(-50%, -50%) scale(1)";
        console.log("double click");
    setTimeout(function(){
                like.style.transform="translate(-50%, -50%) scale(0)";
        console.log("double click");
        clearTimeout();
    },1000)
})