# html
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HTTP Methods Demo</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Task Manager</h1>
  <p class="hint">GET · POST · PUT · PATCH · DELETE with <code>fetch</code></p>

  <!-- POST: add a task -->
  <form id="addForm">
    <input id="titleInput" placeholder="New task…" required />
    <button class="post">Add (POST)</button>
  </form>

  <!-- Shows the last request that was made -->
  <p id="info">Loading…</p>

  <!-- GET: tasks are shown here -->
  <ul id="list"></ul>

  <p class="hint">
    Note: this is a fake API, so nothing is really saved. A newly added task gets id 201,
    which the fake server doesn't know, so editing or deleting it shows an error. That's expected.
  </p>

  <script src="app.js"></script>
</body>
</html>


## css 
body {
  font-family: Arial, sans-serif;
  max-width: 560px;
  margin: 30px auto;
  padding: 0 16px;
  background: #f4f6fb;
  color: #222;
}

h1 { margin-bottom: 0; }
.hint { color: #777; font-size: 14px; }

form { display: flex; gap: 8px; margin: 16px 0; }
input { flex: 1; padding: 8px; font-size: 15px; }

button {
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: white;
  font-size: 14px;
}

/* One colour per HTTP method */
.post   { background: #22a06b; }
.put    { background: #e0a100; }
.patch  { background: #7c5cff; }
.delete { background: #e5484d; }

#info {
  background: #e8eefc;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
}

ul { list-style: none; padding: 0; }

li {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
}

li span { flex: 1; }
li.done span { text-decoration: line-through; color: #999; }

## js 
// const API = "https://jsonplaceholder.typicode.com/todos";

// const list = document.getElementById("list");
// const info = document.getElementById("info");
// const addForm = document.getElementById("addForm");
// const titleInput = document.getElementById("titleInput");

// let todos = []; // our local copy of the data

// // Show which request was made and what status came back
// function showInfo(method, url, status) {
//   info.textContent = method + " " + url + "  →  " + status;
// }

// /* ---------- GET: read all tasks ---------- */
// async function getTodos() {
//   const res = await fetch(API + "?_limit=8");
//   todos = await res.json();
//   showInfo("GET", "/todos", res.status);
//   draw();
// }

// /* ---------- POST: create a new task ---------- */
// async function addTodo(title) {
//   const res = await fetch(API, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title: title, completed: false, userId: 1 }),
//   });
//   const newTodo = await res.json();
//   showInfo("POST", "/todos", res.status);
//   todos.unshift(newTodo); // add to the top of our list
// //   console.log(todos);
//   draw();
// }

// /* ---------- PUT: replace the whole task ---------- */
// async function editTodo(todo) {
//   const newTitle = prompt("New title:", todo.title);
//   if (!newTitle) return;

//   const res = await fetch(API + "/" + todo.id, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     // PUT sends the COMPLETE object
//     body: JSON.stringify({ ...todo, title: newTitle }),
//   });
//   showInfo("PUT", "/todos/" + todo.id, res.status);
//   if (res.ok) {
//     todo.title = newTitle;
//     draw();
//   }
// }

// /* ---------- PATCH: change only one field ---------- */
// async function toggleTodo(todo) {
//   const res = await fetch(API + "/" + todo.id, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     // PATCH sends ONLY what changed
//     body: JSON.stringify({ completed: !todo.completed}),
//   });
//   showInfo("PATCH", "/todos/" + todo.id, res.status);
//   if (res.ok) {
//     todo.completed = !todo.completed;
//     draw();
//   }
// }

// /* ---------- DELETE: remove a task ---------- */
// async function deleteTodo(todo) {
//   const res = await fetch(API + "/" + todo.id, { method: "DELETE" });
//   showInfo("DELETE", "/todos/" + todo.id, res.status);
//   if (res.ok) {
//     todos = todos.filter((t) => t.id !== todo.id);
//     draw();
//   }
// }

// /* ---------- Show the tasks on the page ---------- */
// function draw() {
//   list.innerHTML = "";

//   todos.forEach((todo) => {
//     const li = document.createElement("li");
//     if (todo.completed) li.className = "done";

//     li.innerHTML = `
//       <input type="checkbox" ${todo.completed ? "checked" : ""}>
//       <span>${todo.title}</span>
//       <button class="put">Edit (PUT)</button>
//       <button class="delete">Delete (DELETE)</button>
//     `;

//     li.querySelector("input").onchange = () => toggleTodo(todo);   // PATCH
//     li.querySelector(".put").onclick = () => editTodo(todo);       // PUT
//     li.querySelector(".delete").onclick = () => deleteTodo(todo);  // DELETE

//     list.appendChild(li);
//   });
// }

// // Form submit → POST
// addForm.onsubmit = (e) => {
//   e.preventDefault();
//   addTodo(titleInput.value);
//   titleInput.value = "";
// };

// // Start the app → GET
// getTodos();  








