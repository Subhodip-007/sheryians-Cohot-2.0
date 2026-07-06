let main = document.querySelector('main');
let themebutton=document.querySelector('.themebtn');
let addrectranglebtn=document.querySelector(".add-rectangle-btn")
const canvas = document.querySelector(".canvas-page");
const state = {
    elements: [],
    selectedId: null
}
let themefeature=()=>{
    themebutton.addEventListener("click",()=>{
   
    
    if (main.classList.contains("Light")) {
    main.classList.add("Dark");
    main.classList.remove("Light");
} else {
    main.classList.add("Light");
    main.classList.remove("Dark");
}
})
}
function rendershape(rectangle){
        const rectangleElement=document.createElement("div");
        rectangleElement.dataset.id = rectangle.id;

    rectangleElement.style.position = "absolute";
    rectangleElement.style.left = rectangle.x + "px";
    rectangleElement.style.top = rectangle.y + "px";
    rectangleElement.style.width = rectangle.width + "px";
    rectangleElement.style.height = rectangle.height + "px";
    rectangleElement.style.background = rectangle.background;
    rectangleElement.style.border = rectangle.border

    canvas.appendChild(rectangleElement);
        rectangleElement.addEventListener("click", (e) => {

    console.log(e.target.dataset.id);
    

});
    
}
function addbtnfeature(){
    addrectranglebtn.addEventListener("click", () => {

    const rectangle = {
        id: Date.now(),
        type: "rectangle",
        x: 100,
        y: 100,
        width: 120,
        height: 80,
        background: "#3498db",
        border:"1px solid white"
    };

    state.elements.push(rectangle);
    rendershape(rectangle)


});
}
function selectfeature(){

}
themefeature()
addbtnfeature()
selectfeature()



