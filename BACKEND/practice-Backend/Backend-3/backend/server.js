import 'dotenv/config';
import { app } from './src/app.js';
import { connectToDb } from './src/config/dataBase.js';
const PORT  = 3000;
connectToDb()
app.listen(3000,()=>{
    console.log("server is running......");
})
