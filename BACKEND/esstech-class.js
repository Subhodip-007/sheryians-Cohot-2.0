const tasks = [{id:101,name:"task1"},{id:102,name:"task2"},{d:103,name:"task3"}]

// ITERTE ALL TASK 
 // CREATE TASK  

  
 //callback 
 const fetchData=(user,cb)=>{
    console.log("user fetched...");
    setTimeout(()=>{
        cb(user)
    },3000)
 }
 fetchData("shub",(user)=>{
    console.log(`welcome back ${user}`);
    
    
 })