const express= require('express'); // old way os ther r the old server already made 
// one question  y we r not using import  new way we will study later 


const app= express() // server interns create NOT START
app.get('/',(req,res)=>{ // a endpoint is created the meaning of this line is if user request in "/" then server will response hello world  
    res.send("This is home page")
})
app.get('/about',function(req,res){
    res.send("this is about page ")
})
app.get('/product',function(req,res){
    res.send("this is product page ")
})

app.listen(3000) // server start
// now what is this number(port)
// a os give a port to every application/process 
//  so when to run node server.js your so allorts a port to server 
// its showing Cannot GET / (bcz server is not programmed)
// now we will program this way that if user request anything server will response hello world now the is given by use eg 3000
// so we can communicate with our server in 3000 (we cant give any port we genralay use 8080 3000 8000 7000 5173) y can check in activity bar

// nodem i sa tool that fix that repeted serve start and end
// now WE HAVE A COMMAND npx nodemon server.js

//  what is diff btw npm/npx nodepackagemanager nodepackageexicuter


