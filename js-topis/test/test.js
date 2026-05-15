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
// const add = x => x + 3;
// const multiply = x => x * 3;

// function compose(...fun) {
//   return function(val) {
//     let result = val;

//     for (let i = fun.length - 1; i >= 0; i--) {
//       result = fun[i](result);
//     }

//     return result;
//   }
// }

// let sum = compose(add, multiply);

// console.log(sum(5)); // 18

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
// let countrec = (n)=>{
//     if(n===5){
//         return;
//     }
//     console.log(n);
//     countrec(n+1);
// }
// countrec(0)
//     function printRightTriangle(n) {
//     for(let i=0;i<n;i++){
//         for(let j=0;j<=n-i;j++){
//             process.stdout.write("  ");
//         }
//         for(let j=0;j<=i;j++){

//             process.stdout.write(" *");

//         }
//          process.stdout.write("\n");
//     }
// }
//  printRightTriangle(5);

// FCF
// let passedfnc=(...val)=>{
//  console.log(`passed function execute ${val}`)
// }

// function execute(fn,...arg){
//     fn(...arg)

// }
// execute(passedfnc,1,2,3,4,5);
// HOF
// let index=0;
// let acc=()=>{
//     return "action number";
// }
// function repeat(n,action){
//     if(n!==0){
//         index++;
//         console.log(`the current index is ${index}`);
//         repeat(n-1,action)
//     }
// }
//  with loop
// function repeat(n,action){
//     for(let i=0; i <= n; i++){
//         console.log(action(),`: ${i}`)

//     }
// }
// IIFE
// let counter=(function(){
//  let conut=0;
//  console.log(`Initialized ${conut}`)
// })()
// rest operater 

// function sumAll(...arg){
//     if(isNaN(arg)||arg==null){
//         return "cant be operated"
//     }
//     let sum=0
//     for(let i=0;i<arg.length;i++){
//         sum+=arg[i];
//     }
//     return sum;
// }
// function outer(){
//     let vari = 10;
//     return function inner(){
//        return vari++;
//     }
// }
// let out=outer();
// out()

// function createCounter(){
//     let count=0;
//     return{
//                 get:function getvalue(){
//           return count;
//         },
//         inc:function increment(){
//             return ++count;
//         },
//         dec:function decrement(){
//             return --count;
//         },

//     }
// }
// let count=createCounter();
// function makemultiplier(a){
//     return function(b){
//         return a*b;
//     }
// }
// let twomul=makemultiplier(2);
// twomul(4);
// function bankAccount(){
//     let balance=0;

//         return{
//              Deposit:function put(val){
//           return balance+=val;
//          },
//          WithDraw:function wd(val){
//              return balance-=val;
//          },
//          GetBalace:function get(){
//              return balance;
//          },
//         }
//     }

// let acc1=bankAccount()

// let yourname=(function(){
//  let name=null;
//  return{
//           GetName:function get(){
//                   return name;
//              },
//               SetName:function set(val){
//                 if(name!==null) return `already set ${name} please use .reset` 
//                  return name = val;
//           },
//           reset:function rset(){
//             name=null;
//             return" reset name !";
//           }



//  }
// })();

// function vPattern(n) {
// //     for (let i = 0; i < n; i++) {

// //         for (let j = 0; j <= 2 * n; j++) {

// //             if (j === i || j === (2 * n-1 - 1 - i)) {
// //                 process.stdout.write("*");
// //             } else {
// //                 process.stdout.write(" ");
// //             }
// //         }

// //         process.stdout.write("\n"); // move to next line
// //     }
// // }

// // vPattern(5);

// var mirrorDistance = function(n) {
//     let rev=0;
//     let org_n = n;
//     while(n>0){
//         let dig = n % 10;
//         rev = rev * 10 + dig;
//         n=Math.floor(n  / 10);
//      }
//      return Math.abs(org_n-rev);
// };
// mirrorDistance(32)
// let sum=0;
//  function restOpe(...arg){
//     arg.forEach(val => {
//         sum+=val;
//     });
//     return sum;
//  }
//    function outer(){
//         let inval=12;
//          return function inner(){
//             return inval;
//         }
//     }
//    let oute=outer()
// let glob=10;
//  function pure(a){
//     return glob+a;
//  }
//  function impure(a){
//     glob++;
//  return glob + a;
//  }

// // this in global scope
//  console.log(this)
//  // this in function(){}
//  function logthis(){
//      console.log(this)
//  }
//   let logarrowthis=()=>{
//      console.log(this)
//  }
//  // in method
//  let userobj={
//     name:"shub",
//     age: 12,
//     city :"kolkata",
//     thismethod:function(){
//         console.log(this)
//     },
//     thisarrowmethod:()=>{
//         console.log(this)
//     }

// }
// userobj.thismethod()
// userobj.thisarrowmethod();
// let salary=[1000,2000,3000];
// let all=salary.reduce(function(acc,val){
//     // returnacc+=val;
// },0)
// const names = [
//   "Avi",     // 3
//   "John",    // 4
//   "Sam",     // 3
//   "Alexander", // 9
//   "Ria",     // 3
//   "Neha",    // 4
//   "Max",     // 3
//   "Christopher", // 11
//   "Leo",     // 3
//   "Ananya"   // 6
// ];
// let lent=names.some(function(name){
//     return name.length > 3;
// })
// class LaptopMaker{
//     constructor(name,price,color){         // when constructor runs 
//         this.name=name;
//         this.price=price;
//         this.color=color
//     }
// }
// let laptop1=new LaptopMaker("HP","60,000rs","blue");  
//             // new-> blank obj run class()->constructor() will automatically run inside constructor value of this that blank obj

// let name1=new classname;
// let classname=class{//.... 
//     }
// class Honda{
//     constructor(){
//          this.wheels=4;
//          this.doors=5;
//          this.companyname="honda";
//          this.horn=true;
//     }

//    }
//    class civic extends Honda{
//     constructor(mondel_year,color){
//         super();
//         this.mondel_year=mondel_year;
//         this.color=color;
//     }
//    }
//    let civic1=new civic();
//    class LockBalance{
//     constructor(){
//         this._pin=null;
//     }
//     set setPin(val){
//         if(val==null){
//             return "pin current value in void please set a pin value";
//         }
//         this._pin=val;
//     }
//     get fetchPin(){
//         return this._pin;
//     }
//    }
//    let makepin= new LockBalance();
// let userObj={
//     name:"shub",
//     email:"shub@example.com",
//     print:function(){
//         return"user logged in"
//     }
// }
//  function democall(){
//     console.log("hey")          //created outside
//   }
//   function takingafunc(fn){
//     fn();
//   }
//   takingafunc(democall)
// let newMaxnumberobj={
//     title:"maxnumberfinder",
//     numbers:[],
//     find:function(){
//         let max=0;
//         this.numbers.forEach(element => {
//             max=Math.max(max,element);
//         });
//         return max;
//     }
// }
// let newaddobj={
//     title:"i am form obj2",
//      numbers: [10, 25, 7, 99, 3]
// }

// console.log(newMaxnumberobj.find.apply(newaddobj));
let laptop = {
    brand: "HP", price: 60000, loptopStart: function () {
        console.log("started");
    },
    incPrice: function () {
        this.price * 10 / 100;
        let finalPrice = this.price + this.price * 10 / 100;
        return finalPrice;
    }

}
// class Employee{
//     constructor(name,salary){
//         this.name=name;
//         this.salary=salary;
//     }// Add a method showDetails that prints name and salary.
//     showDetails(){
//         console.log(this.name,this.salary)
//     }
// }
// let emp1=new Employee("shub",200000);
// let emp2=new Employee("raghay",240000);
// let emp3=new Employee("tushar",100000);
// function fn(fn1) {
//     fn1(function (fn3) {
//         fn3(function (fn4) {
//             fn4(function (fn5) {
//                 fn5()
//             })
//         })
//     })
// }
// fn(function (fn2) {
//     fn2(function (fn3) {
//         fn3(function (fn5) {
//             fn5(function () {
//                 console.log('helo')
//             })
//         })
//     })
// })

////////////////////////////////////////////////////////
function kuchderbaadchaluga(fnc) {
    setTimeout(fnc, Math.floor(Math.random() * 10) * 10000)
}


kuchderbaadchaluga(function () { // this function is callback 
    console.log("hello")
})
// ek function ko agar ek function bhej detay ho to uss function ko callback boltay hai
//  at first there was no promises/async/await didnt exist so we need to do it in callback inside callbacks 
//for example 
// accepts a username    // and run the function cb
function profileLakerAao(username, cb) {
    console.log(`profile fetching of ${username}.....`)
    setTimeout(() => {
        cb({ username: "harsh", age: 21, id: "e3nai83" });        // now this function is somewhere in library 
    }, 2000)

}
function sarepostlakeraao(id, cb) {
    console.log("fetching posts.......")
    setTimeout(() => {
        cb([{ _id: id }, { post1: "hui" }, { post2: "burblr" }, { savedposts: [{ post5: '1LKM' }] }])
    }, 3000);
}
function savedpostlakaraao(id, cb) {
    console.log("fetching posts.......")
    setTimeout(() => {
        cb([{ _id: id }, { savedposts: [{ post5: '1LKM' }] }])
    }, 4000);
}

/// we actually write this code to get something
profileLakerAao("shub", function (profiledata) {
    console.log(profiledata);
    sarepostlakeraao(profiledata.id, function (posts) {
        console.log(posts)
    })
    savedpostlakaraao(profiledata.id, function (saved) {
        console.log(saved)
    })

})
//now we will see what is promises how can it improve the callbackhell
// promises 
//  ek promise do state pe chalta hai ya to resolve hoga ya tou reject hame dona ka code likhna padhta hai


let pr = new Promise(function (res, rej) {   //  pr have three states pendind || fullfilled with res/rej || rejected 
    setTimeout(() => {
        let rn = Math.floor(Math.random() * 10);
        if (rn > 5) {
            res(`success 5<${rn}`)

        } else {
            rej(`error`)
        }     // 3sec tk it will stat in pending state 
    }, 3000);
})

// future when it will run 
// if resolve res
// pr
// .then(function(val){
//  console.log(val)
// })
// //  if reject 
// .catch(function(val){
// console.log(val)

// })   /// now async/await saves you from this .then .catch more cleaner way to handle
async function handlethenCatch() {
    // andar ke code ko try and catch mai rakho
    try {
        let wait = await pr;
        console.log(wait)
    } catch (err) {
        console.log(err)

    }


}
handlethenCatch()

// fetch API  HTTP
// random user api... https://randomuser.me/api/ 
//  in this url info is in JSON format 
// {"name":"shub"}
//  fetch
fetch("https://randomuser.me/api/?results=500")
    // .then(function(data){
    //     console.log(data); // this data i rawdata readable stream 
    //     return data.json();
    // })
    .then((data) => data.json()) //inplesit way 
    // .then((actdata)=>{
    //     console.log(actdata)
    //     console.log(actdata.results[0])
    // })
    .then((actdata) => console.log(actdata.results))
    .catch(function (err) {
        console.log(err);
    })

function instagramPrrJaooDataLakarao(username, cb) {
    setTimeout(() => {
        cb({ id: "1f38i", name: username, age: 12, posts: 12 })
    }, 1000);
}
function jaooWapasUssIdKaPostLakeraaoo(id, cb) {
    setTimeout(() => {// data takes time to come so to mimic we set a timeout 
        //logic in backend // data taking some time to come
        // run cb and pass the data u wanted in it 
        cb({ _id: id, posts: [{ posts1: "url" }, { posts2: "url" }] }) // data passed
    }, 6000);
}
//  our main focus on this 
instagramPrrJaooDataLakarao("shub", function (getdata) {
    console.log(getdata)
    jaooWapasUssIdKaPostLakeraaoo(getdata.id, function (getposts) {  // data came here
        console.log(getposts);
    })
})

// # Day 60 — Exercises

// ---

// ## Exercise 1 — Very Easy (Warming up)

// **Task (Hindi):** Ek function banao `afterDelay`

// **Requirements:**
// - Ye function do cheezein lega:
//   1. `time` (milliseconds)
//   2. `callback` function
// - Given `time` ke baad `callback` call kare
// - Callback ke andar `"Callback executed"` print hona chahiye
function afterDelay(time,cb){
    setTimeout(() => {
       cb("callback executed"); 
    }, time);
}
afterDelay(8000,function(data){
 console.log(data)
})
// **Use case:**
// > “2 second baad ek kaam karna hai”

// **Goal:**
// - Samajhna ki callback delay ke baad kaise execute hota hai
// - Ye `setTimeout` + callback connection hai

// ---

// ## Exercise 2 — Intermediate (Data flow)

// **Task (Hindi):** Ek function banao `getUser`

// **Requirements:**
// - `getUser` `username` lega
// - 1 second ke baad `callback` ko ek object de:
//   - `id`
//   - `username`

// **Then:**
// - Callback ke andar ek aur function call karo `getUserPosts`

// **`getUserPosts` requirements:**
// - `userId` lega
// - 1 second ke baad `callback` ko `posts` ka array de

// **Final output:**
// - User ka `username` print ho
// - Fir uske `posts` print ho
function getUser(username,cb){
    console.log(`fetching data.... of ${username}`);
    setTimeout(() => {
        cb({id:"69",name:"jhanduBam"})
    }, 1000);
}
function getuserposts(id,cb){
    setTimeout(() => {
       cb({id:id,posts:[{post1:"img"}]}) 
    }, 1000);
}
getUser("shub",function(rawdata){
    console.log(rawdata);
getuserposts(rawdata.id,function(posts){
console.log(posts)

})
})


// **Goal:**
// - Samajhna ki ek async ka result next async ko kaise milta hai
// - Callback chaining practice

// ---

// ## Exercise 3 — Intermediate (Callback dependency — thoda painful)

// **Task (Hindi):** Teen functions banao:

// 1. `loginUser`
//    - 1 second baad callback ko `user` object de
// 2. `fetchPermissions`
//    - `userId` lega
//    - 1 second baad callback ko `permissions` array de
// 3. `loadDashboard`
//    - `permissions` lega
//    - 1 second baad callback ko `"Dashboard loaded"` bole

// **Flow:**
// - Pehle `loginUser`
// - Uske andar `fetchPermissions`
// - Uske andar `loadDashboard`
// - Final output console mein print ho
function loginUser(username,pin,cb){
    setTimeout(() => {
          if(username==="shub" && pin===1234){
        cb("login successfull")
    }  else{
        return cb("incorrect username and password")
        
    }
    }, 15000);

}

function fetchpermision(key,cb){
   
    setTimeout(() => {
        if(key==="admin1"){
             cb("permission granted")
        }else{
            cb("access denied")
            return
        }
       
    }, 17000);
}
function loadDashboard(cb){
 setTimeout(() => {
    cb(`╔══════════════════════════════════════════════════════════════════════════════╗
║                          ● heool●                                   ║
║                                                                              ║
║                           • i am a developer •                                    ║
╚══════════════════════════════════════════════════════════════════════════════╝`);
 }, 19000);
}
loginUser("shub",1232,function(data){
    console.log(data)
    fetchpermision("admin1",function(perm){
        console.log(perm);
        loadDashboard(function(dashboard){
            console.log(dashboard);
        })
    })

})

// **Goal:**
// - Callback nesting ko feel karna
// - Yehi structure baad mein callback hell banta hai

// ---

// ### Notes
// - Practice in plain JavaScript using `setTimeout` and callbacks to understand the flow before converting to Promises/async–await.
// Promises is JS
// The states  of a promise is like a love letter

// Pending → you're still waiting for a reply
// Resolved (.then()) → your crush accepts it
// Rejected (.catch()) → her mother catches it 😅

