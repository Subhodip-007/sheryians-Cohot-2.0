
let input = document.querySelector("#input");
let btn = document.querySelector("#btn");
let canbtn = document.querySelector("#cancel-btn"); 
let filenameDisplay = document.querySelector("#filename");


btn.addEventListener("click", () => {
    input.click();
});

input.addEventListener("change", () => {
 filenameDisplay.textContent=`${input.files[0].name}`;
    
})
canbtn.addEventListener("click",()=>{
    input.value="";
    filenameDisplay.textContent="uplaod file";
})

    

