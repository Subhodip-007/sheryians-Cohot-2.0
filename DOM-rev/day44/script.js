// create element
let h1=document.createElement("h1");
h1.innerHTML="created through js";
console.log(h1);
// how can we show in html
// appending child
// where to append 
// in body
let body=document.querySelector("body");
let btn=document.querySelector("button");
btn.addEventListener("click",()=>{
body.appendChild(h1);
})
let btnjs=document.createElement("button");
btnjs.innerHTML="click me";
btnjs.style=`padding:1rem 2rem;
background-color:blue;
color:black;
border:none;
border-radius:5px;
cursor:pointer;`
body.appendChild(btnjs);
// task
// create a button on click create a div
// give div position abs
// using randow position left=x.px
//top=y=px;
// also randow color
// style.retare =r+deg;
//  followup make a array of string create a h1 using rendow pick a elem form array and add it in h1 and give position absolute and random position

 