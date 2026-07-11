Today we have studied a bit more on folder structure based of database
so like we use to create app.js from apis 

server.js - config , DB connect , server start 

- for DB we create a folder config in src folder 
inside config we create a DB.js file 
instrall package mongoose create a function to conncect mongoose DB - using connection string 
then call the function in server.js

- Now to store data in DB it has a format of data to store that is also knows a schema like {property name: datatype, }  
now it ofcouse u wont store only a single data

- there are multiple data of same type so it is mainly stored in a collection this is called model 
 mongoose.model("NotesData", userSchema);
 when u go to Compass and to your dedicated db u see collection is formed 

- now model plays a importent role in all operations in DB  like CRUD 
- so we need model in app.js for creating different operation of apis
 like create , find 
