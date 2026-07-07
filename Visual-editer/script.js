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
function renderShape(rectangle) {

    const rectangleElement = document.createElement("div");

    rectangleElement.classList.add("shape");

    rectangleElement.dataset.id = rectangle.id;

    rectangleElement.style.left = rectangle.x + "px";
    rectangleElement.style.top = rectangle.y + "px";
    rectangleElement.style.width = rectangle.width + "px";
    rectangleElement.style.height = rectangle.height + "px";
    rectangleElement.style.background = rectangle.background;

    rectangleElement.addEventListener("click", (e) => {

        // Prevent click from bubbling to canvas later
        e.stopPropagation();

        // Remove previous selection
        if (state.selectedId !== null) {

            const previousRectangle = document.querySelector(
                `[data-id="${state.selectedId}"]`
            );

            if (previousRectangle) {
                previousRectangle.classList.remove("selected");
            }
        }

        // Save newly selected rectangle
        state.selectedId = Number(e.target.dataset.id);

        // Add blue outline
        e.target.classList.add("selected");

        console.log(state.selectedId);

    });

    canvas.appendChild(rectangleElement);
}
function addbtnfeature(){
    addrectranglebtn.addEventListener("click", () => {

    const rectangle = {
        id: Date.now(),
        type: "rectangle",
        x: 500,
        y: 500,
        width: 120,
        height: 80,
        background: "#3498db",
        
    };

    state.elements.push(rectangle);
    renderShape(rectangle)


});
}
function selectfeature(){

}
themefeature()
addbtnfeature()
selectfeature()



