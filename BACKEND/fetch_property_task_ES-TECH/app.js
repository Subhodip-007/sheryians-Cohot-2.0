const API = "https://jsonplaceholder.typicode.com/todos";

let TaskList = [];
let logger = [];

// DOM ELEMENTS
const formOpenButton = document.querySelector("#openForm");
const formCloseButton = document.querySelector("#closeForm");
const formContainer = document.querySelector(".form-overlay");

const form = document.querySelector("form");
const inputTaskName = document.querySelector("#taskName");
const inputDescription = document.querySelector("#taskDescription");
const formSubmitButton = document.querySelector("#submitButton");
const loggerSection = document.querySelector(".logger-section");
const statusCont = document.querySelector(".status-cont");
const taskContainer = document.querySelector(".task-section");

let isEditing = false;
let editingId = null;

// set localStorege 
let setLocalStorage = (data)=>{
    localStorage.setItem("tasks", JSON.stringify(data));
}

// LOGGER
let showLog = (method, status, message, success)=> {
loggerSection.innerHTML += `
    <div class="log-entry ${success ? "success" : "error"}">
        <div class="log-header">
            <strong>${method}</strong>
            
            <span class="status">${status}</span>
        </div>

        <div class="log-body">
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Success:</strong> ${success}</p>
        </div>
    </div>
`;
    
}
// TOGGLE
let toggleFormButton = ()=> {

    formOpenButton.addEventListener("click", () => {
        formContainer.classList.add("active");
    });

        formCloseButton.addEventListener("click", () => {
        formContainer.classList.remove("active");
        form.reset();
        isEditing = false;
        editingId = null;
        formSubmitButton.textContent = "Add Task";
    });
}
// GET
async function getTask() {
    try{
        const res = await fetch(`${API}?_limit=10`);
        const data = await res.json();
        showLog("GET", res.status, "Fetched tasks", res.ok);
        TaskList = data;
        // localStorage.setItem("tasks", JSON.stringify(TaskList));
         setLocalStorage(TaskList)
        render(TaskList);
    }catch (err) {
        showLog("GET", 500, err.message, false);
        console.log(err);
    }
}
// POST
async function createTodo(payload) {
    try {
        const res = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        showLog("POST", res.status, `Created "${payload.title}"`, res.ok);
        // console.log(payload);
        const newTodo = {
            ...data,
            ...payload,
            id: Date.now()
        };
        TaskList.unshift(newTodo);
        // localStorage.setItem("tasks", JSON.stringify(TaskList));
        setLocalStorage(TaskList)
        render(TaskList);
        form.reset();
        formContainer.classList.remove("active");
    } catch (err) {
        showLog("POST", 500, err.message, false);
        console.log(err);
    }

}

// PUT /// FIX DONE BY GEMINI THAT WAS  SERVER ID AND STATUE LOG PROBLEM SERVER COUDENT FIND 
async function updateTodo(id, payload) {

    try {
        // Tasks with id > 200 were created locally with Date.now() and don't exist on JSONPlaceholder
        if (id > 200) {
            showLog("PUT", 200, `Updated "${payload.title}"`, true);
        } else {
            const res = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            showLog("PUT", res.status, `Updated "${payload.title}"`, res.ok);
        }

        TaskList = TaskList.map((task) => {

            if (task.id === id) {
                return {
                    ...task,
                    ...payload
                };
            }

            return task;
        });

        // localStorage.setItem("tasks", JSON.stringify(TaskList));
        setLocalStorage(TaskList)
        render(TaskList);

        form.reset();
        formContainer.classList.remove("active");

        isEditing = false;
        editingId = null;
        formSubmitButton.textContent = "Add Task";

    } catch (err) {
        showLog("PUT", 500, err.message, false);
        console.log(err);
    }

}
// DELETE
async function deleteTodo(id) {

    try {

        const res = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        showLog("DELETE", res.status, `Deleted task #${id}`, res.ok);

        TaskList = TaskList.filter((task) => task.id !== id);

        // localStorage.setItem("tasks", JSON.stringify(TaskList));
            setLocalStorage(TaskList)
        render(TaskList);

    } catch (err) {
        showLog("DELETE", 500, err.message, false);
        console.log(err);
    }

}
// HANDLESUBMIT
function submitHandler() {

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const payload = {
            title: inputTaskName.value.trim(),
            description: inputDescription.value.trim(),
            completed: false
        };

        if (!payload.title) return;

        if (isEditing) {
            updateTodo(editingId, payload);
        } else {
            createTodo(payload);
        }

    });

}
// EDIT TASK
function editTodo(id) {

    const task = TaskList.find((task) => task.id === id);

    if (!task) return;

    isEditing = true;
    editingId = id;

    inputTaskName.value = task.title;
    inputDescription.value = task.description || "";

    formSubmitButton.textContent = "Update Task";

    formContainer.classList.add("active");

}
// RENDER TASKS
function render(dataList) {

    taskContainer.innerHTML = "";

    dataList.forEach((data) => {

        taskContainer.innerHTML += `
            <div class="task-card">

                <div class="task-top">

                    <div class="task-icon">✦</div>

                    <div class="task-content">
                        <h2>${data.title}</h2>
                        <p>${data.description || ""}</p>
                    </div>

                    <div class="task-actions">

                        <button class="edit-btn" data-id="${data.id}">
                            Edit
                        </button>

                        <button class="delete-btn" data-id="${data.id}">
                            Delete
                        </button>

                    </div>

                </div>

                <div class="task-bottom">

                    <p>Added 20 Nov 2026</p>

                    <label class="complete">
                        <input
                            type="checkbox"
                            ${data.completed ? "checked" : ""}
                            data-id="${data.id}"
                        >
                        Completed
                    </label>

                </div>

            </div>
        `;

    });

}


// EVENTS
taskContainer.addEventListener("click", (e) => {

    if (e.target.classList.contains("edit-btn")) {

        const id = Number(e.target.dataset.id);

        editTodo(id);

    }

    if (e.target.classList.contains("delete-btn")) {

        const id = Number(e.target.dataset.id);

        if (confirm("Delete this task?")) {
            deleteTodo(id);
        }

    }

});

taskContainer.addEventListener("change", (e) => {

    if (e.target.type === "checkbox") {

        const id = Number(e.target.dataset.id);

        TaskList = TaskList.map((task) => {
            if (task.id === id) {
                return { ...task, completed: e.target.checked };
            }
            return task;
        });

        // localStorage.setItem("tasks", JSON.stringify(TaskList));
        setLocalStorage(TaskList)
        showLog("PATCH", 200, `Updated completion for task #${id}`, true);

    }

});
    toggleFormButton();
    submitHandler();
    // getTask()
    const localData = localStorage.getItem("tasks");
    if (localData && JSON.parse(localData).length > 0) {
        TaskList = JSON.parse(localData);
        render(TaskList);
        showLog("LOCAL", 200, "Loaded tasks from localStorage", true);
        console.log(TaskList);  
    } else {
        getTask();
        console.log(TaskList);
    }




