import { number } from "framer-motion";

const a = "world"
const b  = 5
console.log(a + b);

// console.log(a - b); //Error: The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.

//  datatypes 
// primative data types
// string , number , boolean , array , tupple , vaid / never 
// "hello 21"
const str:string ="13" + "heool" 
const num:number = 12;
const bool:boolean = true;
const arr : number[] = [1,3,4,54,6,]
const tupp:[number,number,string,boolean] = [1,2,"3",true]
console.log(str);
 
function greet( name:string):string{
    return name
    
} 
console.log(greet("shub"));


function setERR():never{
    throw new Error("error")
    
} // infinity loop



// type 
type USER = {name:string , age: number , gender:string}
const user:USER ={
    name:"shub",
    age:34,
    gender:"male",
    


}
function say (data:USER):void{
    console.log("hello " + data?.name + "your age is " + data.age);
    
}
say(user)


// any , unknown
let value:any 

value = "shool"

console.log(value.toUpperCase());

// but IF 
value  = 1234

console.log(value.toUpperCase()); // this will give a js erroe not ts 

// to solve we use unknow
{
let value:unknown // dynamic but put a condition
value = "shool"
if((typeof a) === "string"){
    console.log(a.toUpperCase());
    
}

}
