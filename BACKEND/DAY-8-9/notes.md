SO TODAY WE HAVE DO BASIC INTGRATION OF BACKEND(express) and FRONTEND(react);
so we deploy server in render and vercel render free cant give production level services max (10 user)
only by creation json data through postman and rendar it in react 
concepts covered 
(package required)[

]
- server.js - server start DB connect 
- config folder - database.js - function of DB-connection
- run DBconnect function in server.js
- NOW FOR STORING DATA IN DB you DB needs a special format of data also knows as SCHEMA
- now the SCHEMA IS STORED IN MODEL which helps of operations on DB 
- this model is exported app.js 
and user for post-create()
             delete-findByIdAndDelete()
             get-find()
             patch-findByIdAndUpdate()  
- HTTP method POST GET DELETE PATCH 
- req.body()
- destructure of data 
to fetch data we will use axios inreact
now core policy wont allow u to fetch data CORS stands for Cross-Origin Resource Sharing.
"CORS browser ka permission gate hai—ye decide karta hai ki doosri website se data lene dena hai ya nahi."
npm i cors
app.use(cors())

- dotend package palys a imp role to fetch variable made in .env file required in top of server.js file and user in any file  mongoose.connect(process.env.MONGO_URI)