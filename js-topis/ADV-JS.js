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