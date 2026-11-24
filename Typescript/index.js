"use strict";
const a = "world";
const b = 5;
console.log(a + b);
// console.log(a - b); //Error: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
//  datatypes 
// primative data types
// string , number , boolean , array , tupple , vaid / never 
// "hello 21"
const str = "13" + "heool";
const num = 12;
const bool = true;
const arr = [1, 3, 4, 54, 6,];
const tupp = [1, 2, "3", true];
console.log(str);
function greet(name) {
    return name;
}
console.log(greet("shub"));
function setERR() {
    throw new Error("error");
} // infinity loop
const user = {
    name: "shub",
    age: 34,
    gender: "male",
};
function say(data) {
    console.log("hello " + data?.name + "your age is " + data.age);
}
say(user);
// any , unknown
let value;
value = "shool";
console.log(value.toUpperCase());
