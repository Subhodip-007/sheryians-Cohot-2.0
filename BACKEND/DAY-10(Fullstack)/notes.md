so we deploy server in render and vercel render free cant give production level services max (10 user)

for better we need different plans to buy so forthat in frontend 
run command npm run built
u will see a dist folder this folder contain output of whatever code u have written in frontend(html css js) so what ever react can do dist files can also do 
now move those html css and js file in backend public folder

now in backend app.js
we will use a middleware
app.use("*name",(req,res)=>{
    res.send('this is wild card')
})// wild card route (now this will handle those api that we havent created) now to will need your absolute path D:\ALL FILE\sheriyan-cohot-2.0\BACKEND\DAY-10(Fullstack)\Backend\public\dist\index.html

to opt this we use const path = require('path')
y path till index.html 



  User opens website
                     │
                     ▼
          Request reaches Express
                     │
                     ▼
       Is it a static file request?
         (JS, CSS, image, font...)
               /            \
             Yes             No
              │               │
              ▼               ▼
express.static()      Send index.html
 serves the file             │
                              ▼
                    Browser loads React
                              │
                              ▼
                    React Router checks URL
                              │
                              ▼
                 Shows correct React page





React Source Code
(App.jsx, Components, CSS, etc.)
            │
            │ npm run build                                                                     
            ▼
      dist/
      ├── index.html
      ├── assets/
      │   ├── index-abc123.js
      │   ├── index-xyz456.css
      │   └── images...
      └── favicon.ico
            │
            ▼
Copy dist into backend/public
(or wherever Express serves static files)
            │
            ▼
Deploy Backend to Render
            │
            ▼
Users visit your Render URL
            │
            ▼
Express serves:
- index.html
- CSS
- JavaScript
- Images
- API routes