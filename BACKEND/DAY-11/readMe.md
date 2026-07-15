now we will see the same topic 
so we have two diff folder 
FRONTEND 
BACKEND
to deploy we use a command in react folder npm run build that gives a dist folder inside(html , css , js that runs and provides same output as react file) we move this dist folder to public folder of BACKEND and deploy BACKEND + DIST in render 
normally we had four end points that are post get patch delete 
 now leave all this a think of when u had only html,css,js u deploy only html using live server and then it requests for two file if u seein (network tab browser) css and js file..
 NOW HOW TO ACHIVE SAME THING IN BACKEND 

 we use a middleware the app.use(express.statix('./public')) -- now what it will do is everything inside public path and be accessed by user in browser now backend can access the public folder

 eg : DOWNLOAD a img inside public and access it througe backend by http://localhost:3000/temp.jpg
 now your backend application can access react files througe dist
now we talked about wildcard 

Update Feature (PATCH API)

follow the steps below to implement the Update Note feature in your project

Frontend Changes

Add Update Button in your code

<button onClick={() => handleUpdateNote(note._id)}>
  Update
</button>


Create Update Function

function handleUpdateNote(noteId) {
  const newDescription = prompt("Enter new description");

  axios.patch(
    "https://cohort-2-0-m32u.onrender.com/api/notes/" + noteId,
    { description: newDescription }
  )
  .then((res) => {
    console.log(res.data);
    fetchNotes();
  });
}

 Backend Changes

PATCH API to Update Note Description

/**
 
PATCH /api/notes/:id
req.body = { description }*/

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "Note updated successfully.",
  });
});