 require('dotenv').config()
const app = require('./src/app');
const ConnectToDB = require('./src/config/DataBase');
ConnectToDB();
app.listen(3000,()=>{
    console.log("server started..  at port(3000)");
    
})


