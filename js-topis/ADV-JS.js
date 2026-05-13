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

console.log(users.get("user1"));
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

console.log(users.user1);
console.log(users["user2"]);

// 	3.	Create a product object that stores name and price and has a method which returns the final price after discount.

// The goal of this section is to understand why keeping data and behavior together makes code easier to manage.

// ⸻

// SECTION 2: Classes and Objects
// 	4.	Create a Car class with the following:
// brand
// speed
// a drive method that prints the car brand and speed
// 	5.	Create two different car objects from the same class and verify that their data is different.
// 	6.	Answer this in your own words:
// If classes did not exist, how would you write this logic and what problems might occur when the project becomes large?

// ⸻

// SECTION 3: Constructor and this keyword
// 	7.	Create a Student class whose constructor accepts name and roll number.
// Add a method introduce that prints both values.
// 	8.	Inside the constructor, set values using this.
// Then try removing this and notice what error occurs and why.
// 	9.	Create an object with two methods:
// One method using a normal function
// One method using an arrow function

// Inside both, print this and observe the difference.

// The goal is to clearly understand how this works and when it changes.

// ⸻

// SECTION 4: Constructor Functions and Prototypes
// 	10.	Create a User constructor function (do not use class syntax).
// 	11.	Add a login method in two ways:
// First, inside the constructor
// Then, move the method to the prototype
// 	12.	Create two User objects and compare their login methods using equality.
// Explain why the result is true or false.

// The purpose here is to understand how prototypes help share behavior efficiently.

// ⸻

// SECTION 5: call, apply, bind
// 	13.	Create a function that prints this.name.
// 	14.	Create an object that contains a name property.

// Use call to run the function using the object
// Use apply to run the function using the object
// Use bind to create a new function and then call it
// 	15.	Borrow a method from one object and run it for another object using call.

// The goal is to understand how this can be manually controlled.


///////////////////
// SECTION 1: OOPS Thinking with Objects
// 	1.	Create an object called laptop that contains brand, price, and a start method that prints “Laptop started”.
// 	2.	Add one more method to the same object that increases the price by 10 percent.
// 	3.	Now imagine you need 10 laptops with same structure but different data.
// Write down (in words or code) what problems you will face if you keep using plain objects.

// ⸻

// SECTION 2: Classes and Objects (Reinforcement)
// 	4.	Create a class named Employee that stores:
// name
// salary

// Add a method showDetails that prints name and salary.
// 	5.	Create three employee objects from the same class and verify that modifying one employee does not affect the others.
// 	6.	Explain in your own words:
// Why is class considered a better option than writing similar objects again and again?

// ⸻

// SECTION 3: Constructor and Initialization
// 	7.	Create a class named BankAccount.
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

  // to practice callback we bring data from situation _github repo data laao 
  //getuserdets("username"callback)
  //getallrepo("userid",callback)
  //getrepodets(repo[0],callback)