// # DAY 56
// concept of OOPS
//  now OOPS is used in big projects not in TO_dosss 
// we dont like write DOM what we did we dont write spageti code 
// CODE KO KAISA BHI LIKHDOOO NAA 
// what if your some part of code starts not working [will you start finding where is the error NO]
// we create code into section(objects,classes,functions)
// moduler  (breaking)
// scalable  (1 to 1000000k use no problem)
// manageable (easy to read find fix)
// reuse   (using same class or function)
// objects
let obj={}; // why to use object
// eg: you have multiple user and a property name !!
let user1={
    name:"shub",
    age:12,
    id:1
};
let user2={
    name:"jhub",
    age:12,
    id:2
};
// you have a cookies every coockies have same shape taste,color -> class make then same
// classes
// constructor() if a function the run the class automaticlly
// classes is made so that we get a new object
// class is factory of object
class LaptopMaker{
    constructor(name,price,color){         // when constructor runs 
        this.name=name;
        this.price=price;
        this.color=color
    }
    turnON(){
        console.log("STARTING....")
    }
}
let laptop1=new LaptopMaker("HP","60,000rs","blue");  
            // new-> blank obj run class()->constructor() will automatically run inside constructor value of this that blank obj

class Insaan{
    constructor(name,age,gender,DOB){
        this.name=name;
        this.age=age;
        this.gender=gender;
        this.DOB=DOB;
        this.KhasnaKhaRaha=function (bool){
        if(bool){
            console.log("ha khaa liya")
        }else{
            console.log("na nahi khaaya")
        }
        
    }
    }

}

// value of this depends when this is running 
// class LaptopMaker{
//     constructor(name,price,color){         // when constructor runs 
//         this   // is a new obj
//      
//     
//     }
// }
// new laptopmaker // is this
// let laptop1=new LaptopMaker("HP","60,000rs","blue");
//let laptop1 is a instance of class

// prototypes (sheared memory)
let insaan1= new Insaan();
let insaan2= new Insaan();        // now this both will have different diffetert KhasnaKhaRaha(bool)
// but the function does same job for both so insthe of creation of same thing two times we use protptype(saving memory)
Insaan.prototype.sansloo=function(){
    console.log("alive");
}
// # DAY 57
//insted of this  
Insaan.prototype.sansloo=function(){
    console.log("alive");
}
class Insaan{
    constructor(name,age,gender,DOB){
        this.name=name;
        this.age=age;
        this.gender=gender;
        this.DOB=DOB;
    }
    KhasnaKhaRaha(bool){               // it will automaticlly be a protptype
        if(bool){
            console.log("ha khaa liya")
        }else{
            console.log("na nahi khaaya")
        }
        
    }
}
// let obj = new Object();
// this keyword is a special keyword
// by default this dont have any value but when it run it has avalue according
console.log(this)// -> window

function thiss(){
    console.log(this) // ->window
}
let objj={
    name:"shub",
    method:function func(){
        console.log(this)        // ->obj
    },    methodout:function(){
        function methodin(){
              console.log(this)    // ->window
        }
            
    }, methodout:function(){
               let innerarow =()=>{
              console.log(this)    // ->obj
        }
            
    }
}
// global -> window 
// function -> window
// es5 function inside obj -> Object
// es6 function inside object -> window
// es5 function inside es5 function inside obj -> window
// es6 function inside es5 function inside obj -> object
addEventListener("click",function(){
    console.log(this);
})

 // call, apply , bind
 // in function value of this ->window but insted you want the value to be a obj 
let obj1={
    name:"shub"
}
function func1(a,b,c){
    console.log(this);
}
func1() //->window
//call()
// insted call like this 
func1.call(obj,a,b,c); // this is call 
//apply()
// now apply in when you want to send value in parameter
func1.apply(obj,[1,2,3]) // in apply we pass the obj and extra values a array[]
// now in bind() it is same like apply() but different bind gives a new function
let newfnc=func1.bind(obj,1,2,3);

// call() runs function and set value of this.
// apply() does the same as call but in parameter first value is a obj and second val is a array of all parameter passed.
// bind()  does the same as call but gives a new function.

// day -58
// class- expression
let name1=new classname; //(test.js:480 Uncaught ReferenceError: Cannot access 'classname' before initialization)
let classname=class{//.... 
    } // whats the dofference
    // hoisting (we cant access the class before)
// inheritence
// class expended with a new class 
//  what is super()
class Honda{
    constructor(){
         this.wheels=4;
         this.doors=5;
         this.companyname="honda";
         this.horn=true;
    }

   }
   class civic extends Honda{
    constructor(mondel_year,color){
        this.mondel_year=mondel_year;
        this.color=color;
    }
   }
   let civic1=new civic();
   // getter and setter ar mainly use to set and get(acess) privet veriable in class 
   class LockBalance{
    constructor(){
        this._pin=null;
    }
    set setPin(val){
        if(val==null){
            return "pin current value in void please set a pin value";
        }
        this._pin=val;     // .setpin=1234;
    }
    get fetchPin(){
        return this._pin;
    }
   }
    // // what is the main difference btw IIFE and getter//setter
    // Feature        IIFE / Closure         Class + Getters/Setters
    // Data Hiding    Uses Function Scope    Uses Private Fields (#)
    // Performance    Higher memory usage    Optimized (Prototypes)
    // Inheritance    Harder to extend       Designed for extends
    // Debugging      Extremely hidden       Visible in DevTools (but protected)


 
// SECTION 1: Objects and OOPS Thinking (Foundation)
// 	1.	Create a user object that stores name and email and has a login method which prints “User logged in”.
let userObj={
    name:"shub",
    email:"shub@example.com",
    print:function(){
        return"user logged in"
    }
}
// 	2.	Imagine you now have 5 users.
// First, think how you would manage them without using a class.
// Then convert the same logic using a class and observe how the code becomes cleaner. Write code for both approaches.
const users = new Map();

users.set("user1", {
  name: "Alice",
  online: true
});

users.set("user2", {
  name: "Bob",
  online: false
});

// console.log(users.get("user1"));
//
const userss = {
  user1: {
    name: "Alice",
    age: 21
  },

  user2: {
    name: "Bob",
    age: 25
  },

  user3: {
    name: "Charlie",
    age: 30
  }
};

// console.log(users.user1);
// console.log(users["user2"]);
class usersss{
    constructor(name,email,age,gender){
        this.name=name;
        this.email=email;
        this.age=age;
        this.gender=gender;
    }
    print(){
       console.log( {name:this.name,
        email:this.email,
        age:this.age,
        gender:this.gender});
    }
}
let userA=new usersss("shub","email@example.com",21,"male");
let userB=new usersss("bipasha","email@example.com",21,"female");
let userC=new usersss("snax","email@example.com",21,"NOT-KNOWN");
let userD=new usersss("knox","email@example.com",21,"male");
let userE=new usersss("rexy","rexy@example.com",21,"male");

// 	3.	Create a product object that stores name and price and has a method which returns the final price after discount.
// class Products{
//   constructor(name,price){
//     this.name=name;
//     this.price=price;
//     this.discount_per=null;
//     this.finalPrice=price;

//   }
//   discount(discount){
//     this.discount_per=discount;
//     let discountAmount = (this.price*discount) / 100;
//     this.finalPrice = this.price - discountAmount;
//     return this;
//   }
// }
// let productA=new Products("shub",9000);
let products = {
  product1: {
    name: "laptop",
    price: 9000,
    discount_per: null,
    finalPrice: 9000,
    discount: function(val) {
      let finalamt = this.price - (this.price * val / 100);
      this.finalPrice=finalamt;
      this.discount_per=val;
    }
  },

  product2: {
    name: "radio",
    price: 10000,
    discount: function(val) {
      let finalamt = this.price - (this.price * val / 100);
      this.finalPrice=finalamt;
    }
  }
};


// let text = "Loading";
// let dots = "";

// setInterval(() => {

//     if (dots === "...") {
//         dots = "";
//     } else {
//         dots += ".";
//     }

//     console.log(text + dots);

// }, 500);




// The goal of this section is to understand why keeping data and behavior together makes code easier to manage.

// ⸻

// SECTION 2: Classes and Objects
// 	4.	Create a Car class with the following:
// brand
// speed
   class car{
    constructor(brand,speed){
      this.brand=brand;
      this.speed=speed;
    }
    drive(){
      return {brand:this.brand,speed:this.speed,name:this.name="shub"}
    }

   }
   
// a drive method that prints the car brand and speed
// a drive method that prints the car brand and speed
// 	5.	Create two different car objects from the same class and verify that their data is different.
let car1=new car("honda","200kmph");
let car2=new car("BMW","250kmph");
// 	6.	Answer this in your own words:
// If classes did not exist, how would you write this logic and what problems might occur when the project becomes large?


// ⸻

// SECTION 3: Constructor and this keyword
// 	7.	Create a Student class whose constructor accepts name and roll number.
// Add a method introduce that prints both values.
class Student{
  constructor(name,roll){
    this.name=name;
    this.roll=this.roll;

  }
  introduce(){
    return{name:this.name,roll_no:this.roll}
  }
}
let Student1=new Student();
console.log()
// 	8.	Inside the constructor, set values using this.
// Then try removing this and notice what error occurs and why.
class tRy{
  constructor(name,age){
    name=name;
    this.age=age;
  }
}
let try1=new tRy("shub",12)
// 	9.	Create an object with two methods:
// One method using a normal function
// One method using an arrow function
let objmethod={
 printThisFnc:function(){
  return this;
 },
  printThisarrowFnc:()=>{
  return this;
 }
}

// Inside both, print this and observe the difference.

// The goal is to clearly understand how this works and when it changes.

// ⸻

// SECTION 4: Constructor Functions and Prototypes
// 	10.	Create a User constructor function (do not use class syntax).
// before es6 (classed was introduced) there was a concept called constructor function 
// when we have contructor function what is the need of class class is more effective
function userFnc(name){
  this.name=name;
 this.login=function(){
  return"loggined";
 }
}

let fun=new userFnc();
let fun1=new userFnc(); 
// 	11.	Add a login method in two ways:
// First, inside the constructor
// Then, move the method to the prototype
userFnc.prototype.logout=function(){
  return "logout"
}
// 	12.	Create two User objects and compare their login methods using equality.
// Explain why the result is true or false.
 //fun.login==fun1.login  false
 //fun.logout==fun1.logout  true because of prototype
// The purpose here is to understand how prototypes help share behavior efficiently.

// ⸻

// SECTION 5: call, apply, bind
// 	13.	Create a function that prints this.name.
    function printThis(...args){
     console.log( this.name,...args)
     console.log();
    }
    let callobj={
      name:"shub"
    }
  printThis.call(callobj);
   printThis.apply(callobj, [1,2,3,4,5]);
   let newBindfun=printThis.bind(callobj,1,2,3,4);
// 	14.	Create an object that contains a name property.
// Use call to run the function using the object
// Use apply to run the function using the object
// Use bind to create a new function and then call it
let newobj={
  name:"subhodip",
  age:12,
  gender:"male"
}

function objcallprint(...arg){
console.log(this.name,this.age,...arg);
}
objcallprint.call(newobj);
objcallprint.apply(newobj,[{id:1,role:"cloud"},{id:2,role:"dcx"}]);
let newbindobjfun=objcallprint.bind(newobj,1,2,3,4,4,5);

// 	15.	Borrow a method from one object and run it for another object using call.
let newobj1={
  name:"shub",
  say:function(sec){
    console.log(`heool ${this.name} in am form `+sec);
  }

};
let newobj2={
  name:"shub2"
};
newobj1.say.call(newobj2,"cse6");
// Create two objects and borrow a method using call() to print another object's data.
let exampleNewobj1={
  name:"shub",
  say:function(){
    console.log(`i am ${this.name} `)
  }
}
let exampleNewobj2={
  name:"bipasha"
}
exampleNewobj1.say.call(exampleNewobj2);

// Use apply() to pass an array of numbers to a function that finds the maximum number.
let newMaxnumberobj={
    title:"maxnumberfinder",
    numbers:[],
    find:function(){
        let max=0;
        this.numbers.forEach(element => {
            max=Math.max(max,element);
        });
        return max;
    }
}
let newaddobj={
    title:"i am form obj2",
     numbers: [10, 25, 7, 99, 3]
}

console.log(newMaxnumberobj.find.apply(newaddobj));
// Create a function introduce() and use bind() to permanently bind it to another object.
// Borrow a method from one student object and use it for a teacher object using call().
// Create a calculator object and use apply() to add numbers from an array.
// Use bind() to create a new function that always prints a fixed user's name.
// Create two car objects and borrow a start() method using call().
// Use call() to invoke a function with different employee objects.
// Create a function that prints full details (name, age, city) and invoke it using apply().
// Create a method in one object and execute it for three different objects using call().
// Use bind() inside setTimeout() to preserve this.
// Create a game player object and borrow its method for another player using call().
// Use apply() to multiply numbers stored inside an array.
// Create a reusable greeting function and attach different users using bind().
// Compare call(), apply(), and bind() with one example each.
// Create an object method and use call() to change the this reference dynamically.
// Use apply() with Math.max() and Math.min().
// Create a banking object and borrow its checkBalance() method for another account.
// Use bind() to delay execution of a function while keeping correct this.
// Create a method in one mobile object and use it for another mobile object using call().

// The goal is to understand how this can be manually controlled.


///////////////////
// SECTION 1: OOPS Thinking with Objects
// 	1.	Create an object called laptop that contains brand, price, and a start method that prints “Laptop started”.
let laptop={
    brand:"HP", price:60000,loptopStart:function(){
        console.log("started");
    },
    // 	2.	Add one more method to the same object that increases the price by 10 percent.
    incPrice:function(){
        this.price*10/100;
        let finalPrice=this.price+this.price*10/100;
        return finalPrice;
    }
        
}

// 	3.	Now imagine you need 10 laptops with same structure but different data.
// Write down (in words or code) what problems you will face if you keep using plain objects.
// i have to create a individual object for every individual product or laptop
let laptop2={
    brand:"HPvictus", price:50000,loptopStart:function(){
        console.log("started");
    },
    // 	2.	Add one more method to the same object that increases the price by 10 percent.
    incPrice:function(){
        this.price*10/100;
        let finalPrice=this.price+this.price*10/100;
        return finalPrice;
    }
        
}
let laptop3={
    brand:"HPlogan", price:80000,loptopStart:function(){
        console.log("started");
    },
    // 	2.	Add one more method to the same object that increases the price by 10 percent.
    incPrice:function(){
        this.price*10/100;
        let finalPrice=this.price+this.price*10/100;
        return finalPrice;
    }
        
}

// ⸻

// SECTION 2: Classes and Objects (Reinforcement)
// 	4.	Create a class named Employee that stores:
// name
// salary
class Employee{
    constructor(name,salary){
        this.name=name;
        this.salary=salary;
    }// Add a method showDetails that prints name and salary.
    showDetails(){
        console.log(this.name,this.salary)
    }
}

// 	5.	Create three employee objects from the same class and verify that modifying one employee does not affect the others.
let emp1=new Employee("shub",200000);
let emp2=new Employee("raghay",240000);
let emp3=new Employee("tushar",100000);


// 	6.	Explain in your own words:
// Why is class considered a better option than writing similar objects again and again?
// class make it easy to make objects or it works like a blueprint and make a new object with a new key and unique name 

// ⸻

// SECTION 3: Constructor and Initialization
// 	7.	Create a class named BankAccount.
class BankAccount{

}
// Its constructor should accept accountHolderName and balance.
// 	8.	Inside the constructor, store both values using this.
// 	9.	Add a method deposit(amount) that increases the balance.
// 	10.	Create two bank accounts and deposit money into only one.
// Observe and explain why the second account is not affected.

// ⸻

// SECTION 4: Understanding this (Very Important)
// 	11.	Create an object named profile with a property username and a method printName that logs this.username.
// 	12.	Call the method normally and observe the output.
// 	13.	Store the method in a separate variable and call it.
// Observe what happens to this and explain why.
// 	14.	Modify the code so that this works correctly again.

// ⸻

// SECTION 5: Constructor Function and Prototype
// 	15.	Create a constructor function called Vehicle that accepts type and wheels.
// 	16.	Add a method describe inside the constructor and observe memory behavior when multiple objects are created.
// 	17.	Move the same method to Vehicle.prototype and repeat the test.
// 	18.	Explain why the prototype approach is preferred.

// ⸻

// SECTION 6: call Method Practice
// 	19.	Create a function showBrand that prints this.brand.
// 	20.	Create two different objects with brand values.
// 	21.	Use call to execute showBrand for both objects.
// 	22.	Explain what problem call is solving here.

// ⸻

// SECTION 7: apply Method Practice
// 	23.	Create a function introduce that accepts two arguments: city and role, and prints name, city, and role using this.name.
// 	24.	Create an object with a name property.
// 	25.	Use apply to call introduce using the object and an array of arguments.
// 	26.	Explain in simple words how apply differs from call.

// ⸻

// SECTION 8: bind Method Practice
// 	27.	Create a function greet that prints “Hello” followed by this.name.
// 	28.	Bind this function to an object and store the returned function in a variable.
// 	29.	Call the bound function later and observe the output.
// 	30.	Explain why bind is useful when functions are executed later or inside callbacks.

// day 59
// told to study video
//////////////////////////
// 03:08:05 – 03:49:54 • Callbacks, Promises & Async/Await
// callback
//  ek aaise f
function kuchderbaadchaluga(val){
    setTimeout(()=>{
        console.log(val)
    },1000)
}
/////////////////////////
// async js 
// js is single threaded  one work at a time
// syncronus approch first work done the other work
// async approch do first work if its taking time work on it side by side and let other exicute

// callback -> ek function jo turant nahi chalega 
// it will run jaab appka koi kaam complete hooo
// (function) that is passed into a function is a callback function
 setTimeout(() => {
    console.log("hey")  // 1sec baad is console ko run krr dena 
 },1000);
                   // when we get userID    // run this function 
 getDataFromInsta("username",function(){})
 // in foreach we give a function 
 // in addevnetlintenr we give a function that function ia a call back 
  // now 
//   function democall(){
//     console.log("hey")          //created outside
//   }
//    function democall(){
//     console.log("hey")          //created outside
//   }
//   function takingafunc(fn){
//     fn();
//   }
//   takingafunc(democall)
  function takingafunc(fn){    // taking function is taking a function in parameter means when we call takingfun it will accept a function
    fn();                      // after acception we told takingfnc to run the function u accepted from parameter 
  }

  // called   //accept a fn 
  takingafunc(function(){      // here is what 
    console.log("hey");
  })

  // now make it more complex
  function takingafunc(fn){    // taking function is taking a function in parameter means when we call takingfun it will accept a function
    fn(function(){
        console.log("hey")
    });                      // after acception we told takingfnc to run and return a function ,the function u accepted from parameter 
  }

  // called   //accept a fn 
  takingafunc(function(fn1){      // here is what 
    fn1()
  })
  // callback hell 
  function fn(fn1) {
    fn1(function (fn3) {
        fn3(function (fn4) {
            fn4(function (fn5) {
                fn5()
            })
        })
    })
}
fn(function (fn2) {
    fn2(function (fn3) {
        fn3(function (fn5) {
            fn5(function () {
                console.log('helo')
            })
        })
    })
})
  // to practice callback we bring data from situation _github repo data laao 
  //getuserdets("username"callback)
  //getallrepo("userid",callback)
  //getrepodets(repo[0],callback)


//   Level 1 — Core Callback Basics (no tricks, just clarity)

// Start here. If anything feels shaky, don’t move on.

// What is a callback function?
// → Write a function that takes another function and executes it.
// Create a function greet(name, callback)
// → It should print the name, then call the callback.
// Pass different callbacks:
// one that says "Good morning"
// one that says "Good evening"

// Write your own version of forEach:

// myForEach(arr, callback)

// Why is this a callback?

// setTimeout(() => console.log("Hello"), 1000);

// 👉 If you can’t explain why, you don’t fully get callbacks yet.

// Level 2 — Real Usage (Async Thinking Starts Here)

// Now introduce delay + unpredictability.

// Simulate an API call:

// function fetchData(callback) {
//     setTimeout(() => {
//         callback("data received");
//     }, 1000);
// }

// → Print the data using the callback.

// Add error handling:

// callback(error, data)

// → Practice Node.js style callbacks.

// Write:

// function login(user, callback)
// function getProfile(callback)
// function showDashboard()

// → Chain them using callbacks

// Level 3 — Callback Hell (feel the pain)

// Now intentionally make messy code.

// Rewrite this using only callbacks:
// Login
// Fetch user data
// Fetch posts
// Fetch comments

// 👉 All nested.

// You should end up with something like:

// login(user, function() {
//     getData(function() {
//         getPosts(function() {
//             getComments(function() {
//                 console.log("done");
//             });
//         });
//     });
// });
// Add error handling in each level 😈
// → This is where things become ugly fast.
// Level 4 — Understand the Problem Deeply

// Don’t skip this thinking step.

// Answer these:

// Why is callback hell bad?
// Is it just about indentation? Or something deeper?
// What happens when debugging?
// What about reusability?

// If your answer is only “it looks messy,” you're missing the real issue.

// Level 5 — Fixing Callback Hell

// Now evolve.

// Convert your callback hell code into:
// named functions
// cleaner structure
// Then convert it into Promises
// Then convert it into async/await
// Level 6 — Advanced Callback Thinking

// This is where most learners stop—but this is where mastery begins.

// Write a function that:
// takes a callback
// calls it multiple times (like events)
// Create your own:
// function eventListener(callback)
// What’s the difference between:
// synchronous callback
// asynchronous callback
// Trick question:
// console.log("Start");

// setTimeout(() => console.log("Callback"), 0);

// console.log("End");

// 👉 Explain the output properly (not just guess it).

// Level 7 — Interview-Level Understanding
// What is inversion of control in callbacks?
// What are the risks of callbacks?
// trust issues
// multiple calls
// never called
// How do Promises fix these?
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

// day 61 ADVJS
// promises, async,setTimeout,setintervel

//promises
// ek kaam jake karo
//state
//-> pending state krr rahay ho
// -> ya hogaaya (resolve)
// -> ya to nahi hua (reject)

// 
const prm= new promise((reslove,reject)=>{ /// jaao orr laker aao
    // -> logic to go and bring data
    //-> if data aaya ->resolve
    // else reject
 setTimeout(()=>{
    reslove()
 },3000)

})
prm
.thne(function(){
 console.log("resolved")
})
.catch(function () {
    console.log("reject")
})
// real world example (plz dont try to understand before u know what is fetch and async await)
fetch(`https://randomuser.me/api/`) // where is promises jisne fetch banaya hai usne promises banaya hoga 
.then(function(notReadableData){
return notReadableData.json();
})
.then(function(readableData) {
    console.log(readableData);
})
.catch(function(err){
    console.log(err)
})
// fetch se kisi url pe ja saktay hai
 // fetch ka data by default not readable hota hai
 // ussay  json banake read kartay hai 
 // uske baad radable hota hai 

// async await 
// promises based hota 
 // await sirj promises ke pahale lagth hai
 // await ko ek function ke andar banana zaruri hai or uske aagaya async likhna hai !!!
 
function getnum(){
    return new promise((resolve,reject)=>{
        setTimeout(()=>{
            let rn=Math.floor(Math.random()*10);
            if(num>5){
                resolve(true);
            }else reject(false)
        },1000)
    })
}
//getnum().then or catch
// but in async await

async function asyawt() {
    await getnum();
}
//  real world we dont write promises 