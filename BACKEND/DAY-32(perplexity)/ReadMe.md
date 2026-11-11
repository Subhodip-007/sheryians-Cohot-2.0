perplexity Ai
firest a simple chat application where u can caht with AI 
and your AI will go to internet and search and give finaL RESULT 

-- FIRST A chat application where we can caht with AI 
-- next and in this we will add a feature there our AI will go to internet
this is our main MVP
chat history maintain 
chat deletion

first we will built basic backend 
-- Authentication system 
-- chat with AI
-- chat history
-- massage storage
-- AI with internet research feature 

now first we will set waht we will store in DB -- datamodeling 
desigh structure of data we will store in DB 

we have designed data model in excalidraw 
npm init 
now install package express mongoose jsonwebtoken dotenv cookie-parser
in package.json type module 
nodemon 
src --> app.js
server.js
DB connection
now we will create all the model files
-- chat , message , user 
--  now basic Authentication
-- register flow is changed
-- auth.route  
--  auth controller 
--  till now what we have done is we have just implemented auth email but we r left with sending link and the when it is clicked it will be verified
so now email send ---> verification link + token ---> when clicked ---> req send to server 
// now we will create login route 
// validator - login 
// get me api 
testing penging - ?
/// basic auth complete---------
now main implementation is AI
we will user multiple models gemini and mistral
-- draw
ai.service.js
now we will use langchain
---  class - 13
today we will cover gen-AI introduction
what is generative-AI --> content generate krran  which can be (text,audio,image,code) LLM
if u want to impleent moodel locally implement tenserflow 
// - day 36(124) now we create our react folder
- built a react app 
- install react-router , tailwind , context 
main file 
 in app we have - app , routes , store-for-redux 
 - wrap store in main
 - call route in app routerProvider = {route};
 -  feature - auth(page hooks service context(redux))

                    main.jsx
                       |
                       v
                     App.jsx
                       |
                       v
                 AppProviders.jsx
                       |
              ┌────────┴────────┐
              |                 |
              v                 v
         AuthProvider      CartProvider
              |                 |
         AuthContext        CartContext
              |                 |
              └────────┬────────┘
                       |
                       v
                     Home.jsx
                       |
              ┌────────┴────────┐
              |                 |
           useAuth()         useCart()
              |                 |
          Auth State         Cart State

            setup cors
          package name morgan logger which req, api , time , info
          now once u  relode your user data fetch in state will reinit to null 
          so to preservee ,in app useredffect getmefunction
  this process is known as hydrtion           
  NOW WE WIll create  a protected component is uuser to prodect access to dashboard wrap dashboarb with protected 
  dont forget to set loading true 
  now we will implement that if u r loggined u cant come to login or register page in login 

  now we will implemeit sockit io for chat implementation of fraonted and backend  
  first implement socket in backend 
  npm i socket.io and in server.js server side setup 

  for client side we have different packege 
  implement using doc 
  chat service - chat.socket.js
  chat - hooks - usechat -- connect frontend and backend together 

  now we will see core functionality - implement storage for AI array the we have made earlier uning server frontend  UI state 
  fron the we need some api simple interaction with ai 
  chat.routes.js 
  first api  - takes user input and give response 
  for now we will send info using postman nad the will be send to ai
  create a controller 
  check through postman and then we will start implemention the feeding req,body message to ai


/// now lets built a feature in which we type comething in input and ai decide the chat title by itself
// ok now for generation title we will not use gemini bcz its a big model insted we will use mistral
npm i langchail/mistral ai
use SystemMessage / HumanMessage 
now will generate /create - we have to create chat user account so that user can create chat


ok 126 and today we r handle ui of dashboard using ai and sfterthat 
we have created a chat.slice.js
after creating chat slice set in central app.store.js

// now we r done with stat layer of chat 

// now we will crete service layer 
services -> chat.api.js

now after this hooklayer -
now the hok is complex so look for it 