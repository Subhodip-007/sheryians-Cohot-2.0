const app = require("./src/app");

app.listen(3000,()=>{
    console.log("server is running on port 3000....")
})

//  now we have command to run server.js
//  node server.js
//  npx nodemon server.js
//  how we can create custom commant using package.json 
// go to script section in package.json 
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1"
 //       "server":"npx nodemon server.js"
//   }, 
// now if we run server
// just comment npm run name
