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
    }
    KhasnaKhaRaha(bool){
        if(bool){
            console.log("ha khaa liya")
        }else{
            console.log("na nahi khaaya")
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