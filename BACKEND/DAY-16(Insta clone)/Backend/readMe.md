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


## day - 17 post creation
till now me have created only one model and operated with it now we have to create another model and work with it together which is of post 

now starting with last day what we did we created two apis register and login and in register 
we stored password like a hash using crypto but its not that good so we will user 
bcrypt 
- Auntentication register login (done)
 logout-(in logout we will study token black listing) we will do this later
-  {OTP BASED REGESTRATION (challange)}

==> post 
- user create 
- can see feed 
- like post (2 topic collection type of DB)
- save post 

==> user 
-  following follower 

for now we will do postcreation 
so out post model will look like 
caption,imgsrc,user-ID,like comment will not come under this (reason in next class) , createdat 

- let create a model of it 
- after model post route is created
- for the following route we will create a controller for postcreation route   
- now after this we know that backend dont understand req.body - data for that we user a middleware not for normaly if we sent something in json form it is in raw form but in postcreation we will send some files from frontend/ postman to server  console.log(req.body); // first post file will come to server and then to imagekit(what is the role of img kit)
 // now when u sent through postman express cant read req.body by default
 // we need another middleware like express.json for this we user a package name npm i multer
now 
// now start reading documentation 
multer use two storege disk storage and ram storege(for temp) now we will use memory storae bcz we dont store file in server (excali draw)
 and for now we requir multer in post,route 
 let assume user post a img and we store it in server 
 and the user have 2000 follwoer now the server has to server the post to 2000 user
 now data use means bandwidth use
or server will take 200mb to transfer or serve
we have to pay simply 
more bandwidth
more pay in server bandwidth
 as compare to cloud storage provider
now cloud storage provider helps in providing storage in less price
compare to server storage 

so steps 
- using multer take file from frontend/postman to server 
-  now server store the file in temp memory(not in disk) untill is  sends the file to cloud storage and server remove it from memory 
now we user a middleware mulet and using postman we sent caption and img and test it using console.log(req.file,req.body)
 today we have to read two doc one of imgkit.io and multer

 for now we need installation and file uploading 
 ## day-18 post creation
 now last time we have set our post creation route with multer that it will accept a file name img 
 and i controller we write the logic that to accept the buffer because out buffer contain the original data 

 now how will th eserver know which user has created the post so for that we will user toker how when ever user login user gets a token and whaen ever user send a req it send the token also 
 so server verifies toke and then upload data to cloud provider 
  ## DAY - 19 
  now today we will crete a api with method get that will give a postof the user  user who has requested 
  how to recognize (uning token)  
  # DAY -20 
  task - to notes reading git hub codot2.0 ankur.io noter edge collection , indexing in mongoDB 

  now if u observe we have made three controllers and and if u observe 

  all the controllers have same flow
  check token--->identify user--> provide data 
  now user identify is the common work we r doing for that
  now to reduce this repetative task  we will user middleware
  creathe a folder src - > middlewares -> auth.middleware.js
  

  follower/following feature
  - approach 1.
  normal in user.model create document of 
      following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    
    }],
     followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    
    }],
      // this is the normal or the most basic way 
    // let suppose u have 242 million followres
    //  and 1 userid = 12bytes
    //  so 242 million userid = 3.3gb 
    //  now max document size in mongoDB is 16MB
    // one object is knows as document 
    /**
     * SQL	    MongoDB
    Database	Database
    Table	   Collection
    Row	       Document
    Column	   Field
     */
    // now insted of the we will use the concept of edge collection
    # day -21
    // which says relation btw document (excalidraw)
    today we will develop feature where one user can follow/unfollow different user
    first we will create a route user.routes.js 
    second controller for it user.controller
    now in controller 
    - take out followe username
    - take out token or users username
    -  create a follow record 
    passing followe and follower 
    and send json res 
    now we need to add validation bcz client is dumb
    he has the superpower to break your application
    - like check following himself 
    - check is followee exist or not 
    - check for double follow 
    FollowSchema.index(
  { follower: 1, followee: 1 },
  { unique: true }
);
     now validation r acctually of four layers 
     first layer  - frontend - an many layer want to 
     backend mainly has three layer 
     express valodator - first later of backend 
     second - controller and secvices 
     third in - schema level 
now same way we have implemented unfollew feature 


// now likes feature
same approch 
first a array of users who liked 
but what if it 200M likes 
1 objID size of a document 12bytes
document issue

so we will create a edge collection of like
- now we will create like model 
- in post route we will cretae a api 

## task
in follow model add aproperty name status:{
  type;string 
  dafaulta:"pending,
  enums:{
    values:["pending","accepted","rejhected"],
    message:"status can only be pending accepted or rejected"
  }
}
Step 1: Update your Follow Schema

Your schema has a few syntax mistakes. It should be:

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "Status can only be pending, accepted, or rejected."
        }
    }
}, {
    timestamps: true
});
Step 2: POST /follow/:username

When someone sends a follow request:

POST /follow/shub

Instead of

A ---------> B

being immediately accepted,

store

Follower : A
Followee : B
Status   : pending
Logic
Find followee using username

↓

Check followee exists

↓

Prevent following yourself

↓

Check if request already exists

↓

Create Follow document

↓

status = pending
await followModel.create({
    follower: follower._id,
    followee: followee._id
    // status automatically becomes "pending"
});
                         FOLLOW REQUEST SYSTEM

┌─────────────────────────────────────────────────────────────────────┐
│                          USER A (Follower)                          │
└─────────────────────────────────────────────────────────────────────┘
                     │
                     │
                     │ POST /follow/:username
                     ▼
          Find followee by username
                     │
                     ▼
          Does followee exist?
             │              │
            No             Yes
             │              │
             ▼              ▼
        404 User      Is user following
       not found      themselves?
                           │
                    ┌──────┴──────┐
                   Yes            No
                    │              │
                    ▼              ▼
              409 Can't      Check if follow
             follow yourself request already exists
                                  │
                           ┌──────┴──────┐
                          Yes            No
                           │              │
                           ▼              ▼
                409 Already exists   Create Follow Record
                                         │
                                         ▼
                        follower  = User A
                        followee  = User B
                        status    = pending
                                         │
                                         ▼
                          201 Follow request sent


======================================================================


                     FOLLOW COLLECTION (MongoDB)

┌───────────────────────────────────────────────────────────────┐
│ follower : Rahul (_id)                                        │
│ followee : Shub (_id)                                         │
│ status   : pending                                             │
│ createdAt                                                   │
└───────────────────────────────────────────────────────────────┘


======================================================================


┌─────────────────────────────────────────────────────────────────────┐
│                         USER B (Followee)                          │
└─────────────────────────────────────────────────────────────────────┘
                     │
                     │
                     │ GET /follow/requests
                     ▼
      Find all documents where

      followee = Logged-in User
      status   = pending
                     │
                     ▼
          Populate follower details
        (Username, ProfileImage)
                     │
             ┌───────┴────────┐
            None             Found
             │                │
             ▼                ▼
      "No pending"      Return request list


======================================================================


                USER B CHOOSES ONE REQUEST

                     │
          PATCH /follow/accept/:requestId
                     │
                     ▼
          Find request by requestId
                     │
             ┌───────┴────────┐
            Not Found       Found
               │              │
               ▼              ▼
             404        Is logged-in user
                        the followee?
                           │
                    ┌──────┴──────┐
                   No             Yes
                    │              │
                    ▼              ▼
             403 Forbidden   Is status pending?
                                   │
                           ┌───────┴────────┐
                          No               Yes
                           │                │
                           ▼                ▼
                  Already accepted     status = accepted
                   or rejected               │
                                             ▼
                                      Save document
                                             │
                                             ▼
                                     200 Request accepted


======================================================================


             USER B CHOOSES REJECT INSTEAD

                     │
      PATCH /follow/reject/:requestId
                     │
                     ▼
      Same validations as Accept
                     │
                     ▼
            status = rejected
                     │
                     ▼
               Save document
                     │
                     ▼
            200 Request rejected


======================================================================


                  FINAL STATES

Pending
────────
Rahul ─────► Shub
Status = pending


Accepted
─────────
Rahul ─────► Shub
Status = accepted


Rejected
─────────
Rahul ─────► Shub
Status = rejected

POST   /follow/:username
│
└── Send follow request


GET    /follow/requests
│
└── View all pending requests for the logged-in user


PATCH  /follow/accept/:requestId
│
└── Accept a follow request


PATCH  /follow/reject/:requestId
│
└── Reject a follow request
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



not today we will implement frontend
and setup react router DOM
bcz i want to show loginform in /login
and register in =>/register
install react router DOM
npm i sass
form using apin in frontent of backend
npm axios
now when we r sending a post request through /register the the register the user a set a token but in frontend the token is not set bcz axion dont set cookies so we pass a extra obj in axion {withcredentials:true}
and is cors({
    credentials:true,
    origin:"http//lc5173"
})
day-22 
now today we will understand folder structure
which is in four layer 
=> ui show ui and navigate
=> hook 
manage state and api layer 
=> state state manage krrna
loading
user login or 
posts 
err

=> api backend se communicate krna
src 
feature
UI
auth pages components

API layer
services
auth.api.js now api layer will aony be used for communication with backend not for if there is a any err that to show user that is work of UI

ok so 
here we make services folder 
and inside it a auth.api.js 

now we will create another api 
GET getme privet
and getme function in auth.api.js
now me have created UI and api layer 
now we will create state and hooks 
then we will combin and use all layers together 
for now in user authentication we will use context 
later we will use redux 
now for state layer we create a file
auth.context.js
and then we have writehfunction form managint states of user register and login using context
with this we have completer state layer now 

hooks layer 
now we create a custow hooks to manage state layer makes it easy auth ---> hooks --> useAuth.js
now what ever state auth we have made to manage all those we need to import allthose here

now our four layers are complete

UI layer communicate to hooks dont care what is happening in state layer or other layer

# Frontend Architecture – 4-Layer Model (React)

This note describes a simple, scalable way to structure a React frontend into **4 strict layers**:

```
UI (Presentation)
  ↓
Hooks (Orchestration)
  ↓
State (Memory)
  ↓
API (Backend Communication)
```

Each layer has a **single responsibility**. When layers leak into each other, technical debt starts.

---

## Quick Overview (Read This First)

### What each layer is for (with example + real-life use case)

| Layer | What it does (brief) | Tiny example | Real-life use case |
|---|---|---|---|
| **UI** | Renders screens/components and collects user input. Calls hooks, shows loading/error. | `onSubmit={() => login(email, pass)}` | Login form page, profile screen, post list UI |
| **Hooks** | Coordinates flows: call API, update state, decide what UI needs (loading/error). | `await loginApi(); setUser(user)` | Login flow, create-post flow, follow/unfollow flow |
| **State** | Stores app/feature data + derived values. No HTTP, no navigation. | `isAuthenticated = !!user` | Keep logged-in user in memory, cache feed list |
| **API** | Talks to backend via HTTP. Normalizes responses/errors. No React. | `axios.post('/auth/login', body)` | Central place to change endpoints/headers/token handling |

### Folder convention (example)

```
features/
  auth/
    pages/            # UI
    components/       # UI
    hooks/            # Orchestration
    store/ or *.context.tsx   # State
    services/         # API
```

---

## 1) UI Layer (Presentation Layer)

**Location**

```
features/*/pages/
features/*/components/
```

**Responsibility**

- Render UI
- Handle form input
- Trigger actions (`onClick`, `onSubmit`)
- Display loading and error states
- Navigate between routes

**UI must NOT**

- Call API directly
- Access cookies/localStorage
- Parse tokens
- Manage global state directly
- Contain business rules
- Know backend response structure

UI should be **dumb and declarative**.

**Example**

```jsx
const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = async () => {
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      ...
    </form>
  );
};
```

**Real-life use case**

- A login page that only collects email/password, calls `useAuth().login`, and shows “Logging in…” / error text.

**Why keep UI dumb?**

- Refactoring becomes safer
- Testing becomes easier
- Less duplication
- Business rules don’t leak into every component

---

## 2) Hooks Layer (Orchestration Layer)

**Location**

```
features/*/hooks/
```

Example:

```
useAuth.js
usePosts.js
```

### What does "orchestration" actually mean?

Think of the hook as a **manager at a restaurant**.

- The UI is the **waiter** (takes order from customer, shows the food).
- The API layer is the **kitchen** (makes the food).
- The State layer is the **order board** (tracks what's ready, what's cooking).
- The Hook is the **manager** — when the waiter says "new order", the manager tells the kitchen to cook, updates the order board, and tells the waiter when it's done.

The manager doesn't cook. The manager doesn't serve. The manager **coordinates**.

### Responsibility

- Receive intent from UI ("user wants to log in")
- Call the right API function
- Take the API response and update State
- Handle loading/error transitions
- Return a **simple interface** to UI (`{ handleLogin, loading, error }`)

### What the hook actually does step-by-step (login example)

```
1. UI calls handleLogin(username, password)
2. Hook sets loading = true, error = null        ← updates State
3. Hook calls loginApi(username, password)        ← calls API
4. API returns response
5. Hook sets user = response.user                 ← updates State
6. Hook sets loading = false                      ← updates State
7. UI automatically re-renders (because State changed)
```

### Full Example (from our codebase)

```js
import { useCallback, useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register } from "../services/auth.api.js";

export function useAuth() {
    const { setUser, setLoading, setError, ...state } = useContext(AuthContext);

    const handleLogin = useCallback(async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await login(username, password);
            setUser(response.user);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [setError, setLoading, setUser]);

    return { ...state, handleLogin };
}
```

Notice: the hook **does not store data itself**. It reads setters from State, calls API, and passes results into State.

### What UI sees vs what hook hides

| UI sees (simple) | Hook hides internally |
|---|---|
| `handleLogin(user, pass)` | Which API endpoint to call |
| `loading` (true/false) | When to flip loading on/off |
| `error` (object or null) | How to catch/normalize errors |
| `user` (object or null) | Where user data comes from |

UI doesn't know about `axios`, `loginApi`, `setUser`, or `setLoading`. It just calls one function and reads the result.

### Hooks must NOT

- Render UI or return JSX
- Directly manipulate DOM
- Contain infrastructure logic (like axios instance setup)
- Store data themselves — they write into **State**, not into local variables that persist

### Real-life use case

- `usePosts()` exposes `{ posts, isLoading, error, createPost, refresh }` — internally it calls `fetchPostsApi()`, updates `PostsContext`, and manages loading transitions. UI just renders `posts.map(...)` and shows a spinner when `isLoading` is true.

### Why this layer is critical

Without hooks as a middle layer:

```
UI → API directly  (Login.jsx imports axios and calls /auth/login)
```

This means:
- Every page duplicates loading/error handling
- Every page knows the backend URL structure
- Changing one API endpoint means editing 5 different components

With hooks:

```
UI → Hook → API    (Login.jsx calls handleLogin(), hook handles the rest)
```

- Logic lives in one place
- UI stays simple
- Changing the API only affects the hook

---

## 3) State Layer (Global or Feature State)

**Location**

```
features/*/*.context.jsx
```

OR

```
features/*/store/
```

### What is the State layer?

Think of it as a **shared whiteboard** mounted on the wall.

- Anyone (any component) can **look at** the whiteboard to see current data.
- Only authorized people (hooks) are allowed to **write on** it.
- The whiteboard itself doesn't decide what to write — it just holds the data and shouts "Hey, I changed!" so everyone looking at it can update.

State is **passive**. It stores values. It doesn't fetch, navigate, or decide.

### Responsibility

- Hold shared data (`user`, `posts`, etc.)
- Provide derived/computed values (`isAuthenticated = !!user`)
- Expose setter functions (`setUser`, `setLoading`, `setError`)
- Trigger re-renders when data changes

That's it. **Nothing else.**

### Full Example (from our codebase)

```jsx
import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const value = useMemo(
        () => ({
            user,
            isAuthenticated: !!user,   // ← derived value
            loading,
            error,
            setUser,                    // ← setter for hooks to call
            setLoading,
            setError,
        }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
```

Notice what's **not** here: no `axios`, no `async/await`, no `try/catch`, no API imports. Pure storage.

### "But why does `loading` live in State if the Hook controls it?"

This is the most common confusion. Here's why:

- `loading` needs to be **shared** — multiple components (Login page, a navbar spinner, a disabled button) might need to know if auth is in progress.
- The **Hook decides when** to set loading true/false (that's orchestration).
- The **State holds the value** so any component anywhere in the tree can read it.

Analogy: The manager (hook) writes "COOKING" on the whiteboard (state). Both the waiter and the cashier can see it — they don't need to ask the manager directly.

### State vs Hooks — side-by-side

| | State Layer | Hooks Layer |
|---|---|---|
| **Purpose** | Hold data + expose setters | Coordinate actions + call setters |
| **Contains** | `useState`, `useMemo`, derived values | `async` functions, API calls, `try/catch` |
| **Knows about** | Nothing outside itself | State (to write) + API (to fetch) |
| **Analogy** | Whiteboard / Database | Manager / Controller |
| **Async logic?** | No | Yes |
| **Imports API?** | Never | Yes |
| **Example** | `const [user, setUser] = useState(null)` | `const res = await loginApi(); setUser(res.user)` |

### State layer must NOT

- Call API directly (no `axios`, no `fetch`)
- Navigate routes
- Render UI (it provides a `<Provider>`, but that just wraps children)
- Show alerts/toasts
- Handle cookies/localStorage directly
- Contain `async` functions or `try/catch` blocks

### Real-life use case

- `AuthContext` stores `{ user, loading, error }` and derived `isAuthenticated`, so:
  - The **Login page** can show a spinner when `loading` is true
  - The **Navbar** can show the username from `user`
  - A **ProtectedRoute** component can redirect when `isAuthenticated` is false
  - All of them read from the same shared state, without knowing how the data got there

### Why separate state from hooks?

**Hooks orchestrate. State stores.**

If you put API calls inside the context (state layer), you get:
- State that "does things" — hard to predict, hard to test
- Multiple async flows competing inside one provider
- No clear place to add a second consumer (e.g., a `useAuthStatus` hook that only reads, never writes)

If you keep state passive:
- You can write **multiple hooks** that read/write the same state differently
- State is predictable — you can look at the context and instantly know the shape of your data
- Testing is trivial — just check that the right values are in state

---

## 4) API Layer (Backend Communication Layer)

**Location**

```
features/*/services/
```

Example:

```
auth.api.ts
posts.api.ts
```

**Responsibility**

- Communicate with backend
- Send HTTP requests
- Normalize responses
- Normalize errors

This layer isolates the app from backend changes.

**Example**

```ts
export const loginApi = async (email, password) => {
  const response = await axios.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
```
---

**API layer must NOT**

- Update React state
- Navigate
- Show UI errors
- Access React hooks
- Render anything

API layer should be **pure infrastructure**.

**Why this layer matters**

If UI talks directly to axios:

- Every component knows backend structure
- Backend changes break many files
- Error handling becomes duplicated

With an API layer:

- Only one file changes if the backend changes

---

## Full Request Flow Example

Login Flow:

```
User clicks Login button
    ↓
UI Layer calls login() from useAuth
    ↓
Hook Layer calls loginApi()
    ↓
API Layer sends request to backend
    ↓
Response returned to Hook
    ↓
Hook updates State Layer
    ↓
UI re-renders automatically
```

Each layer performs exactly one responsibility.

---

## Strict Layer Rules

### UI can talk to:

* Hooks

### Hooks can talk to:

* State
* API

### State can talk to:

* Nothing (pure storage)

### API can talk to:

* Backend only

No skipping layers.

---

## Common Architecture Mistakes

- UI calling API directly
- API updating React state
- State handling navigation
- Hooks manipulating cookies directly
- Business rules inside components

Every violation increases coupling.

---

## Conclusion

Your 4-layer frontend architecture consists of:

1. **UI Layer** – renders and interacts
2. **Hooks Layer** – orchestrates logic
3. **State Layer** – stores data
4. **API Layer** – communicates with backend

When each layer respects its boundary,
your React app remains scalable and maintainable.


day ?

rev frontend 
- front has mainly four stages 
UI
state 
hooks 
api 
first we will create ui  and its navigation 
for that we need browser router
and a app.routes.jsx 
then link ka user krrle navigate krrna
after this will create api layer to communicate with backend 
=> serVices -- auth.api.js
we user axion
we have created diferent function to call different api of backend
and thats all with the backend 
now we will create the state layer 

now we will create the state layer -- we create a auth.content.jsx for now we have created a contect and understand a itis a storage


now hook is to manage when to call api and the res the we got how to store it in state layer
now for this we will create a hooks folder 

DAY-110
till now we have implemented only auth in our project 
with proper 4 layer of architecture
we have created register ui intg- ---> register.jsx
now after register we will navigate to "/" where we have a simple ui right now now in / page we want to show feed compenent like all posts 
post ----> pages ----> feed.jsx

now we will create a API  api/post/feed  privet only verified user can use
get all the post creted i db
concept of. populate(what is it user for  )
like postmodel.find().populate("user") this will 
get u the data of user also 
now u see this in populate u r getting users password also 
like postmodel.find().populate("user").select("-user.password")
or direacly in model select:false so it will not read only  ---> but this will create problem in login how bcz if we bydefault dont allow to read in schema level then we cant compair password in login
now we will force select in controller where we are finding username or email just 
   const user = await userModel.findOne({
        $or:[
            {
              Username:Username
            },
            {
                Email:Email
            }
        ]
    }).select("+Password")  force to read 

    for now we r done with backend  and 
    now lets do frontend 
  we have creted 4 layer  if feed also 
service----->contect----->hook-->
    now we will create like section

now we will implaement like featuer 
and  
fro that con to getallpost controller and
  const feed = await promiss.all postModel.find().populate("user").lean().map(async(post)=>{
    const isliked = await likemodel.findone({user:user.username,
    post:post._id})
    post.isliked =   !!/boolean isliked 
    return post
    })
    by dafaule we read a mongoose obj taht we can edit 

    normaly type is mongoose obj wher we cant edit so we use lean 


  DAY_111
    in frontend user can create a post