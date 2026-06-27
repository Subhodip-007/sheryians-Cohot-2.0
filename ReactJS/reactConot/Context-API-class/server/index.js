const express= require('express');
const app=express();

app.get('/data',(req,res)=>{
    const dummy=[{
        name:'shub',
        age:30,
        city:"UAE"
    }]
    
    res.setHeader('Access-Control-Allow-Origin','http://localhost:5173').json({data:dummy})
})
app.listen(8000,()=>{
    console.log(" server is running at 8000");
    
})