now we have studied what is server 
creation on server 
running 
and deploy

now lets understand what is API
a set of rules a protpcols that helps 
different software program to communicate and exchange data with each other like insta app in your phone and insta backend server somewhere(two/ more aplication)
//  there r different API (REST)
in simple may REST PAI has Two main rules for communication;
- the protocol that will be used for communication  HTTP // HTTPS
- now the method of communication depends on your type of communication 

- GET if u r req sometiong from server its treated a resource(data) so if u request something from server to frontend GET is used
React
 │
 │ GET /tasks
 ▼
Express
 │
 │ Find all tasks
 ▼
MongoDB

[
 {title:"Learn JS"},
 {title:"Learn React"}
]

 ▲
 │
Express
 │
 ▼
React displays tasks
 
 - POST is used mainly when we want to create any resource on serverside like user account create,post,produce,comment
 React
 │
 │ POST /tasks
 │
 │
 │ {
 │   title:"Learn Backend"
 │ }
 ▼
Express
 │
 │ Create new task
 ▼
MongoDB

Before

[
 JS
 React
]

↓

After

[
 JS
 React
 Backend
]

 ▲
 │
Express
 │
 ▼
Success
- PUT is use when we want to update resource by replacing with new 
data complete update everything complete resource
Suppose database has

{
 id:1,
 title:"Learn JS",
 completed:false
}

Now user edits.

{
 title:"Learn React",
 completed:true
}

PUT flow

React
 │
 │ PUT /tasks/1
 ▼
Express
 │
 ▼
MongoDB

Old

{
 title:"Learn JS",
 completed:false
}

↓

Completely replaced

{
 title:"Learn React",
 completed:true
}
- PATCH  when we want to update a small part of resource 
Current data

{
 title:"Learn React",
 completed:false,
 priority:"High"
}

User only checks the checkbox.

Completed = true

Flow

React
 │
 │ PATCH /tasks/1
 │
 │ {
 │   completed:true
 │ }
 ▼
Express
 │
 ▼
MongoDB

Before

{
 title:"Learn React",
 completed:false,
 priority:"High"
}

↓

After

{
 title:"Learn React",
 completed:true,
 priority:"High"
}
- DELETE delete existing resource
React
 │
 │ DELETE /tasks/1
 ▼
Express
 │
 ▼
MongoDB

Before

[
 JS
 React
 Backend
]

↓

After

[
 React
 Backend
]

 ▲
 │
Success
lets create a mini task 
notes app see all notes update a note delete create
now here we r sending request from user to server 
so we need frontend for easy we use post-man ureate a new warkspace
click on + icon add start your server add localhost link
click ram json now send anything in json format  
now data is strored in request.body 
now by default our server cant read req.body data so we 
use app.use(express.json())
