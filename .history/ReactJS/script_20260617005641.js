
// day 66 intro to react 
// # Basics of JS Concepts You Need To Know Before Starting React

// ## Basics of JS
// - var, let, const
// - datatype
// - operators (+,-,*,/,&&,||,!)
// - console statement
// - conditionals
// - loops

// ## Arrays Object
// - Methods of Array (push, pop, shift, unshift, length)
// - HOF (forEach, map, filter, reduce, some, find)
// - basic level question solving with array
// - use of objects
// - Array of objects
// - basic questions of array of objects

// ## Destructuring
// - of array
// - of object
// - spread operator
// - rest operator

// ## Function
// - basics function
// - arrow function
// - return statement
// - parameter, argument

// ## Promises, Async Await, fetch api

// ## error handling

// ## import export

// ---


// ## xxxxxxxxx-----------------XXXXXXXXXX-----------------XXXXXXXXX--------xxxxxxxxx

// ## Notes

// ### Basics of JavaScript

// #### var, let, const

// | Keyword | Scope    | Reassign | Redeclare |
// | ------- | -------- | -------- | --------- |
// | var     | Function | Yes      | Yes       |
// | let     | Block    | Yes      | No        |
// | const   | Block    | No       | No        |

// ```javascript
// var a = 10;
// a = 20;

// let b = 30;
// b = 40;

// const c = 50;
// // c = 60 Error
// ```

// **React rule:** Always prefer let and const. Avoid var.

// #### Data Types

// **Primitive**
// - Number
// - String
// - Boolean
// - Undefined
// - Null
// - Symbol
// - BigInt

// **Non-Primitive**
// - Object
// - Array
// - Function

// ```javascript
// let age = 24;            // Number
// let name = "Anubhav";   // String
// let isActive = true;    // Boolean
// let x;                  // Undefined
// let y = null;           // Null
// ```

// #### Operators

// ```javascript
// // Arithmetic
// 10 + 5
// 10 - 5
// 10 * 5
// 10 / 5

// // Logical
// true && false
// true || false
// !true
// ```

// #### Console Statements

// ```javascript
// console.log("Hello");
// console.warn("Warning");
// console.error("Error");
// console.table([{a:1},{a:2}]);
// ```

// #### Conditionals

// ```javascript
// let age = 18;

// if (age >= 18) {
//   console.log("Adult");
// } else {
//   console.log("Minor");
// }
// ```

// **Ternary Operator**

// ```javascript
// age >= 18 ? "Adult" : "Minor";
// ```

// #### Loops

// ```javascript
// for (let i = 1; i <= 5; i++) {
//   console.log(i);
// }

// let i = 1;
// while (i <= 5) {
//   console.log(i);
//   i++;
// }
// ```

// ### Arrays & Objects

// #### Array Basics

// ```javascript
// let arr = [10, 20, 30];
// ```

// **Array Methods**

// ```javascript
// arr.push(40);     // add end
// arr.pop();        // remove end
// arr.shift();      // remove start
// arr.unshift(5);   // add start
// arr.length;
// ```

// #### Higher Order Functions (HOF)

// **forEach**

// ```javascript
// arr.forEach(num => {
//   console.log(num);
// });
// ```

// **map (Most used in React)**

// ```javascript
// let newArr = arr.map(num => num * 2);
// ```

// **filter**

// ```javascript
// let even = arr.filter(num => num % 2 === 0);
// ```

// **reduce**

// ```javascript
// let sum = arr.reduce((acc, curr) => acc + curr, 0);
// ```

// **find**

// ```javascript
// arr.find(num => num > 15);
// ```

// **some**

// ```javascript
// arr.some(num => num > 25);
// ```

// #### Objects

// ```javascript
// let user = {
//   name: "Anubhav",
//   age: 24,
//   isDeveloper: true
// };
// ```

// **Access:**

// ```javascript
// user.name;
// user["age"];
// ```

// #### Array of Objects

// ```javascript
// let users = [
//   { id: 1, name: "A" },
//   { id: 2, name: "B" }
// ];

// users.map(user => user.name);
// ```

// ### Destructuring

// #### Array Destructuring

// ```javascript
// let arr = [10, 20, 30];

// let [a, b, c] = arr;
// ```

// #### Object Destructuring (Very Important for React)

// ```javascript
// let user = {
//   name: "Anubhav",
//   age: 24
// };

// let { name, age } = user;
// ```

// #### Spread Operator ...

// ```javascript
// let arr1 = [1, 2];
// let arr2 = [...arr1, 3, 4];

// let obj1 = { a: 1 };
// let obj2 = { ...obj1, b: 2 };
// ```

// #### Rest Operator ...

// ```javascript
// function sum(...numbers) {
//   return numbers.reduce((a, b) => a + b);
// }

// sum(1,2,3,4);
// ```

// ### Functions

// #### Normal Function

// ```javascript
// function greet(name) {
//   return "Hello " + name;
// }
// ```

// #### Arrow Function (Used in React)

// ```javascript
// const greet = (name) => {
//   return `Hello ${name}`;
// };
// ```

// **Short form:**

// ```javascript
// const greet = name => `Hello ${name}`;
// ```

// #### Parameters vs Arguments

// ```javascript
// function add(a, b) {   // parameters
//   return a + b;
// }

// add(10, 20);           // arguments
// ```

// ### Promises, Async / Await, Fetch API

// #### Promise

// ```javascript
// let promise = new Promise((resolve, reject) => {
//   let success = true;

//   if (success) resolve("Done");
//   else reject("Failed");
// });
// ```

// #### Async / Await (React standard)

// ```javascript
// async function getData() {
//   try {
//     let res = await fetch("https://api.quotable.io/random");
//     let data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
// ```

// ### Error Handling

// **try-catch**

// ```javascript
// try {
//   let x = y + 10;
// } catch (error) {
//   console.log("Error:", error.message);
// } finally {
//   console.log("Always runs");
// }
// ```

// ### Import & Export (ES Modules)

// #### Enable Module in HTML

// ```html
// <script type="module" src="main.js"></script>
// ```

// #### Named Export

// ```javascript
// // math.js
// export const add = (a, b) => a + b;
// export const sub = (a, b) => a - b;

// // main.js
// import { add, sub } from "./math.js";
// ```

// #### Default Export

// ```javascript
// // greet.js
// export default function greet() {
//   console.log("Hello");
// }

// import greet from "./greet.js";
// ```

// #### Mixed Export

// ```javascript
// export const name = "Anubhav";
// export default function greet() {}
// ```

// ## Final React-Preparation Checklist

// Before starting React, you must be comfortable with:

// - map, filter, reduce
// - Object & array destructuring
// - Spread operator
// - Arrow functions
// - Async / await
// - import / export
// destructuring 
// shallow copy 
let arr1=[1,2,3,4,5,6];

let arr2=arr1;
arr2.push(99); //both arr1 & arr2 will have 99 
// to make a proper copy 
let copyarr=[arr1[0],arr1[1],arr1[2],arr1[3],arr1[4]]; // best method
// for shortcur spread operater is used
copyarr=[...arr1];
let[a,b,c]=[...arr1]
let[e,d,...f]=[...arr1]
// try with obj
// concept oj import export 
// type module 

// DAY-67 bascis of react
// Simple analogy
// npm installation
// You buy a book and keep it on your bookshelf.
// You can read it anytime.
// CDN
// You borrow the book from a library whenever you need it.
// little bit of GSAP
//  using GSAP CDN 
// we always put CDN above the script tag of js so that js can read it 
// gsap.to(".box", {
//   x: 50,
//   duration: 2,
//   delay: 1
// });
// same want when take react CDN
{/* <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> */}      
// now if u see there are two script file one is of react library (makes the UI) and one is reactDOM (helps react integrating with DOM)
// react<-------connection btw(reactDOM)---->DOM

 // now console.log(react//reactDOM);
// create ealment h1 using js 
// ceate element h1 using react 
// kya banana hai ,attributes(src,class,id), content
let h1elem=React.createElement('h1',null,'hello form react');
let h2elem=React.createElement('h2',null,'hello form react2');
let div=React.createElement("div",{id:"parent",class:"elem"},[h1elem,h2elem],'child');

// now reactODM will intregrate this 
// forn that we in react DOM we will create a root
let root=document.querySelector("#root");
 let rootelem=ReactDOM.createRoot(root) // body should not be the root so better create a div with id root
 //<div id="root"></div>
rootelem.render(div)
// now another way 
function h1(){
    return React.createElement('h1',null,'hello form function');
}
const h2=()=>React.createElement('h2',null,'hello form react2');
rootelem.render(h1());
rootelem.render(h2());
// task 
//https://in.pinterest.com/pin/183943966026154260/

// DAY 68
// JS -- javascript
// JSX-- javascript + HTML
// lets revise
//--> main.js --> app.js --> components(nav.js);
//main.js
// import app from './app.js'
// root in html select it ReactDOM.createRoot();
// root.rendar();
// app.js
// function app(){
//return()
//}
// expore default app;

// now this is too heavy to make all files everytime so we use bundler
// to  
// now create a react folder using vite 
// in js React.createElement('h1',{className:'icon2'},"Blog")
// injsx lethi = <h1>Blog</h1>;
// now we use a shortcut rafce react-arrow-function-component-export
// import React from 'react'

// const script = () => {
//   return (
//     <div>script</div>
//   )
// }

// export default script
// now normally me call function like fun()
// but in jsx we can call by both <fun /> or fun() 
// DAY-69
// concept of dom and virtual DOM
// pahale we use to directly interact with DOM 
// now user -------> react------>DOM ------>react--->user
// at first we use to say react.createElememt('h1',null(class,id,src),"content(hello)")
// but now direct <h1>hello</h1>
// becaue aggar ham khudse <STATE-MANAGEMENT>(UI management,data-management) karangay to its hard;
//folder structure
// STATE-management : 
// deal with COMPONENTS - rules component ka first letter capltal

// DAY 70
// tailwind css is a utility first frame work
//task https://in.pinterest.com/pin/2885187257923810/

//DAY 71
// component breaking and props drilling
// we print variable in jsx using {varname}
//<h1>{name}</h1>
// {arr.map((elem,idx)=>{ // note this are higher order function
//    return elem
//})}
// map - transform
// filter - for filter value
// calling a jsx file and passing value
// create a simple div card with h1 and use props to 



let h1=document.createElement("h1");
h1.innerHTML="heool form js";
document.body.appendChild(h1);

// youtube react 
// theory...............
// now lets built this with react
// library - GSAP , lenis , reactJS -is use to implement any perticule featuer vs framework -nextJS , anguler -- acts like templater u get everything built in but limit to custom every thing together
// how to work with different files - concept of import / export for that your <script type= "module" src="script.js"></script> type module is used fore es functionality import/export
// export are of two type 
// named - the difference is export const array=[10,2,3,4,5,6];
// default -  export default a; // is used to expore only one perticuler thing from whole code 
// here me can keep any name because me r importion only one thing 
import chacha from "./app.js"
console.log(chacha);
import {array} from "./app.js" // name should be what u have saved in app.js
console.log(array)

// real DOM vs VIRTUAL DOM 
// Real DOM - is the actual DOM tree structure   
// html
// ├─ head
// │  ├─ title
// │  └─ meta
// └─ body
//    ├─ header
//    ├─ main
//    └─ footer
// in real DOM when u click on something like a button the everything reloads again which is not good
// full DOM rerender in real DOM

 // to solve this here comes virtual DOM 
 // how does it work virtual ODM makes a copy of real DOM

 // REAL DOM
 // ├─ head                                                                              
 // │  ├─ title                                  
 // │  └─ meta                                 
 // └─ body
//    ├─ header                                 
//    ├─ main                                 
//    └─ footer  

// VIRTUAL DOM can make two to three copies depentind on your code
// // ├─ head
// │  ├─ title
// │  └─ meta
// └─ body
//    ├─ header
//    ├─ main
//    └─ footer

// now changes are make in  virtual DOM like if u click on button 
// a u want on click the h1 change will happen in copy and 
// the copy compair with real DOM
 
// after change it will apply inly those changes to real DOM (dont re render everything)
// real live search anything on youtube and then play a video the video playing is adifferent page 
// jsx  javascriptXML (html + JS);
// create a element in js 
// let h1=document.createElement("h1");
// h1.innerHTML="heool form js";
// document.body.appendChild(h1);
// but in jsx
// go to app.jsx 
// codin......................
// making folder with vite
// now if u start start making folder of react form scratch its tooo.. creazyyy
// insted my use bundler   tool that helps in make folders eg vite
// before for making folder of react a command that was used is {npm create-react-app} but react has stopped it 
// bcz company says use react as a framework like react with nextjs  or remix bcz react is a library and has limitation and framework is a whole architectuer 
// for learning only react 
// we use npm create vite
// folder structuer 
// node module helps in staring server run (dont go deep !!)
// run this folder npm run dev
// src -> app.jsx
// now inside it remove everything and write a function app(){retrun "heloo"}
// export default app
// now someone in importing it 
// parent of app.jsx -> main.jsx id-root->index.css -> index.html
 // in app.jsx 
 //writh rafce (works with a snippet )
 // now  this time we have instralled latest version dont use latest version 
 //npm create vite@latest
 // app.css i no use now 
 // assets i used to keep importent things eg: svg icons
 // in public me keep static things like font fonts img vido
 // now file eslintrc.cjs play a importent role in making rules,for production ready app  is used to make custom rules for your coding in colaboration or any(merge-conflict);
 // git ignore my keep this this things that me dont want to uplaod github .env, node module 
 // index.html grand father 
 // package.json all configuration like version dependencies
 // readme.md is readme file 

 //COMPONENTS 
 // component based structure.
 //app.js->rafc -><div>create a card </div> now built more 10 cards 
 // wait it will messy and thats y me keep const App = () => { empty
// so we make component based architecture (makeing multiple functions and use them)
// now inside sec create a folder name component 
// components - is a small piece of code that helps like i have a nav component and inside i have icon-component 
// so everything is component (components re-endar not while page)
// inside component create card.jsx
// for nav bar nav-bar.jsx 
// using import and export use
// now u want ke i want to show cards but contern of two cards should be difernet like insta post
// we can do this with the help of props drilling

// YT task1 complete 

// css 
// for now we r using golbal css which one css file for every component 
// now problem - if if have a same class btn but in diff component and u awnt to style differently 
// for more better me use name.module.css 
// best is to use tailwind or and library

// what is feature based and atomic design structure
// now when we a building a website you can built it..
// - feature based
// nav---component
// cards -- component
// text-container-- component
// in simple way breaking into feature


// -atomic
// for example 
// make a button component and us it in different places 
// make a heading and use it for different 

// we combine and use both 

// todo 
// two img one pintrest link 
// ts 
// //# Design Inspirations for Next Task day71

// 1. https://in.pinterest.com/pin/29906785021400572/

// 2. https://in.pinterest.com/pin/1829656095048828/

// 3. https://in.pinterest.com/pin/2885187257698522/

// 4. https://in.pinterest.com/pin/88664686405701622/

// 5. https://in.pinterest.com/pin/211174978568067/

 
// // productive dashboard
