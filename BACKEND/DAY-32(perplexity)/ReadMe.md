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

// - day 36 now we create our react folder