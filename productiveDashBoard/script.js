function openPageOfCards(){
    let allElem = document.querySelectorAll(".elem");
let allpage=document.querySelectorAll(".full-page-elem")
let allBackbutton=document.querySelectorAll(".back-btn")
allElem.forEach(elem => {
    elem.addEventListener("click",()=>{
    //    console.log(allpage[elem.id])
    allpage[elem.id].style.display="block"
    fetchQuote();
    
    })
});
allBackbutton.forEach((btn)=>btn.addEventListener("click",()=>{
    allpage[btn.id].style.display="none"
    location.reload();
} ))
}
openPageOfCards()
let taskcont=document.querySelector(".show-added-task")
let todoform=document.querySelector("form")
let todoTaskInput=document.querySelector("form input")
let tododetailInput=document.querySelector("form textarea")
let todosubmitBtn=document.querySelector("form .btn")

let fullPagePlanner=document.querySelector(".daily-planner-full-page")
let alltask = JSON.parse(localStorage.getItem("alltask")) || [];
function toDoListfeatuer(params) {
    function renderTask(){
let sum="";
alltask.forEach((elem,id)=>{
sum+=` <div class="task">
                <div class="task-text">
                    <h1>${elem.name}</h1>
                    <p>${elem.detail}
                    </p>
                </div>
                <button id=${id} class="complete">mark as completed</button>
            </div>`;
       
            
})
taskcont.innerHTML=sum;

}
renderTask()

todoform.addEventListener("submit",(e)=>{
 e.preventDefault();
       if (todoTaskInput.value.trim() === "" &&tododetailInput.value.trim() === "") {
        alert("empty task");
        return;
    }
console.log(todocompletedbtn);
 alltask.push({name:todoTaskInput.value,detail:tododetailInput.value})
 
  renderTask()
//   location.reload()
  localStorage.setItem("alltask", JSON.stringify(alltask));
 todoTaskInput.value=""
 tododetailInput.value=""

})

//testing
taskcont.addEventListener("click", (e) => {
    if (e.target.classList.contains("complete")) {
        const index = Number(e.target.dataset.index);

        alltask.splice(index, 1);
        localStorage.setItem("alltask", JSON.stringify(alltask));

        renderTask();
    }
});
 let todocompletedbtn=document.querySelectorAll(".task button")
// todocompletedbtn.forEach((btn)=>{
//  btn.addEventListener("click",function(){
//     console.log(btn.id)
//     alltask.splice(btn.id,1);
//     renderTask()
   
//  })
// })
}
toDoListfeatuer()
// daily planner
let addPlanBtn=document.querySelector('.add-plan-btn')
let addPlanFormPage=document.querySelector(".add-plans-form-page");
let planBackBtn=document.querySelector(".plan-back-btn");
planBackBtn.addEventListener("click",()=>{
    addPlanFormPage.style.display="none";
        fullPagePlanner.style.filter = "blur(0px)";
})
addPlanBtn.addEventListener("click",()=>{
    addPlanFormPage.style.display="block";
    fullPagePlanner.style.filter = "blur(10px)";
})
// 
let addPlanForm=document.querySelector(".add-plans-form-page form");
let planInputTime=document.querySelector(".add-plans-form-page form .time input")
let planInputName=document.querySelector(".add-plans-form-page form .name input")
let plansCont=document.querySelector(".planner-cont");

function plannerfeature(){
    const timestamp = localStorage.getItem("allplans_timestamp");

if (timestamp) {
    const twelveHours = 12 * 60 * 60 * 1000;

    if (Date.now() - Number(timestamp) > twelveHours) {
        localStorage.removeItem("allplans");
        localStorage.removeItem("allplans_timestamp");
    }
}

// Load plans
let plansObj = JSON.parse(localStorage.getItem("allplans")) || [];

// Render plans
function renderplans() {
    let clutter = "";

    plansObj.forEach((obj) => {
        clutter += `
            <div class="plan-cont">
                <h1>${obj.time}</h1>
                <p>${obj.name}</p>
            </div>
        `;
    });

    plansCont.innerHTML = clutter;
}

renderplans();

// Add new plan
addPlanForm.addEventListener("submit", (e) => {
    e.preventDefault();

    plansObj.push({
        time: planInputTime.value,
        name: planInputName.value
    });

    renderplans();

    localStorage.setItem("allplans", JSON.stringify(plansObj));
    localStorage.setItem("allplans_timestamp", Date.now());

    planInputName.value = "";
    planInputTime.value = "";
    addPlanFormPage.style.display="none";
    fullPagePlanner.style.filter = "blur(0px)";
});


}
plannerfeature()
// let plansObj = JSON.parse(localStorage.getItem("allplans")) || [];
// function renderplans(){
//     let clutter=``;
// plansObj.forEach((obj)=>{
//  clutter+=`            
//                 <div class="plan-cont">
//                     <h1>${obj.time}</h1>
//                     <p>${obj.name}</p>
//                 </div>


//             `
// })
// plansCont.innerHTML=clutter;
// }
// renderplans()

// addPlanForm.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     console.log(planInputName.value)
//     console.log(planInputTime.value);
//     plansObj.push({time:planInputTime.value,name:planInputName.value})
//         renderplans()
//     console.log(plansObj)
//       localStorage.setItem("allplans", JSON.stringify(plansObj));
//  todoTaskInput.value=""
//  tododetailInput.value=""

// })
// Clear plans if older than 12 hours




// motivation 
fetch("./data.json")
  .then(res => res.json())
  .then(data => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const item = data[randomIndex];

    document.getElementById("bgVideo").src = item.video;
      });
      let quotetext=document.querySelector(".quote-text")
async function fetchQuote() {
    try {
        let response = await fetch("https://corsproxy.io/?https://type.fit/api/quotes");
        let data = await response.json();
        quotetext.innerHTML=data[Math.floor(Math.random() * data.length)].text;

    } catch (err) {
        console.log(err);
    }
}

