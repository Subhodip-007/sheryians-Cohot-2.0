

// all variable 
const  API = "https://jsonplaceholder.typicode.com/todos";
let formOpenButton = document.querySelector("#openForm");
let formCloseButton = document.querySelector("#closeForm")
let formContainer =document.querySelector(".form-overlay")
let form = document.querySelector("form");
let inputTaskName = document.querySelector("#taskName");
let inputDescription = document.querySelector("#taskDescription");
let formSubmitButton = document.querySelector("#submitButton");

let TaskList = [];
// all functions 
function toggleFormButton(){
 formOpenButton.addEventListener("click",()=>{
   formContainer.classList.add("active");
 })
 formCloseButton.addEventListener("click",()=>{
    formContainer.classList.remove("active");
 })
 formSubmitButton.addEventListener("click",()=>{
    formContainer.classList.remove("active")
})
 
}
function submitHandler(){
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        let payload = {
            title:inputTaskName.value,
            description:inputDescription.value,
        }
        inputTaskName.value = ""
        inputDescription.value = ""
        createTodo(payload)
    })
}
let getTask = async ()=>{
    try{
        const res = await fetch(API + "?_limit=8");
        const data = await res.json();
        console.log(data);
        

    }catch(err){
        console.log(err);
        
    }
}
let createTodo = async (payload)=>{
    try{
        const {title , description} = payload;
        const res = await fetch(API,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
        })
        const newTodo = await res.json();
        TaskList.unshift(newTodo);
         console.log(TaskList);
         render(TaskList) 
    }catch(err){

    }
} 
let render = (dataList) => {
    let taskContainer = document.querySelector(".task-section"); // Change this to your container class
    taskContainer.innerHTML = ""; // Clear old cards

    dataList.forEach((data) => {
        taskContainer.innerHTML += `
            <div class="task-card">
                <div class="task-top">
                    <div class="task-icon">✦</div>
                    <div class="task-content">
                        <h2>${data.title}</h2>
                        <p>${data.description || ""}</p>
                    </div>
                    <div class="more">···</div>
                </div>
                <div class="task-bottom">
                    <p>Added 4 Nov 2026</p>
                    <label class="complete">
                        <input type="checkbox" ${data.completed ? "checked" : ""}>
                        Completed
                    </label>
                </div>
            </div>
        `;
    });
};
toggleFormButton()
submitHandler()
getTask();
//  here we have arr where we store api todos using get and postand instantly add in array using unshift 