DAY -31 building perplexity
ok so we r gonna built a ai chat application 
first we decide all feature that we will use
so we will have 
- auth - register ,login , logout
- chat with Ai
- chat history 
- message storage
- Ai research from internet and give solution 

 firat we will built the structure of storing data knows as data modeling  
 -- instrall all package npm init -y 
 npm i mongoose express jsonwebtoken dotenv cookie-parser
 type module for import 

now setup routes and controller folder 

verified feature
user can access featurea in user email verified email is set false

user ---register----server----save data to DB -----genete--- token ---give it to user - now user can access app feature easily 
but now we will add a feature that is verified false - server will not genetate token -- insted me will send a link to user email and when user will click on the link - a request will come to server and set verified true and user can login and use using nodemailer
now we are also using validation usign express validator
for nodemailer doc go to differencebackend github