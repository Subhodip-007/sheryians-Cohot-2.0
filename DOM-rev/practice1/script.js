let img=document.querySelector("img");
let text=document.querySelector("h1");
let remvbtn=document.querySelector(".remove-button");
let addbtn=document.querySelector(".add-friend-button");
addbtn.addEventListener("click",function(){
    text.textContent="following";
});
remvbtn.addEventListener("click",function(){
            img.src='angry.png';
    text.textContent="removed form following...";
    setTimeout(()=>{
     img.src='https://i.pinimg.com/736x/b6/e0/ae/b6e0ae56450627de8bcdfc1290e20a10.jpg';
    text.textContent="suggested to follow";
    clearTimeout();
    },2000)

})