HOW WE DESIGN 
 HOW it work with real world application 
Source Code (GitHub):
https://github.com/ankurdotio/yt-auth

🚀 What You Will Learn -
Authentication Architecture
User Registration & MongoDB Setup
Identifying Users from Requests
Access Token & Refresh Token Flow
Refresh Token Rotation
Session Management System
Logout & Logout From All Devices
OTP Based Authentication

🛠 Tech Stack Used - 
Backend: Node.js + Express.js
Database: MongoDB
Authentication: JWT (Access Token + Refresh Token)
Security: Token Rotation + Session Management
OTP Authentication: Email/OTP Verification Flow


🧭 Project Timeline - 
00:00:00 – Introduction
00:00:50 – What is Authentication
00:04:09 – How Authentication System Works
00:14:13 – Registering User & MongoDB Database Setup
00:48:13 – Identifying User from Request
01:01:20 – Access Token & Refresh Token Working
01:16:24 – Implementing Access Token, Refresh Token & Token Rotation
01:31:16 – Managing Sessions, Logout & Logout From All Devices Feature
02:07:39 – OTP Based Authentication Working
02:13:23 – OTP Based Authentication Implementation
02:42:40 – Outro
 npm init - y , express , mongoose , type module logger(morgan)
 if mongo cluster not setup create cluster mongo atlas and setup 
 // setup app.js express and server.js 
 config.js file  (new)
 // DB setup 
 // model user model
 // routes auth -- controller auth ---- register to understand congept of token genteration  
 // now a end point that identify the user - getme  (bcz we have created token while register so we can user getme auto login register )
 
 now if your token is stolen 


-- access token and refresh token concept is implemented
-- let suppose user A and user B token so for exp user a can call user Bs getme api 

-- to prevent this we mainly prevent it while storing  -  
 -- store in cookies - if not httponly, secure , maxage  -- weak 
 -- store in localstorage - weak access directly using js - scripting 
 -- so we directly store in memory (but if we store in memory and reload then the token is lost)
 -- so we user the concept of access token and refreshtoken 
 so what we do is 
 - user register generate accesstoken(memory) send and stored a json to frentend and refreshtoken (cookies)
                 START
                   |
                   v
             REGISTER / LOGIN
                   |
                   v
       Backend generates TWO JWT tokens
                   |
          +--------+--------+
          |                 |
          v                 v
     ACCESS TOKEN      REFRESH TOKEN
          |                 |
          v                 v
     JSON Response      Set-Cookie
          |                 |
          v                 v
    React stores it     Browser stores it
     in MEMORY          HTTP-ONLY COOKIE
          |                 |
          +--------+--------+
                   |
                   v
           NORMAL API REQUEST
                   |
                   v
      React sends Access Token in
        Authorization: Bearer <token>
                   |
                   v
        Backend receives request
                   |
                   v
          jwt.verify(accessToken)
                   |
                   v
          Is Access Token Valid?
             /           \
           YES            NO
            |              |
            v              v
      Return Requested   Return 401
           Data          Unauthorized
                           |
                           v
                  AXIOS INTERCEPTOR
                           |
                           v
                  Calls /auth/refresh
                           |
                           v
                 Browser automatically
                 sends HTTP-only cookie
                           |
                           v
                    COOKIE PARSER
                           |
                           v
              Reads req.cookies.refreshToken
                           |
                           v
              Backend verifies Refresh Token
                           |
                           v
                Is Refresh Token Valid?
                     /          \
                   YES           NO
                    |             |
                    v             v
             Generate New     Return 401
                Tokens        Login Again
                    |
             +------+------+
             |             |
             v             v
        NEW ACCESS     NEW REFRESH
           TOKEN          TOKEN
             |             |
             v             v
        JSON Response   Set-Cookie
             |             |
             v             v
        React updates   Browser updates
        token in        HTTP-only cookie
        MEMORY              |
             |              |
             +------+-------+
                    |
                    v
          RETRY ORIGINAL API REQUEST
                    |
                    v
          Sends NEW ACCESS TOKEN
                    |
                    v
          Backend verifies token
                    |
                    v
          Return Requested Data
                    |
                    v
                   END

now LOGOUT FROM ALL DEVICES 
-- excalidrew 
-- user A - device - 4 
using session -- {
     userID 
     refreshtoken(hashed),
     ip 
     userAgent 
     revoke bYdefault: false - {if true the the following refreshtoken cant be used invalid }
     createat/updateat 

}
creata model session.model.js
during register we create a sessionmodel of user


now while logout what happnes 
-  we get reftoken 
- convert hash and compair with session hash and revoked:false 
revoked - true 
res.clearcookei 
save the session

now in refresh token controller we check refreshToken validity before rotation
and save the newreftoken hash in this controller 

now let suppose user logout refresh token is invalid 
but assess token is still valid till - 15min so when we logout we maintain a 
token blacklist of accessToken while logout mainly stored in redice scaling we can user redis from scaling or short life les expire time 8-10min

logout for all
reftoken from cookie check 
hash- convert hash and compair with session hash and revoked:fals
 using find many and set 

LOGIN controller 
any addition 
genereate access and refresh and set refresh in session set in cookies

now reister email verification using otp or link

