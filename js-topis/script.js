// js learn everything
// how js was made 
// history 
//words vs keywords
harsh 
ram 
sham 
// but 
//for // is a keyword in js 
// var // is a keyword in js
// let // is a keyword in js 
// const // is a keyword in js
 
// var let const line-by-line explanation
// us to store data 
var a = 10; // now for this line var will exist in program and it will store value 10 in variable a
  // we can declare like 
  a= 20; // but this in a bad practice because it can create confusion for other developers who are reading our code and they will not understand that we are changing the value of a variable a
  // decleration 
  var a;
 var a = 10; // this is declaration and initialization in one line
// and
let b=10;
// so whats the difference between var and let
// var add itself to window
// var is function scoped 
function test(){
    if(true){
        var a = 10;
    }
    // in other languages if we declare a variable inside a block then it will not be accessible outside that block but in js if we declare a variable with var inside a block then it will be accessible outside that block
    console.log(a); // this will print 10 because var is function scoped and it is accessible outside the block
}
test();

// var can be redeclared and updated no error
var a = 10;
var a = 20;
// so insted of var we can use let
let a=10;
let a=20; // this will give error because we cannot redeclare a variable with let
//  let is not added in window
// now const
const c = 10;
// const cannot be updated or redeclared 
// c = 20; // this will give error because we cannot update a variable declared with const
// const c = 20; // this will give error because we cannot redeclare a variable declared with const
// scope (global scope, function scope, block scope)
 var a = 10; // global scope
 {
        var a = 20; //var dont respect block so it can be used anywhere BUT IT IS FUNCTION SCOPE
 } // THIS IF NOT A FUNCTION
 {
    let b = 10; // block scope respect parent scope
 }
 function test(){
    if(true){
        var a = 10;
    }
    // in other languages if we declare a variable inside a block then it will not be accessible outside that block but in js if we declare a variable with var inside a block then it will be accessible outside that block
    console.log(a); // this will print 10 because var is function scoped and it is accessible outside the block
}
// reassignment and redeclaration
var a = 10; // declaration and initialization
a = 20; // reassignment
let d = 10; // declaration and initialization
d = 20; // reassignment can be done 
//but 
// let d= 10; // declaration not !!!
  // temporald dead zone
  console.log(e); // error is not defined
  //  but 
  console.log(e); // error cannot access 'e' before initialization
  let e=10;
  // noramlly other languages will give error is not defined
  //  but in js it gives error cannot access 'e' before initialization because of temporal dead zone
  // the area in which js knows value exist but cannot access it is called temporal dead zone
  // line 1-73 is temporal dead zone for variable e

  // hoisting impact per time 
  //  let suppose u have var a=10;
  // while exicution it divides into two parts 
  // top declaration phase
  // bottom initialization phase
  // var a=undefined; // this is declaration phase
    // a=10; // this is initialization phase
    // the y we see this error cannot access 'a' before initialization 
    // this is a contoversial topic  in js var is hoisted but not let and const
    // it happnes in all 
    // prove 
     let a=undefined;
     console.log(a); // cannot access 'a' before initialization because a is in temporal dead zone
     let a =10; // so yes it happnessss
     // var->HOISTED->undefined
     // let->HOISTED->temporal dead zone
     // const->HOISTED->temporal dead zone

     // EXERCISE
     Console(nm);// output undefined....
     var nm="harsh"
// ex2
    console.log(r);// cannot access r before initilization
     let r=2;
     // ex3
     var x=2;
     {
        var x=3;
     }
     console.log(x);//x=3
     // block level counter 
     function runBlock() {
    let counter = 0;

    counter++;
    console.log("Counter:", counter);
}

runBlock(); // 1
runBlock(); // 1 (resets every time)

// better closer
function counter(){
    let count=0;
    return function(){
        return count++;
    }
}
let count=counter();
// 1hr 6min..
/////////////////////////////////////////////////////////////////////////////////////
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
console.log("hello")      // we dont have to call it is alraedy called
})();
// hoisting decleration vs expression

ho();

                    // hoisting this will run(statement)

function ho(){}
// but 
exp();

        // this wont run 
let exp=function(){ 

}
//Q what is the diff btw fuc decleration and fuc experssion in hoisting
// Q what will be the ouptut 
greet();
function greet(){
    console.log("heool");
}
// Q convet this function into arrow func
function multipiy(a,b){
    return a*b
}
//Q  identify parameter and argument
function hi(a){
    return a
}
hi(1)
// 
function getscore(...arg){
    let total=0;
    arg.forEach(function(val){
        total+=total+val;
    })
    return total;
}
getscore(10,20,30);
// use case of IIFE
//to make privet veriable
(function(){
  let pin=0;
  return {
    getpin:function(){
        console.log(pin)
    },
    setpin:function(val){
        pin=val;
    }
    
    
  }  
})(); // pin cant be accsed directly // we can js lib from this 

// built a BMI calc
// return weight / (height*height)
// use .tofixed(2);
    //  crate a reusable discout  calc using HOF
    function discCalc(discount){
        return function(price){
            return price - price * (discount / 100);
        }
    }
    let ten=discCalc(10);
    let twenty=discCalc(20)
    ten(200);
    twenty(200); // reuse of function
    // counter
    function conuter(val){
        return function(){
            return val++
        }
    }
    let counterfunc=conuter(1);
    counterfunc();
    //  create a pure function to transform a vlaue 
    function squ(val){
        return val*val;
    }
    squ();
    // creeate a IIFE to isolate variable 
   (function(){
    let password="1234";
    console.log(password); //can be accessed 
   })
   console.log(password);// cant be accsed
// when to use ()=> and function(){}
// in objercts we cant use ()=> key:()=>{}
// array
[]
[1,"hey",2.3,true,{num:2,fight:3},function fun(val){return val%10;}]// not like other language that store only one type of value  
//two ways to write array 
let arr=[1,2,3,4,5]
let arr1=new Array();
// .something() in knows as method (function inside object)
//arr.splice(index,num of values)
arr.splice(2,3);//eg forn index 2 remove 3 val 3,4,5 so remainning in arr [1,2]
let newarr=arr.slice(0,3); //create a new copy of arr form 0 to 2 y not 3 bcz it takes the before value(main array will not change)
let char =['A','D','E'];
// add B and c in index 1

char.splice(1,0,'B','C');
//  to reverse 
arr.reverse(); //  change array
arr.sort(function(a,b){
    return a-b;  //assending
})
arr.sort(function(a,b){  // the reason we give conparison because 
    return b-a;  //desc   // by default sort converts the number into str and return a new array 
    //.sort(blank)only used when array have character
})
// foreach
arr.forEach(function(val){
   return val+1; 
});
// map;
// map is use when you want to make a new array of a aray
let newmap = arr.map(function(val){ 
    return val>2;  //[undefined,undefined,3,4,5]
})
// but in filter
let filter=arr.filter(function(val){
    return val>2;   //[3,4,5]
})
// reduce
arr.reduce(function(sum,val){
    return sum+val;      // 0+1+2+3+4+5=SUM
},0)
// FIND
arr.find(function(val){
    return val===1;   // first value the true the condition
})
// some
let is=arr.some(function(val){
    return val>85;   // eg if even one student have above 85 marks return true
})
let is=arr.every(function(val){
    return val>85;   // eg if each and every student have above 85 marks then only return true return true
})
// dstructure 
// let suppose u want two elem form a aray
//  normally u will do  a=arr[o] and b=arr[1]
let [a, , ,b]=arr; // a=1 and b=2
// if  b to have 4
//  spread opreater
let arr2=arr;// this will create reference val
let arr2=[...arr]; // copy
// objects
{}
//creation
let object={
    name:"shub",
    age:23
};
// // access . nothation
// there are two ways to access name
object.name; // this will litrelly find LITRELLY !! that key
object['name'];  // y two
// let assume 
let aa="name"
object.aa // aa is now there 
// but i have written aa="name";
// of you want to convert 
object[aa] //aa->"name"
// key : value structure
// . vs [] notation
// deep obj
const user={
    loc:{
        lat:12234,
        log:432564
    },
    city:{
        pin:23324,        // nesting in obj
        name:bhopal,

    }
}
user.city.pin;    // deep access

// destructuring
let {pin}=user.city.pin;
// loop
// for in
for(let key in obj){
    return key;
    // if u want key and val
    return key,obj[key];

}
// object.keys(abj); make array of all keys of the object
// object.entries(obj); array of arrays
//
// coping obj
 // spreat
 let speradibj={...obj};
 // object,assigh(pass a blank//or any thing filled obj , the obj u want to copy)
 let newob=Object.assign(obj,obj2);
// deep-cloning
let speradibj={...obj}; // this dont work in nested object { copy{ref}}
speradibj.name="hsofih";
// here comes a concept deepclone
//  convert it into string
JSON.stringify(speradibj);
// give a string
JSON.parse(speradibj);
//convert to real form
let deepclone=(JSON.stringify(speradibj));
//optional chaning
speradibj.name="hsofih";// maybe name dont exist only in speradibj?.name?="hsofih"; // if mot then undefined
// deepcopy 
// shallow copy


///////
//////////////////////////////////////////////////////////////////////////////////////////////
// now cohot 2.0
// introduction to js 26
// why it is imp ? - it is used in webpage -for animation interaction
//what can it do for you?
//  script tab ka use karke attach krna hai js ko,
// js ko browser mein run karna 
// var let const.....
// console.... prompt alart 
// string kya hota hai
// slice template string split replace include
 var a=12;
 let a=12;
 const t=13;
 // can be declared 
 a=14;
 b=15;
 // const cant be 
 // t =14 X
 // just brief 
 console.log();
 console.error();
 console.warn();
 prompt();
 alert();
// strings 
// h ,ada,sdfsf,sfsd "string"
//slice
slice(2,5)// 2-4
//return part of string

// template string // using ` ` // also called template literal
`back-tick`
//split 
"shub aap appna app ho"
split('a')// ja ha a hai waha se toorke array me daldo
// output ['shub' ,'a','ap' ,'appn','a','app','ho']
split('a').join(" "); // remove a and join
replace('a',"hui hui");
replaceall('a',"hui hui");
includes('A')// CHECK IF EXIST OR NOT RETURN TRUE OR FALSE;
//////////////////////////////////////////////////////////////////////////////////////////////
// 27 js basics in cohot
// var let const 
var a=12; // old js
let a=12 // new js
 // y to use let 
 // when we will learn function conept will clear...
 // const 
 const pi=3.14;
 //  cant be changed...
 // console.log
 console.log(); // to console
 console.warn(); //  to console warn yellow
 console.error(); // error console red
 let inpu = prompt("name");// take input and store 
//  this take input and store in the variable name input 
console.log(input);
alert("oioioioioioio")

// string
//  something written in " " or ' '
let s= "shub";
//slice
" shub bhai how r u".slice(2,5); 
// template string
// ` `
// "shub 2+2" - shub22
"shub 2+2"
//"shub"+(2+2) - subh4
"shub"+(2+2)
 // but ` shub ${2+2}`
  ` shub ${2+2}`
split('a')// ja ha a ha i waha se toorke array me daldo
// output ['shub' ,'a','ap' ,'appn','a','app','ho']
split('a').join(" "); // remove a and join
replace('a',"hui hui");
replaceall('a',"hui hui");
includes('A')// CHECK IF EXIST OR NOT RETURN TRUE OR FALSE;
 // statements and extressions
 //  code which is complets with ;
 var a=12; // statements 
 // expression
 12+13
 /// some extra things
 ///////////////////////////////////// imp
 console.info();  /// same hai but kuck browser mai bss alag terika hota 
 // hai bss ek i sigh aajata hai 

 console.table({name:"shub"})// we need a object...
 ///////////////////////////////////// imp
/////////////////////////////////////////////////////////////////////////////////////////////
// cohot js day 3 datatypes 28
// add comments
// using (//) you can add comment ctrl+/
// data types-type of data
// "harsh"-string 
let str="shub";
// 12- number
let x=12;
// false true - boolean
let bool=true;
// [] -array -let arr=[1,2,3,4] ["harsh","3",true,class animal{}] -- MORE THEN ONE USER
let arr= ["harsh","3",true,class animal{}]
// {} - object { NAME:"shub", age:21}; detalis properties of one user 
let obj={
 NAME:"shub", age:21  
}
// symbols- in detail in obj
// float
// 12.3 float
let fr=12.3;
// null - no value
let x=null;
// let user = null;
//NaN- aaisa operation jis ke ans numaric nahi hai 12*"shub"
12*"shun" //- NaN
 // undefined  var a =undefines or var a; same in let
 var a = undefined;
//infinity
var inf=Infinity;
//relative and primitive datatype in js
// var a=12 primitive
// var a=[1,2,3,4]; relative, ref
// a=b; not this is not a copy this is reference
// if u change some val in a then it will change in b also;
// b.pop()
//////////////////////////////////////////////////////////////////////////////////////////////
//assignment1 // day 30
// new things to learn
{/* <script defer src=""></script> */}
// typeof();
// by default prompt gives string..
Number();//  make a string number 
 


//
//////////////////////////////////////////////////////////////////////////////////////////////
//29  js day 4
// operaters in js
// arithmetic operater in js
// + - / * % **
12 + 12 
12 - 13
12 * 13
12 / 12
12 % 2
12 ** 12 // power 12
// asignment operater
// = += -= *= /= %=
let q=1;
q += 1; // 1+1=2
q *= 2;
q /= 2;
q %= 2;
 // comparison poerater
// == not strict compare(value only)
// === strict compare (value + datatype)
2 == "2"//true
2 === "2"//false
2!="2"// false
2!=="2"// true
//12>3
//12<13
//12<=12 and 12>=12
 
// logical ope
// && || !
// AND OR NOT basicllly
// true && true =true
// true && false = false
// true || true = true
// fales || true = true
 //!true - fales
 // !false- true
 // ternary opoerater
 // condition ? dothis(if true):dothis( if false)
let n=Number(prompt("enter a number"));
n%2==0 ?console.log("even"):console.log("false");
// type of checking operation 
// typeof()
typeof(12);
// instance of 
let ar=[];
ar instanceof Array;
// + (concationation)
"sh"+"ub";
// spread and rest (...)
//  if u want acopy of arr not reff

///////////////////////////////////////////// imp
//sperad
let ar1=[1,2,3];
let ar2=[...ar1]; // this have a copy of the ar1 value 
// and if it is changed not effect on arr1
// rest
function abc( ...arg){}

abc(1,2,3,4); //  when a parameter takes multiple val ... converts into array
// nullish coalescing operator
// check if first val in null or undefined if the fallback
// user ?? console.log(no found);
12<13 ?? console.log("not found")
null ?? console.log("not found")

//optional chaining
// safe way to access nested value
// let suppose we have a obj
obj1={
    name:"shun",
    age:26,
}// we dont know if something exist like name or nat 
// to asscss in safer way we use 
obj1?.name?.age;
// HOISTING
 // hoisting impact per time 
  //  let suppose u have var a=10;
  // while exicution it divides into two parts 
  // top declaration phase
  // bottom initialization phase
  // var a=undefined; // this is declaration phase
    // a=10; // this is initialization phase
    // the y we see this error cannot access 'a' before initialization 
    // this is a contoversial topic  in js var is hoisted but not let and const
    // it happnes in all 
    // prove 
     let a=undefined;
     console.log(a); // cannot access 'a' before initialization because a is in temporal dead zone
     let a =10; // so yes it happnessss
     // var->HOISTED->undefined
     // let->HOISTED->temporal dead zone
     // const->HOISTED->temporal dead zone
/////////////////////////////////////////////imp

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// js day 31 js 6
//assignment2 basic operations
test() // yes possible
function test(){
 console.log("hello");
}
//but
//hoisting 
vr(); /// nooo!!!!!!!!!!!
let vr=function say(){
    console.log("hey")
}


////////////////////////
//////////////////////////////////
//day32 js7 loops and conditional in js
 //if // else
    let a=12;
    if(a<13){
        console.log("yes");
    }else{
        console("no")
    }
    // now what
      if("shub"){}
      if(12){}
    // here comes the concept of truthy and falsey
    // (0 false NaN undefined null document.all) will return false
    // rest all values r true 
    // now 
    if(false){}
    else if(false){}
    else if(false){}
    else{
        true;
    }
    // now ternary operater 
    12>13? true:false;
    // 
    let opt=1;
    switch(opt){
        case 1:
        console.log(1);
        break;
        case 2:
        console.log(1);
        break;
     case 3:
        console.log(1);
        break;
        default:
            console.log("not found");
    }
/// loops
// for 
//for(start; end; change)
for(let i=0;i<6;i++){ //  static loop 
    console.log("shub")
}
for(let i=1;i<=10;i++){ // dynamic
    console.log(i);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
let cout=0;
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
let cou = 0;

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
let coun=0;
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
    // function calling itself
    let countrec = (n)=>{
        if(n===5){
            return;
        }
        console.log(n);
        countrec(n+1);
    }
    countrec(0)
    // loop control statement (break,continue)
    // function in js
    //appke code jo turant nahi chalta pr jaab chalaya taab chalta hai
    // and reuse it
    function dosomething(name,age,rollno){
        console.log(arguments[0]); // arguments 
    }
    dosomething("harsh",23,"3");
    //  day 37 js..................
    // block of code reusable 
    // code runs when you call the function

    // arguments vs parameter
    function abcd(age,name){
        // parameter
    }
    abcd(23,"name")// argument

    // rest parameter
    function dets(nam,age,...num){

    } //... in parameter means rest operater 
    dets("shub",32,1,2,3,4,5,6,7,8,9); // rest io converted into array 
     // hoistion variable vs function

     console.log(teee);
        var teee=2;
      // two phase decleratioon and initilization 
     var teee=undefined;

        // TDZ

     teee=2;
     // in function 
     hois() //  yes can be called 
     function hois(){}
     // expression
     hois(); // cant
       let hois=function(){}
     // statements  can be called
     // expression cant be 
 // parameter
 function abcd(a,b,c,d){  // required parameter value which are required if not given 
  return a,b,c,d;

 }
 abcd();// undefined 
//  destructuring(array and obj )


function drt(obj){
    console.log(obj); // print obj that is passed
    obj.age; // to access particuler property of obj 
} // function drt({name,age}){ // now need of using obj.name or .age
drt({name:"shub",age:12});

// defaule value in parametar 
function def(name,age,level=0){ // level has a default value 
 
}
def("shub",29)// as level is not passed so it will be default
// arguments 
// positional arguments
//  the order u have passed parameter in fnc the same way you will pass argument\
//(a,b=0,c,d)
//(1,,3,4) 

//  sperad argument
let arr1=[1,2,3,4] // if you want to sent all elem
// spread( arr[0],arr[1]) // wrong
function abcd(a,b,c,d){

}
abcd(...arr1); // a=1,b=2,c=3,d=4

// function
//classic function
function classic(){

}
// nested function
function nest(){
    function nest2(){
        console.log("nested fnc call")  // 
    }
    nest2()
}
nest();  // when nest is call nest call nest2 -> nest2 runs and console

// scope chain...
let glob=1; // can be used in whole code // global scope
function chain(){
    let infnc=2; //  can be used in whole function even inside innerchain()
 function innnerchain(){
 
 }
}
// IIFE() function
(function(){
 let balance=2000;
})(); // use form creating privet variable 
// immdiadely call  when written 

//ES6 // fat arrow function
let fat=()=>{
    console.log("fesfef");
}

// // anonymous
// function(){ //  function without name
//question so how we will call 

// }
// HOF
// HOF func--> that return a function or accept a function(fun(parameter)) in parameter
function HOF(fuc){
 return function(){   // use case in foreach

 }
}


// collback fun
function callback(cb){  //cb got a function this function is know as callback

}
callback(function(){     // this is acctually cb in which we function passed

})

// first class function
// is a concept this is not a js concept it is a programming concept in all scripting language
//  which says function can be used as variable  
//function that in passed in function 
function FCF(a,b){
 return a,b;
}
FCF(function(){console.log("passed as value")},12);
// day 38 js
// pure function
let elem=10;
function pure(){
    console.log(elem)
}
//umpure
let a=10;
function impure(val){
    return a+=val;
    console.log(a);
}
 impure()
// closure
// every colsure is a HOf function
function clo(){
    let avr=10
    return function(){
        avr++;
    }
}
// ARRAY
[]
[2,3,4,5,6,7]
        // 0 1 2 3 4 5 6 7 8 9
let array=[1,2,3,4,5,6,7,7,8,6]
// two ways to create array
let array1=[];
let array2=new Array();
// how to access elem in arr
arr[1];
arr[2];
// function in array
arr.push(9); // at the end add
arr.pop()// will pop a last value 
arr.shift()//remove value from front
arr.unshift(2)//add value in front
arr.indexOf(8); //give index of tgt element;
// array destructucturing
let [a,b]=arr; // now a and b will have first values of array respectively 
//   a=1 b=2  what if i want a= to have third value and b have 5th
[ , , a, ,b];
// filter
// form a org array it creats a new array fo filtered values in it 
let arrfilter=arr.filter((val)=>{
    //return true;   // if will send all elem to new array
    //condition return val<3;
})                 // if flase no elements 
// some
//map                 // questions
// reduce
 //spread
 let arr=[1,2,3,4];
 let spreadarr=[...arr];// a copy of arr to spreadarr that will have no effech if val changed

// slice
// reverse
// sort                   // question
// join 
// toString
 // iteration over array 
 for(let i=0;i<arr.length;i++){
    console.log(arr[i])
 }
 arr.forEach((val) => {
      console.log(val)
 });
 //  what are objects in js
 {}// obj
 //  way to create object
 let obj={
    //key - value pair!
    name:"shub",
    age:23,
    email:"subh@gmail.com"
 };
 let obj2=new Object();
// creation obj accesing properties,deleting poroperty and Nesteed obj
// accessing
obj.name;
obj['name'];
// delete
delete obj.name;

// nested object
let nestobj={
    name:{
        firstname:"shub",
        middlename:null,
        lastname:"chatterjee"
    },
    info:{
        email:"subhodip",
        genToken:function gettoken(){
            return `your current token no : ${Math.floor(Math.random()*10)}`;


        }
    }
}

//  how to study like a developer 
// dont remeber code
// your code in stuck u dont know the code 
//but u have to find 
// day 39 js 
// recognize how obj are stored 
//  traverse keys of an object
// array as an object


// timing events 
// // question lvl 1
// # 🟢 Level 1 – Basic Function, Array & Object Code Tasks (Easy)

// 1. Write a function `sayHello()` that prints `"Hello JavaScript"`.
 function sayHello(){
    console.log("Hello JavaScript")
 }
// 2. Create a function `add(a, b)` that returns their sum and log the result.
function add(a,b){
    return ` sum : ${a+b}`;
}
// 3. Write a function with a default parameter `name = "Guest"` that prints `"Hi <name>"`.
function defaul(name="guest"){
    return `hi ${name}`
}
// 4. Use rest parameters to make a function that adds unlimited numbers.
let sum=0;
 function restOpe(...arg){
    arg.forEach(val => {
        sum+=val;
    });
    return sum;
 }
// 5. Create an IIFE that prints `"I run instantly!"`.
(function(){
  console.log("I run instantly!")
})()
// 6. Make a nested function where the inner one prints a variable from the outer one.
   function outer(){
        let inval=12;
         return function inner(){
            return inval;
        }
    }
   let oute=outer()
// 7. Create an array of 5 fruits. Add one at the end and remove one from the beginning.
let fruits=["apple","banana","mango","orange","liche"];
fruits.push("cherry");
fruits.shift();
// 8. Use a `for` loop to print all elements of an array.
    let fruits=["apple","banana","mango","orange","liche"];
    for(let i=0;i<fruits.length;i++){
        console.log(fruits[i]);
    }
// 9. Create an object `person` with keys `name`, `age`, and `city`, and print each key’s value.
let userobj={
    name:"shub",
    age: 12,
    city :"kolkata",
}
for (let key in userobj) {
  console.log(key,userobj[key])
    
}

// 10. Use `setTimeout()` to log `"Time’s up!"` after 2 seconds.
let timup=setTimeout(()=>{
    console.log("Times up")
    clearTimeout(timup);
},2000)

// ---

// # 🟡 Level 2 – Functional Thinking & Logic Tasks (Intermediate) day 41

// 1. Write a higher-order function `runTwice(fn)` that takes another function and executes it two times.
let limit=2;
function runtwice(fn){
 while(limit>0){
    fn();
    limit--;
 }
}
runtwice(function(){
    console.log(`run ${limit}`)
})
// 2. Create one pure function that always returns the same output for a given input, and one impure function using a global variable.
let glob=10;
 function pure(a){
    return glob+a;
 }
 function impure(a){
    glob++;
 return glob + a;
 }
// 3. Write a function that uses object destructuring inside parameters to extract and print `name` and `age`.
function objdestructure({ name, age } = obj) {
    console.log(name, age);
}
// 4. Demonstrate the difference between normal function and arrow function when used as object methods (the `this` issue).
 // this 
 console.log(this)
 // this in global scope
 console.log(this)
 // this in function(){}
 function logthis(){
     console.log(this)
 }
  let logarrowthis=()=>{
     console.log(this)
 }
 // in method
 let userobj={
    name:"shub",
    age: 12,
    city :"kolkata",
    thismethod:function(){
        console.log(this)
    },
    thisarrowmethod:()=>{
        console.log(this)
    },
    nestedthismethodarrow:function() {
        let funarro=()=>{
            console.log(this);
        }
        funarro()

    },nestedthismethod:function() {
         function fuc(){
            console.log(this);
        }


    },
    


}
userobj.thismethod() // this return obj itself
userobj.thisarrowmethod(); // this return window
nestedthismethodarrow();// this will return obj itself
nestedthismethod(); // conflict and rebinds to window 
// 5. Given an array of numbers, use `map()` to create a new array where each number is squared.
 let maparr1=[1,2,3,4,5];

 arr.map(function(val){
    return val*val;
 })

// 6. Use `filter()` to get only even numbers from an array.
 let maparr1=[1,2,3,4,5,6,7,8,9,10];

 arr.filter(function(val){
    return val%2==0;
 })
// 7. Use `reduce()` to find the total salary from an array of numbers `[1000, 2000, 3000]`.
let salary=[1000,2000,3000];
let all=salary.reduce(function(acc,val){
    acc+=val;
},0)

// 8. Create an array of names and use `some()` and `every()` to test a condition (e.g., all names longer than 3 chars).
const names = [
  "Avi",     // 3
  "John",    // 4
  "Sam",     // 3
  "Alexander", // 9
  "Ria",     // 3
  "Neha",    // 4
  "Max",     // 3
  "Christopher", // 11
  "Leo",     // 3
  "Ananya"   // 6
];
let lent=names.some(function(name){
    return name.length > 3;
})



// 9. Create an object `user` and test the behavior of `Object.freeze()` and `Object.seal()` by adding/changing keys.
 let userobj={
    name:"shub",
    age: 12,
    city :"kolkata",
 }
 Object.freeze(userobj); // now we cant change any property
 // but we can add property

 Object.seal(userobj); // here your can add a new property

// 10. Create a nested object (`user → address → city`) and access the city name inside it.
let usesets={
    name:{
        firstname:"subhodip",
        lastname:"chatterjee"
    },
    location:{
        address:"23,lane naidu road",
        landmark:"tela nagar",
        city:"goa",

    }
}
console.log(usesets?.location?.city);
// to dont write manualy 
let {city}=usesets?.location; // destructure
