# NOW TODAY WE WILL LEARN AUTHENTICATION AND AND ITS IMPLEMENTATION 
with last class revision. and now we will see IMPLEMENTAIION code writing


and we will see some new packages 
- jsonweb token 
- bcrypt.js 
- cookieparcel

now here we make a new server and connect to DB 
and make data model 
and now follow the concept of authentication 
we introduce two new file 
- routes = now let suppose we create some apis like register til now we where creating in app.js but if we create all api in app.js it will be messy now for regestration we create auth.routes.js in routes foldernow we have created api in auth.routes,js and exported it to app and use it withe app.use ("pathe",routsexported);
now u just did authentication and stored data in DB
now add token in data using package npm i jsonwebtoken

// now this tocken have all data, to check gon\ to website jwtdecode
// while registering user has send regester info + token is creathe and signed and send back to user
// now token have its user data  decode -> get data IAT is when was token creted in webpage jwtdebuger.io 
// now after this of every request of a user will have it token and now for that we use storages in browser 
// browse have many type of storage session local storetge extension storage , indexedDB ,cookies , cache storage , storage bucket 
// now mainly we will study now cookie storage (client side) special storage now gives direct access to server

now when ever token is created we will set it is cooki npm i cookie-parser
requir in app.js and app.use cookie parcer


- controller = 


PATCH IMPLEMENTATION 
