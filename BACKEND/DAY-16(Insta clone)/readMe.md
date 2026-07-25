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