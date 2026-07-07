const app = require('./src/app');
const mongoose = require('mongoose')
function connectToDB(){
    mongoose.connect('mongodb+srv://subhodip31xd_db_user:myshub2005@cluster0.9qu01r0.mongodb.net/day-6')
.then(()=>{
    console.log("connected to DB");
    
})
}
connectToDB()

app.listen(3000,()=>{
    console.log('server started......');
    
    
})