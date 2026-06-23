// lets learn drag and drop functionality 
// in js
// for that mainly me use 
// first select the cont by id
// now add foreache on task on each task add a eventlistner-drag- oinsole and check
// now u can get drag dets on your task 
// now for testion a event on id processcont dreagenter(e)and console
// add cALSSLIST.ADD FOR HOVER
// now do it for all and also add event dregleave for better create a function

// noe inside function add a event drop that will give elem droped and where 
// but there is a proble note by default out browesr dont allow to drop any element to other cont
// now to prevent this we add a event dragover- preventdefault 
// now store deaged elem create a val as null 
// inevent dred set it as task 
let TodoCont = document.querySelector('#Todo');
let InProgressCont = document.querySelector('#Inprogress');
let CompletedCont = document.querySelector('#Completed');

let Task = document.querySelectorAll('.task');

let form = document.querySelector('form');
let taskinput = document.querySelector('input');
let textarea = document.querySelector('textarea');

let closebtn = document.querySelector('.ri-close-large-line');
let addtaskbtn = document.querySelector('.addtask');
let addtaskmodal = document.querySelector('.addTaskModem');

let scrollertask = document.querySelector('.taskscroller');
let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function rendarTask(taskData) {

    const task = document.createElement("div");

    task.className =
        "task flex bg-gray-700 flex-col p-4 rounded-2xl m-3 cursor-grab";

    // Make it draggable
    task.draggable = true;

    // Add HTML inside it
    task.innerHTML = `
        <h2>${taskData.title}</h2>
        <p>${taskData.description}</p>
        <button class="p-4 bg-gray-100 rounded-2xl self-end">
            delete
        </button>
    `;

    task.addEventListener("dragstart", () => {
        draggedtask = task;
    });

    scrollertask.appendChild(task);
}

function buttonmodal() {

    addtaskbtn.addEventListener('click', () => {
        addtaskmodal.style.display = 'block';
    });

    closebtn.addEventListener('click', () => {
        addtaskmodal.style.display = 'none';
    });

}

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const taskObj = {
        title: taskinput.value,
        description: textarea.value,
    };

    allTasks.push(taskObj);

    localStorage.setItem(
        "tasks",
        JSON.stringify(allTasks)
    );

    rendarTask(taskObj);

    taskinput.value = "";
    textarea.value = "";

    addtaskmodal.style.display = 'none';

});

buttonmodal();

let draggedtask = null;

Task.forEach(element => {

    element.addEventListener("drag", (e) => {
        draggedtask = element;
    });

});

function Drag(cont) {

    cont.addEventListener("dragenter", (e) => {

        e.preventDefault();

        cont.classList.add(
            "border-2",
            "border-dashed",
            "border-white",
            "scale-105",
            "transition-all",
            "duration-300"
        );

    });

    cont.addEventListener("dragleave", (e) => {

        e.preventDefault();

        cont.classList.remove(
            "border-2",
            "border-dashed",
            "border-white",
            "scale-105",
            "transition-all",
            "duration-300"
        );

    });

    cont.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    cont.addEventListener("drop", (e) => {

        e.preventDefault();

        if (draggedtask) {
            cont.appendChild(draggedtask);
        }

        cont.classList.remove(
            "border-2",
            "border-dashed",
            "border-white",
            "scale-105"
        );

    });
}

Drag(TodoCont);
Drag(InProgressCont);
Drag(CompletedCont);

allTasks.forEach(task => {
    rendarTask(task);
});