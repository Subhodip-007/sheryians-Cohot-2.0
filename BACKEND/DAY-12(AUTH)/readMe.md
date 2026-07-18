# AUTHENTICATION SYSTEM
- How a authentication system works and what are the main pillers of auth system 
 # FOUR PILLERS 

  - authentication
  - authorization 
  - validation 
  - verification



  now lets assume we a instagram server and we have 3 users
  
 - now a request is send from a user out o three HOW DO U KNOW WHO SEND THE REQUEST ? we dont know 

  - now to idetify that the request was from which user this is know as authentication

 -  now let suppose we have a collage - student, staff , head (their accesiability of room);

 -  now different type of user have different accessibility or permission  is knows as authorization

- validation supposr u r filling a form and a form have a specific format like phone no have 10 digits and a email adderss should be ters@test.com checking format of data is validation


verification now to verify that the info or credintion of user is real correst in verification

# IMPLEMENTAIION
- AUTHENTICATION -
- now for first time if a user comes the user needs to register 
- now {name , email , passwore} - this data goes to request.body and then to server 
- now after server revives the data server have the work to do like 
- saving data in DB 
- id create for user with user data {token creation (AUTH TOKEN)};
- now this this id or token is send back to user to user
-  now if the user requset somethiing this the request should contain token 
- now when the server recives any request then ot reads the token to know which user send it 

now how does a student know the its the id card of that school only (stamp on id card)
now same way whenever server creates a token it cretes a signatuer withe a secret name JWT_SECRET  string keywork it stays only in server to identife fake data duplicate froged data JWT_SECRET.com rendom string 