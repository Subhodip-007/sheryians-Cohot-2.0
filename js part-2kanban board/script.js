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
// now store deaged elem create a val 
let formaddbtn=document.querySelector('.formaddBtn');
let inputForm=document.querySelector('.inputForm');
let inputTitle=document.querySelector(".inputTitle");
let inputdescp=document.querySelector(".inputdescp");
let addtaskPage=document.querySelector('.addTaskModule');
let addtaskBtn=document.querySelector('.addTaskBtn');
let TodoSection=document.querySelector('.tododrop');
let InprogSection=document.querySelector('.inprogdrop');
let completedSection=document.querySelector(' .completedrop');
let taskCard=document.querySelectorAll('.task')
let draggedItem=null
taskCard.forEach(task => {
    task.addEventListener('dragstart',()=>{
        draggedItem=task
        
        
        
    })
});
function Ondragfeature(section) {

    section.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    section.addEventListener("dragenter", (e) => {
        e.preventDefault();

        section.classList.add(
            "border-2",
            "border-dashed",
            "border-white",
            "scale-105",
            "transition-all",
            "duration-200"
        );
    });

    section.addEventListener("dragleave", () => {
        section.classList.remove(
            "border-2",
            "border-dashed",
            "border-white",
            "scale-105",
            "transition-all",
            "duration-200"
        );
    });

    section.addEventListener("drop", (e) => {
        e.preventDefault();

        section.appendChild(draggedItem);

        section.classList.remove(
            "border-2",
            "border-dashed",
            "border-white",
            "scale-105",
            "transition-all",
            "duration-200"
        );
    });

}
addtaskBtn.addEventListener('click',()=>{
    addtaskPage.style.display="block";
})
inputForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(inputTitle.value);
    const task = document.createElement("div");

task.className =
    "task bg-blue-400 rounded-2xl p-4 flex justify-between gap-4 cursor-grab shrink-0";

task.draggable = true;

task.innerHTML = `
    <div>
        <h2 class="font-bold text-xl">${inputTitle.value}</h2>

        <p class="mt-2">
            ${inputdescp.value}
        </p>
    </div>

    <div class="flex items-end">
        <button class="bg-red-500 px-4 py-2 rounded-xl text-white">
            Delete
        </button>
    </div>
`;

// Append to a section
TodoSection.appendChild(task);
addtaskPage.style.display="none";
        task.addEventListener('dragstart',()=>{
        draggedItem=task
        
        
        
    })

})
Ondragfeature(TodoSection);
Ondragfeature(InprogSection);
Ondragfeature(completedSection);




