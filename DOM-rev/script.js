// introduction to DOM
// DOCUMENT OBJECT MODEL

// 4 PILLER OF DOM

//  SELECTION OF ELEMENT FORM HTML TO JS
//  HTML HAS A STRUCTURE(DOM TREE)
// DOM -> ROOT ELEMENT -> DOCUMENT (HTML FILE)
// (SELECTION OF HTML ELEMENT SELECTION)
// document.querySelector("h1");//(h2,.class,#id,p,img)
//  now to hold it 
 let h1=document.querySelector("h1")
 console.log(h1);
 // now there are more ways to select element but foir now lets understand 
 //  THE FOUR PILLERS


 //  CHANGEING OF HTML FROM JS
 let h2=document.querySelector("h2")
 h2.innerHTML="changed";
// CHANGING OF CSS FORM JS
// bcz i have a h1 same i have selected h1 througe its class
let h1_1=document.querySelector(".h1-1");
h1_1.style.color='red';
h1_1.style.backgroundColor='black';
h1_1.style.borderRadius='20px';
h1_1.style.padding='1rem';

// EVENT LISTENERS 
//  event-which we do click, scroller , mouce -> and  listhner means to observe and track
// target element.addEventListener("action[keydown,keyup,dblclick,click,mousemove,mouseenter,]",function(){whatever you want to perform});
h1_1.addEventListener("click",()=>{
    h1_1.style.backgroundColor='gray';                                                             
})



// task
let herotext=document.querySelector(".hero");
let btn=document.querySelector("button");
btn.addEventListener("click",function(){
    herotext.innerHTML=" heool im batman"
    herotext.style.color="yellow";
    herotext.style.backgroundColor="black";

})

// u can get elements by its id and class
// if there are multiple h1 or mulpitle element of same class
// by defaule document.queryselector selects the first most element 
document.getElementById
document.getElementsByClassName // selects collection of elements 
document.querySelectorAll // like class

//  now diff btw textcontent and innerhtml
h2.innerHTML='<i>list</i>';  // can change html h1,li,ul,p,h2
h1.textContent='<i>list</i>';  // change into text




// todays TASK -
// a h2 , a inc btn , dec btn; {COMPLETED}
// your btn should display val when click on inc dec
// dom youtube video  2 vid dom and 5 projects 
let display=document.querySelector(".count-text");
let inc=document.querySelector(".inc");
let dec=document.querySelector(".dec");
let initcount=0;
inc.addEventListener("click",function(){
    initcount++;
 display.textContent=`${initcount}`;
})
dec.addEventListener("click",function(){
    initcount--;
 display.textContent=`${initcount}`;
})
// [YOUTUBE DOM WHAT MATTERS][COMPLETED]
// TASK A BULB WHEN CLICK NO AND CLICK AGAI OFF
let bul=document.querySelector(".bulb");
let bulbbtn=document.querySelector(".bulb-button");
bulbbtn.addEventListener("click",function(){
    if(bulbbtn.textContent=="OFF"){
        bul.style.backgroundColor="yellow";
        bulbbtn.textContent="ON";
    }else{
        bul.style.backgroundColor="transparent";
        bulbbtn.textContent="OFF";
    }
});
// FIVE PROJECTS(YOUTUBE)
// practice one a cont of img and text {friend or stranger} two button one for add and one for remove{followup - make it one button} [completed]
// instagran love bth using scale() and timeout cont -> img -> heart at center {scale(0) to scale(1)} and then disappear {scale(1) to scale(0)} [completed]
// custom cursor - main-> cursor(absoulte) "mousemove" event -> cursor.style.left = e.pageX + "px"; cursor.style.top = e.pageY + "px"; (css property mix-blend-mode: difference;) [completed]
// img move with cursor like cintheya uguye foreach(val) val.childnode[0,1,2]ilke a array and then val.style.left = e.pageX + "px"; val.style.top = e.pageY + "px"; (css property mix-blend-mode: difference;) mouse enter -> opacity 1 mouse leave -> opacity 0`;[erroer]
// insta story  display inlinebolck ,no wrap sliding bar webkit scrollbar -> css property ::-webkit-scrollbar{display:none;}
//arr[{userstory},[dp,story,}]]->foreach concept clutter template literal -> story.innerHTML = `<img src=${val[0]} alt="story">`;
// DRIBBLE BANNAOO
// DAY 43 - DOM 
// topic math.random()
Math.random()// 0 to 0.99999999;*100 -> 0 to 99.9999999
 //we know JS the language 
 // but eg: console.log dont exist is js 
 // to run js in browser we need web API
// JS -> WEB API -> BROWSER
// study web API -> setTimeout, setInterval, fetch, localStorage, DOM
 // now to get whole number we can use math.floor() or math.ceil() or math.round()
// math.floor(4.9) -> 4
// math.ceil(4.1) -> 5
// math.round(4.5) -> 5
// math.round(4.4) -> 4
// {task}
// generate color using js math.randow[completed]
// arr access with math.random with a button[completd]
// array of objects[{},{}.{},{}] create a  obj team and access team using math.random on button click.[completed]

//day 44 DOM
//create element
// addending a child
// {task}
// create a button on click create a div
// give div position abs
// using randow position left=x.px
//top=y=px;
// also randow color
// style.retare =r+deg;
//  followup make a array of string create a h1 using rendow pick a elem form array and add it in h1 and give position absolute and random position[completed]

// day 45 DOM
// settimeout and setintreval
// sync -- single process at a time JS is sync by nature 
// asyns -- we can make JS asyns
// set timeout _> makes the code execute delay
console.log("hello1")
setTimeout(()=>{
console.log("hello2")

},1000)
console.log("hello3")
// output -> hello1,hello2,hello3
// NOW CREATE A BUTTON ON CLUCK CHANGE H1 TEXT ON SET TIME OUT

// SET INTERVAL -> THE SAME CODE WILL RUN IN INTERVAL NOW IT CAN GO UPTO INFINITY 
// TO RESTRICT IT WE USE clearInterval()
let a=0;
let intv=setInterval(()=>{
    
    a++;
    console.log(a);
},100)
    setTimeout(()=>{
        clearInterval(intv);
    },2000)
// {task}
// create a card-> a bar  outer and inner percentage and download 
//btn.style.pointerEvents="none"; make the range randow [completed]



//////////////' too doooooo' 


// day 46
//work with multiple events
// create a like on dblclick like insta     img get large ang go up 
//video lvl 2
//js proj 1

// day 47 
// array
let arr=[1,"shun",true];
console.log(arr)
let obj={name:"shub",
        age:12
}
// now array of objs
const users = [
  {
    id: 1,
    name: "Aarav Sharma",
    username: "aarav01",
    email: "aarav.sharma@example.com",
    age: 21,
    isActive: true,
    role: "student",
    skills: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 2,
    name: "Diya Verma",
    username: "diya.codes",
    email: "diya.verma@example.com",
    age: 23,
    isActive: true,
    role: "frontend developer",
    skills: ["React", "CSS", "GSAP"]
  }  
];
// OPERATIONS IN ARRAY
let sumofage=0;
users.forEach(val, idx => {
    sum+=val.age;
});
// task 
// create a card from arrobj data 
// free api JSONplaceholder.com , lorempicsum
// using concept of clutter 
// clutter= ' ';
// foreach(()=>{
// clutter+= `card html copy past`
//})                                      [COMPLETED]
// main.innerhtml=cluttre;  

// day 48
// different types of event listners in DOM
// click
// dblclick
//mouseenter
//mouseleave
// mousemove
// main.addevtlis("event",function(info){
// console.log(info); all evets like keyboard pointer scroll mouse 
//})
// task
// make custom mouse use position fixed(problem scroll)       [COMPLETED]
// keydown target on screen
//piano make througe keyboard        [pending]
//make a obj of key and audio or let aud = new Audio(''); (imp)
// evt(()=>{
 //   Audio.play()})

 //day 49
 let h1=document.querySelectorAll("h1")// u will get a node list like array
  // so here h1 is a array 
  // now target parent and access child inside 
  // praent.childnodes
  // create tree card add access its child througe above concept
   // namw             addfriendbtn 
  //day50
//   eventbubbleing
//   formhandleing
//   API calling change structure
//   insted of make HTML CSS JS file we use a bundler vut
  //  make youtbe reel section `