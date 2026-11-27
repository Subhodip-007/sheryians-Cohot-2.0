we r building a banking system 
- let basic setup express server
- DB connection 
- user authentication
- and a proper LEDGER system
# basic server built and start
- npm init-y 
- npm i express
- first we create a src folder - 95% code is written
- app - is user to create server instence and config server - which middleware type of api

- require is older used in video - big old company user require
-  nodemon is used only in dev 
- node server.js  in production
- import export  - new 

# now setup database
-- install atlas - create cluster / mongo DB compuss
-- now use your connection URL


# now we will implement auth end-points register , login , logout....

- setup model  --- USER
{ email } , trim , lowercase , match[regix] unique ,
{ name } , required , 
{ password } required , minLength[leng , msg] , select
.pre("save",(next)=>{ if(!this.isModified("password") return next()  or else hsh)})
.methodcompPass = func return await 
timestamps 

# setup routes 
- setup router
# controller 
- auth controller
  user exist - 422
  - express.json()
  - cookieParser()
  - jwt  resource create -201

  # setup services email service