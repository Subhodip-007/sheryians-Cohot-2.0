// pahale ye dekho ke mouse rectangle kay andar aaya ke nahi 
// now calc ke mouse center se left pe hai ke right pe
 //255       //red         0      //blue             255
 //Range(0-255)
 //  select your center on cont 
 //dqs
 //addEventListeneron rec/cont/center(moucemove = console.log)
 // now weneed to find where is our mouse
 // find the end point of rec/cont both side by x and y
 // rect. getboundingclientrect()= inof of position of obj
  // practice
  // HOF

// // operation functions
// const add = (a, b) => a + b;
// const multiply = (a, b) => a * b;

// // Higher Order Function
// function applyOperation(a, b, op) {
//   return op(a, b);
// }
// console.log(applyOperation(2, 3, add));      // 5
// console.log(applyOperation(2, 3, multiply));
    

  
    // closer counter 
    // function counter(){
    //   let count=0;
    //   return function(){
    //     return ++count;
    //   }
    // }
    // let count=counter();

    
// // Q3. First-Class Functions

// Store a function inside an array and:

// call it from the array
// pass it as argument to another function
// let say=function(){
//   return "hi";
// }

//   let arr=[1,say,4]
 
//   function FCfuc(name){
//     return `${say()},${name}`
//   }
//  FCfuc("Shub", arr[1]);
// 
// function multiplier(outerarg){
//   return function(innerarg){
//     return outerarg*innerarg;

//   }
// }
// let mul=multiplier(2);
// mul(5);

// const add = (...arg) => {
//   let sum = 0
//   arg.forEach(elem => {
//     sum += elem;
//   });
//   return sum;
// };

// // const multiply = (...arg) =>{  
// // };

// function operationsum(operation, ...arg){
//   return operation(...arg);
// }

// console.log(operationsum(add, 1, 2, 3));       // 6
// console.log(operationsum(multiply, 1, 2, 3));  // 6


// function createlogger(prefix){
//   return function(){
//     return `${prefix} server started`;

//   }
// }
// let error=createlogger('error')
// error();
// //
// const add = (a, b) => a + b;
// function once(fn){
//   let called = false;
//   let result;

//   return function(...arg){
//     if(!called){
//       result = fn(...arg);  
//       called = true;       
//     }

//     return result;          
//   }
// }
// let on=once(add)
// on(2,3);
//
const add = x => x + 3;
const multiply = x => x * 3;

function compose(...fun) {
  return function(val) {
    let result = val;

    for (let i = fun.length - 1; i >= 0; i--) {
      result = fun[i](result);
    }

    return result;
  }
}

let sum = compose(add, multiply);

console.log(sum(5)); // 18

// 🧠 Level 1 — Basic Understanding
// Q1. Higher Order Function

// Write a function applyOperation that:

// takes two numbers and a function
// returns the result of applying that function

// 👉 Test cases:

// applyOperation(2, 3, (a, b) => a + b) // 5
// applyOperation(4, 5, (a, b) => a * b) // 20
// Q2. Closure Basics

// Create a function counter() that:

// returns another function
// each time inner function is called → increment count

// 👉 Expected:

// let c = counter();
// c(); // 1
// c(); // 2
// c(); // 3
// Q3. First-Class Functions

// Store a function inside an array and:

// call it from the array
// pass it as argument to another function
// ⚡ Level 2 — Mixed Concepts
// Q4. Closure + HOF

// Create a function multiplier(x) that:

// returns a function
// inner function multiplies input by x

// 👉 Example:

// let double = multiplier(2);
// double(5); // 10
// Q5. Rest Operator

// Write a function sumAll that:

// accepts any number of arguments
// returns sum

// 👉 Example:

// sumAll(1,2,3,4) // 10
// Q6. Rest + Higher Order

// Create a function:

// calculate(operation, ...nums)
// operation is a function
// apply operation on all numbers

// 👉 Example:

// calculate((a,b)=>a+b, 1,2,3,4) // ?
// 🔥 Level 3 — Real Interview Style
// Q7. Closure Trap (IMPORTANT)

// What will be output and WHY?

// function outer() {
//   let count = 0;
//   return function inner() {
//     count++;
//     return count;
//   }
// }

// const a = outer();
// const b = outer();

// console.log(a());
// console.log(a());
// console.log(b());
// Q8. First-Class + Closure Combo

// Write a function:

// createLogger(prefix)
// returns a function
// logs messages with prefix

// 👉 Example:

// let log = createLogger("INFO");
// log("Server started"); // INFO: Server started
// Q9. Rest + Closure Trick

// Write a function:

// once(fn)
// function runs only once
// subsequent calls return same result
// Q10. Hardcore Combo 🚨

// Implement:

// compose(...functions)
// returns a function
// executes from right → left