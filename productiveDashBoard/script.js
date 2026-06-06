function openPageOfCards(){
    let allElem = document.querySelectorAll(".elem");
let allpage=document.querySelectorAll(".full-page-elem")
let allBackbutton=document.querySelectorAll(".back-btn")
allElem.forEach(elem => {
    elem.addEventListener("click",()=>{
    //    console.log(allpage[elem.id])
    allpage[elem.id].style.display="block"
    })
});
allBackbutton.forEach((btn)=>btn.addEventListener("click",()=>allpage[btn.id].style.display="none"))
}
openPageOfCards()
let taskcont=document.querySelector(".show-added-task")
let todoform=document.querySelector("form")
let todoTaskInput=document.querySelector("form input")
let tododetailInput=document.querySelector("form textarea")
let todosubmitBtn=document.querySelector("form .btn")
let todocompletedbtn=document.querySelector(".complete")
let alltask = JSON.parse(localStorage.getItem("alltask")) || [];
function renderTask(){
let sum="";
alltask.forEach((elem)=>{
sum+=` <div class="task">
                <div class="task-text">
                    <h1>${elem.name}</h1>
                    <p>${elem.detail}
                    </p>
                </div>
                <button class="complete">mark as completed</button>
            </div>`;
       
            
})
taskcont.innerHTML=sum;

}
renderTask()

todoform.addEventListener("submit",(e)=>{
 e.preventDefault();

 alltask.push({name:todoTaskInput.value,detail:tododetailInput.value})
 console.log(alltask);
  renderTask()
  localStorage.setItem("alltask", JSON.stringify(alltask));
 todoTaskInput.value=""
 tododetailInput.value=""

})


// testing
taskcont.addEventListener("click", (e) => {
    if (e.target.classList.contains("complete")) {
        const index = Number(e.target.dataset.index);

        alltask.splice(index, 1);
        localStorage.setItem("alltask", JSON.stringify(alltask));

        renderTask();
    }
});
