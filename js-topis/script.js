// js learn everything
// how js was made 
// history 
//  Chapter 1: Variables & Declarations
// Variables are containers that hold data.
// In JavaScript, you create these boxes using keywords: var , let , or const .
// var – Old and risky
var score = 10;
// Scoped to functions, not blocks
{
var a=30;
}
console.log(a)// can be accessed
// Can be redeclared and reassigned
var score = 20; 
// Hoisted to the top with undefined value

// let – Modern and safe
// Scoped to blocks ( {} )
{
    let a=20;
}
console.log(a); //ReferenceError: a is not defined
// Can be reassigned but not redeclared
// let a=30; X
// but can be
a=30;// reassigned
// Hoisted, but stays in the Temporal Dead Zone (TDZ)

// const – Constant values
// Scoped to blocks
{
    const PI = 3.14;
}
confirm.log(PI); // CANT BE ACCESSED
// Cannot be reassigned or redeclared
// Value must be assigned at declaration
// TDZ applies here too
// But: If const holds an object/array, you can still change its contents:
const student = { name: "Riya" };
student.name = "Priya"; //  OK
student = {}; // not possible
// Scope in Real Life
// Block Scope → Code inside {} like in loops, if , etc.
// Function Scope → Code inside a function
// let and const follow block scope.
// var ignores block scope — which leads to bugs.
{
var x = 5;
let y = 10;
const z = 15;
}
console.log(x); //  5
console.log(y); //  ReferenceError
console.log(z); // ReferenceError

// Hoisting
// JavaScript prepares memory before running code.
// It moves all declarations to the top — this is called hoisting.
// But:
// var is hoisted and set to undefined
// let and const are hoisted but not initialized — so accessing them early gives
//phase one 
var a=undefined;
console.log(a); // undefined
//line 64 - 68 TDZ same happnes with let and const but output is different 

 a = 10; //decleration phase two
 //divided into two parts 
//phase one initialization go to the top of code
// decleration
//  Practice Zone
// . Declare your name and city using const , and your age using let .
// . Try this and observe the result:
    let x = 5;
    let x = 10;

// . Guess the output:
    console.log(count);
        var count = 42;
// . Create a const object and add a new key to it — does it work?
// . Try accessing a let variable before declaring it — what error do you see?
// . Change a const array by pushing a value. Will it throw an error?
//Chapter 2: Data Types + Type System
// In JavaScript, every value has a type.
// These types define what kind of data is being stored — a number, text, boolean, object, etc.
// There are two categories:
// Primitive types – stored directly.
// . String → Text
"hello" , 'Sheryians'
// . Number → Any numeric value
 3 , -99 , 3.14
// . Boolean → True or false
 true , false
// . Undefined → Variable declared but not assigned
let x;// → x is undefined
// . Null → Intentional empty value
    let x = null;
// . Symbol → Unique identifier (rarely used)
// . BigInt → Very large integers
 123456789012345678901234567890n
// Reference types – stored as memory references.
//Object →
 let obj ={ name: "Harsh", ag: 26 }
/////continue
// control flow statement 
// if else if else
if(true)
    if(false)
        if(12,3)
            if(65)//true
// concept of truthy and falsy 
if(loggedin&&admin){

}else if(loggedin){

}else{

}
// switch case
switch(val){
    case 1:
        break;
        case 2:
            break;
            default:

}
//early return pattern 
function getval(val){
    if(val<50)return "c+"
    else if(val<75)return "b"
    else return "A"
}
getval(80);
// practice session
// fun getgrade() return grade 
// rock paper scissor logic
// confution 
// plz add break in cases or all cases will run together
//looooops and conditions
// for while do-while foreach
// for-in and for-of
// for-of – Arrays & Strings
for (let char of "Sheryians") {
console.log(char);
}
// forEach – Arrays
let nums = [10, 20, 30];
nums.forEach((num) => {
console.log(num);
});
// for-in – Objects (and arrays if needed)
let user = { name: "Harsh", age: 26 };
for (let key in user) {
console.log(key, user[key]);
}

// Practice Zone
// . Print 1 to 10 using for
// . Print even numbers between 1 to 20
// . Reverse a string using loop
// . Sum of all numbers in an array
// . Print all characters of a name using for-of
// . Print all object keys and values using for-in
// . Use continue to skip a specific number
// . Guess number game – use while to ask until correct
// . Pattern: Print triangle using *
// . Sum of even numbers in an array using forEach
//functions
//function name(){........}
function run(){          //function decleration / function statement
    console.log("running");
}
let fuc=function(){ //function experssion
    console.log("running");// function name is outside that is fnc
}
// fat arrow
//()=>{...} fat() arrow=> body{}
let es6=()=>{};
// parameter & argument
let carstart=function(){
    console.log("car started.... ") //now every time u call it will print the the same
}
carstart();
carstart(); // now i want different name to print
let carst=function(car){ // now car here parameter
    console.log(`${car} started`);
}
carst("honda"); //honda started; and honda is arguments
// now 
let add=function(v1,v2){
    console.log(v1+v2);
}
add() // now add is empty v1 and v2 dont have any val to take
// let v1 and let v2 so resule undefined + undefined = NaN
// now here comes uscase of by default value (v1=0,v2=0)
// now lets understnd rest and spread
//now 
//  rest & spread
let print=function(a,b,c,d,f,g){
    console.log(a,b,c,d,f,g);     //wrong
}
print(1,2,3,4,5)
//better
let prt=function(...rest){  //... is in parameter space of function {rest}
    console.log(rest);      // and if in array and obj then {spread};
}
prt(1,2,3,4,5)// outpur [1,2,3,4,5] array

//return
// jaha se nikla hai wahi dal dungi
function ret(v1){
    return 12 + v1;    //will return 
}


let val=ret(2); // for 218 line we went to 213 jaha se aaya ho 
// return bola 218 pe 12 daal
console.log(val);

// first class functions concept
// function that r treated like a value that can be passed in function , save in variable
let fcf=function(val){}  //this is a HOF function


fcf(function(){ // this is a first class fuc
    console.log("i am a first class function")
}); // this is val val=function(){}

// higher order function
//  a function that takes an function in paremeter or return a function hof....

function abc(val){
    return function(){
        console.log();
    }
}
abc()()// abc is called for line 239 go to 234 return a function and that alsu need to be run()

function abc(outerVal){
    return function(innerval){
        console.log(outerVal+innerval);
    }
}
abc(34)(5);
// pure and impure functions
// a function that dont evvect a outer or global val is pure function 
let va=12;
function say(){
    console.log(12);
}
//but
// impure function //effect the outside varible
let counter = 12;
function inc() {
    console.log(++counter);
}
inc();

//// closures imppp!!!!
// one fnc -> that return another fun ->and returning function will use parent fucs variable
function closer(){
    let a=10;
    return function(){
        console.log(a)
    }
}
// lexical scoping
function parent(){
    let a=10;          // a is accessable for line 271-277
    function child(){
        let b=12;     // b i accessable for line 273-276
        function subchild(){
            let c=10; // c ------> 275
        }
    }
}
//IIFE 
(function(){

})();

//////////////////////////////////////////////////////////////////////////////////////////////

// // day 33 loop and conditions 
// print form 1 to 10
for(let i=0;i<=10;i++){
    console.log(i);
}
// print even number 1 to 20
for(let i=1;i<=20;i++){
    if(i%2===0){
        console.log(i);
    }
}
for(let i=2;i<=20;i+2){
    console.log(i);
}
//print from 10 to 1
for(let i=10;i<0;i--){
    console.log(i);
}
// print yes 5 times
for(i=100;i<=105;i++){
    console.log("yes");
}
// print the num is even or odd btw 1-10
for(let i=1;i<=10;i++){
    if(i%2===0){
        console.log(`${i}--even`);
    }else{
        console.log("odd")
    }
}
// ask user for a munber and say if its positive or negative
let num=Number(prompt("enter a number"));
let nu=+prompt("enter a number");
num=parseInt(num);
if(num<0){
    console.log("negative")
}else{
    console.log("positive")
}
//

// assignment
//  Level 1 – Pure Beginner Practice

// 7. Ask user’s age and check if eligible to vote
// If age >= 18 → “Eligible”, else → “Not eligible”
let age =Number(prompt("enter age"));
 age<18 ?console.log("no"):console.log("yes");
// prompt handled exception

if(age===null)console.error("u pressed cancel")// if someone cancel the it will give null
    else{
        "    space    "
.trim()// remove first and last space
 if(age.trim()=== ""){
    console.error("u pressed black")
 }
 // string 
 Number("shub")//NaN
 // so 
 if(isNaN(age)){
    console.error("enter a number ")
 }
}
//NaN===NaN x
isNaN();




// 8. Print multiplication table of 5
// Use loop to print 5 × 1 to 5 × 10.
for(let i=1;i<=10;i++){
    console.log(`5 * ${i} = ${5*i}`)
}

// 9. Count how many numbers between 1 and 15 are greater than 8
// Loop and count conditionally.
let count=0;
for(let i=1;i<=15;i++){
if(i>8){
    count++;
}
}
console.log(count);

// 10. Ask user for password and print access status
// Hardcoded correct password. Compare with user input.
let savedpassword = "2005";
let input = prompt("enter password");

if (input === null) {
    console.error("User cancelled input");
}
else {
    input = input.trim();

    if (input === "") {
        console.error("Blank! Please enter a valid password");
    }
    else if (input !== savedpassword) {
        console.error("Please enter correct password");
    }
    else {
        console.log("Access granted");
    }
}
// Level 2 – Slightly Tougher but Logical
// 11. Allow only 3 attempts to enter correct password
// If user gets it right early, stop. If not → “Account locked”
let savespassWord="shub@2005";
let limit=0
while(limit<3){
let i_p=prompt("enter your password")
if(i_p==null){
    console.log("input was closed")
    continue;
}else{
    if(i_p.trim()!==savespassWord || i_p.trim()=="" ){
        limit++;
        console.error(`your password is incorrect & you have more ${3-limit}
             left to enter correct password`);
        
    }else{
        console.log("correct password ")
        break;
    }

}
if(limit==3){
     console.log("locked") 
}

}



// 12. Ask user for words until they type “stop”. Count how many times they typed “yes”
// Loop until "stop" is typed. Count "yes".
let stop = "stop";
let count = 0;

while (true) {
    let ip = prompt("enter any word");

    // handle cancel
    if (ip === null) {
        console.log("cancelled");
        break;
    }

    ip = ip.trim().toLowerCase();

    if (ip === stop) {
        console.log("stopped");
        break;
    }

    if (ip === "yes") {
        count++;
    }
}

console.log(count);

// 13. Print numbers divisible by 7 from 1 to 50
// Use modulo % and loop.
for(let i=1;i<=50;i++){
    if(i%7==0){
        console.log(`7 % ${i} == ${i%7}`)
    }
}

// 14. Sum of all odd numbers from 1 to 30
// Add only odd numbers. Print final sum.
let sum=0; 
for(let i=0;i<31;i++){
    if(i%2!==0){
    console.log(`the number is ${i}`)
        sum+=i;
    }
}
console.log(sum)


// 15. Keep asking number until user enters an even number
// Use while loop. Stop only if input is even.

while(true){
    let num=prompt("enter a even number");
    num=Number(num);
    if(num%2==0){
        console.log(`you entered a even number that is ${num}`);
        break;
    }
}

// 16. Print numbers between two user inputs
// Input start and end using prompt() → print all between.
let st=prompt("enter start number");
let end =prompt("enter end number");
for(let i=st;i<=end;i++){
    console.log(i);
}

// 17. Print only first 3 odd numbers from 1 to 20
// Use loop. Stop with break after 3 odd prints.
let count=0;
for(let i=1;i<20;i++){
    if(count<=3&&i%2!==0){
        console.log(i);
        count++;
    }
}

// 18. Ask user 5 numbers. Count how many are positive
// Use loop + condition + counter.
for(let i=1;i<=5;i++){
    let int=prompt("enter a num");
    if(int>0){
        console.log(int)
    }
}
// 19. ATM Simulator – Allow 3 withdrawals
// Start with ₹1000 balance. Ask withdrawal amount 3 times.
// If enough balance → deduct
// Else → print “Insufficient balance”
let withdrawl=0;
let balance=1000;
while(withdrawl<3){
   let amt= prompt("entet the amount you want to deduct");
   amt=Number(amt);
   if(amt==null|| isNaN(amt)){
    console.log("please enter a valid amount");
    continue;
   }
    if(amt<=balance){
        withdrawl++
         balance=balance-amt;
        console.log(`you withdraw : ${amt} \n
                     your currrent balance :${Math.floor(balance)} \n
                     your remainaig attempts : ${3-withdrawl} \n`)
                    
    }else if(balance<amt || balance<=0){
        console.log(`Insufficient balance \n
            your currrent balance :${balance} \n
            `)
    }

   }
console.log("limit reached");
////////////////////////////////////////////////////////////////////////////
// 34 day js loops and conditions
// Level 1 – Pure Beginner Practice

// 7. Ask user’s age and check if eligible to vote
// If age >= 18 → “Eligible”, else → “Not eligible”

// 8. Print multiplication table of 5
// Use loop to print 5 × 1 to 5 × 10.

// 9. Count how many numbers between 1 and 15 are greater than 8
// Loop and count conditionally.

// 10. Ask user for password and print access status
// Hardcoded correct password. Compare with user input.

// Level 2 – Slightly Tougher but Logical
// 11. Allow only 3 attempts to enter correct password
// If user gets it right early, stop. If not → “Account locked”

// 12. Ask user for words until they type “stop”. Count how many times they typed “yes”
// Loop until "stop" is typed. Count "yes".

// 13. Print numbers divisible by 7 from 1 to 50
// Use modulo % and loop.

// 14. Sum of all odd numbers from 1 to 30
// Add only odd numbers. Print final sum.

// 15. Keep asking number until user enters an even number
// Use while loop. Stop only if input is even.

// 16. Print numbers between two user inputs
// Input start and end using prompt() → print all between.

// 17. Print only first 3 odd numbers from 1 to 20
// Use loop. Stop with break after 3 odd prints.

// 18. Ask user 5 numbers. Count how many are positive
// Use loop + condition + counter.

// 19. ATM Simulator – Allow 3 withdrawals
// Start with ₹1000 balance. Ask withdrawal amount 3 times.
// If enough balance → deduct
// // Else → print “Insufficient balance”
/////////////////////////////////////////////////////////////////////////////////////////////////////
// day 35 js loops condition
// level 2 of assignmet
////////////////////////////////////////////////////////////////////////////////////////
// day 36 loops and function
// remainning question of assignment
// do while
do{
    console.log("hey")
     
} while(3>12)
    //while and if 

    //recurtion 