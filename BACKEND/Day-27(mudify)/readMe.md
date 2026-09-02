# How a real developer works  
we will come to know that by creating a 
mudify app where out application will analize mood of user from face and 
play music accordingly 

now we dont know anything about it...
how to built 
now the first thing is to check is how can we regognize the face 
how to get the face expression
so the wost common thing is to search in google now something that u dont know about project is to be searched 
so we will user google mediapipe landmarker
 try reading doc or gpt 
 create react folder
 and feature  auth and -- > expression folder --> and follow four layer architecture pages compo ,hooks , servises
 
for now we have a component of expression

there is a term called blackbox programing
U DONT HAVE TO KNOW EVERYTHING(exacly !!!) OF IT WORKING JUSH HOW AND WHAT  U KNOW 
WHAT THIS FUNCTION IS DOING BUT EXACLY HOW NOT
in developMent -> blackbox 
in optamize - > doc research req 
task use tensor flow .js for proj 

day - 28  today we will arrange code first 
in expression.jsx -- u have function writter as will as UI 
but jsx -- is used only for  UI level so we will move init  / detect on other file 
create a folder  ---> utils -- >  utils.js 
we dont write logic in UI layer logic 

now we will built the AUTH feature or part 
and understand a topic token black listing
we will have lil folder structuer 
task  si study about user schema.pre / post 
normal auth register setup 
login setup 
task y do we use invalied credentials
 now test it using postman 
 and after that we will create a logout api 
 we will also seee why dont we use mongoDB for blacklisting 
 and use redis 
 day - 29 
 we will do a simple thing 
 GEt getme
 // also implemented select 
now we will implement 
logout api 
we will use clear cookie req.clear.cookie()
creste a model for blacklist token
schema -- token strinmg required unique true timestamp
in middle mwere check blacklita using model

what is throughPUT in DB 
how many req a DB can handel in a given amount of time 
req per sec rps
transaction per sec timestamp
queries per sec qps (operation) 
compaier avg throwput of mongoDB and redis
study about user agent 
youtube bank and genAI video 
now we will implement redis
go to browser 
redis.io create free DB 30mb 
copy public endpoint in this you will get host port click on connect u will get password
now in .env 
create 
REDIS_HOST 
REDIS_port
REDIS_PASSWORD
now to connect redis to our server we will instrall a package npm i ioredis
in config --> cache.js
bcz out redis is not localy running so codel is lil different 
requir ioredis.default(for redis suggesstions) if import then not 
new redis({
    host:
    port:
    password:
})

redis.on("connect/erroe/message",()=>{
    log( server connected to redis)
})
module.exports =redis
now use in middleware
requier
till now we have only connected out server with backend
 same as postmat or compas we have redis insider

 DAY  -
 todays class we will develop api 
 now we will see song upload 
now we will create a model for song 

// now api forn now a simple api to upload songs not auth 
// like only logged in user can only try 

// now we have set routes and controller 
// question is waht is the package the is used to send
// files from frontend to backend bcz normaly our server 
cant read any file 