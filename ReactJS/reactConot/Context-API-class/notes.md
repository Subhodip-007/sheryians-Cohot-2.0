context API will help u in better state-management
app.js ---> home.jsx------> navbar 
                    ------>allsec ------>sec1,2,3  [2]---->allcourse
                    ------>footer
so form now to understand we have created our dummy server that pass data from backend to frontend 

for server creation  
- create a server folder 
- run npm init
- create index.js
- run npm i express
- write code from server in index.js
- then run server node index
- localhost 8000 

now we can fetch data in our frontend using axios

lets come back to our topic :
-- we got the data in app.js
now using normal props drilling we if we want to send data to course.jsx
app--->home---->allsec--->sec2----->course
now this is useless y cant i directly send app---->course
bcz app can give data to childern only not to grandchildren
for understanding the pain make components and sent data to course form app 
to solve this here comes a REACT inbuilt feature call context API

lets make a centealized place
                    DATA SHARING IN REACT
                             │
            ┌────────────────┴────────────────┐
            │                                 │
      PROPS DRILLING                     CONTEXT API
            │                                 │
            ▼                                 ▼
   Data is passed through            Data is provided
   every intermediate component      from a central Context
            │                                 │
            ▼                                 ▼
Parent ──► Child ──► GrandChild     Context.Provider
            │                                 │
            ▼                                 ▼
Even components that don't         Any component can access
need the data must receive it      the data using useContext()
            │                                 │
            ▼                                 ▼
Example Chain:                    Example Flow:

App                               App
 │                                 │
 └──► Navbar                       └──► ThemeContext.Provider
        │                                      │
        └──► Profile                           ├──► Navbar
                │                              ├──► Profile
                └──► UserCard                 └──► UserCard
                       │                              │
                       ▼                              ▼
                  Uses Data                     Uses Data Directly

─────────────────────────────────────────────────────────────────

PROPS DRILLING CHAIN

App
 │ (user)
 ▼
Navbar
 │ (passes user)
 ▼
Profile
 │ (passes user)
 ▼
UserCard
 │
 ▼
Uses user

─────────────────────────────────────────────────────────────────

CONTEXT API FLOW

ThemeContext.Provider
          │
          ├──────────────► Navbar
          │
          ├──────────────► Profile
          │
          └──────────────► UserCard

Any component can access the data directly:
const data = useContext(ThemeContext);

interview Q how to send data backwards
lifting state up