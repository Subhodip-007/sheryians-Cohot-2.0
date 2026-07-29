we r going to create sort of insta clone firat basic feature like 
- Auntentication register login logout-(in logout we will study token black listing)
 
-  {OTP BASED REGESTRATION (challange)}

==> post
- user create 
- can see feed 
- like post (2 topic collection type of DB)
- save post 

==> user 
-  following follower 

so first we decide what to create and then we r implemention backend first 

now backend basic set up and 
src -> app -> server -> DB -> model
user schema
user={
    username,
    email,
    password,
    bio,
    profilepic,  we need to add a default profile img 
}
and in this project we will also study about cloud storage provider it can be any(AWS s3) in this project we r using imagekit.io

now i imagekit we have uploaded a default pic file and we will get a url of it now same think thing we have to do with server
for now just to undesrtant that here we store file and user it as url

now our user model is ready 
now lets built register--
routes --> auth.routes..js -->register store user data in DB and provide token now we have handel DB load user $or:[]

now lets create a api for login...


now also we have introduced controller folder and it is mainly used to write logic of apis  
 

 RIGHT NOW THE FOLDER STRUCTURE WHICH WE R WORKING ON IS A

 ## MONOLOTH FOLDER STRUCTURE
 /////////////////////////////////////////////////////////
1. Basic MVC Structure (Best for beginners)

This is the most common structure for small to medium Express projects.

backend/
│
├── config/
│   ├── db.js
│   └── env.js
│
├── controllers/
│   ├── auth.controller.js
│   └── user.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── upload.middleware.js
│
├── models/
│   ├── user.model.js
│   └── post.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   └── post.routes.js
│
├── utils/
│   ├── logger.js
│   ├── generateToken.js
│   └── hashPassword.js
│
├── app.js
├── server.js
├── package.json
└── .env

Best for:

Learning Express
Small projects
Portfolio projects
2. Feature-Based Structure (Recommended for larger projects)

Everything related to one feature stays together.

backend/
│
├── modules/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.routes.js
│   │   ├── auth.service.js
│   │   └── auth.validation.js
│   │
│   ├── users/
│   │   ├── user.controller.js
│   │   ├── user.routes.js
│   │   ├── user.model.js
│   │   └── user.service.js
│   │
│   └── posts/
│       ├── post.controller.js
│       ├── post.routes.js
│       ├── post.model.js
│       └── post.service.js
│
├── config/
├── middleware/
├── utils/
├── app.js
└── server.js

Best for:

Large applications
Teams
Microservices


## day - 17 post creation
till now me have created only one model and operated with it now we have to create another model and work with it together which is of post 

now starting with last day what we did we created two apis register and login and in register 
we stored password like a hash using crypto but its not that good so we will user 
bcrypt 
- Auntentication register login (done)
 logout-(in logout we will study token black listing) we will do this later
-  {OTP BASED REGESTRATION (challange)}

==> post 
- user create 
- can see feed 
- like post (2 topic collection type of DB)
- save post 

==> user 
-  following follower 

for now we will do postcreation 
so out post model will look like 
caption,imgsrc,user-ID,like comment will not come under this (reason in next class) , createdat 

- let create a model of it 
- after model post route is created
- for the following route we will create a controller for postcreation route   
- now after this we know that backend dont understand req.body - data for that we user a middleware not for normaly if we sent something in json form it is in raw form but in postcreation we will send some files from frontend/ postman to server  console.log(req.body); // first post file will come to server and then to imagekit(what is the role of img kit)
 // now when u sent through postman express cant read req.body by default
 // we need another middleware like express.json for this we user a package name npm i multer
now 
// now start reading documentation 
multer use two storege disk storage and ram storege(for temp) now we will use memory storae bcz we dont store file in server (excali draw)
 and for now we requir multer in post,route 
 let assume user post a img and we store it in server 
 and the user have 2000 follwoer now the server has to server the post to 2000 user
 now data use means bandwidth use
or server will take 200mb to transfer or serve
we have to pay simply 
more bandwidth
more pay in server bandwidth
 as compare to cloud storage provider
now cloud storage provider helps in providing storage in less price
compare to server storage 

so steps 
- using multer take file from frontend/postman to server 
-  now server store the file in temp memory(not in disk) untill is  sends the file to cloud storage and server remove it from memory 
now we user a middleware mulet and using postman we sent caption and img and test it using console.log(req.file,req.body)
 today we have to read two doc one of imgkit.io and multer

 for now we need installation and file uploading 
 ## day-18 post creation
 now last time we have set our post creation route with multer that it will accept a file name img 
 and i controller we write the logic that to accept the buffer because out buffer contain the original data 

 now how will th eserver know which user has created the post so for that we will user toker how when ever user login user gets a token and whaen ever user send a req it send the token also 
 so server verifies toke and then upload data to cloud provider 
## extrass 
(extra knowlage in real development we dont user log insted user npm install pino-pretty)
Problems:

No timestamps
No log levels
Difficult to search
Cannot easily save to files
No JSON formatting
Hard to integrate with services like Datadog, Grafana, ELK Stack
// utils/logger.js

const pino = require("pino");

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

module.exports = logger;
Instead of

console.log("Server started");

write

const logger = require("./utils/logger");

logger.info("Server started");
info → successful operations
warn → something unusual
error → exceptions
fatal → application crash