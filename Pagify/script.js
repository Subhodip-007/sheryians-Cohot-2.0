let addRectangle = document.querySelector(".Add-Rectangle");
let canvas = document.querySelector(".canvas");

let id=0;
let selectedRectangle = null;
const rectanglesarr = [];
addRectangle.addEventListener("click",()=>{
let rectangle = document.createElement("div");
rectangle.classList.add("shape");

let width = Math.floor(Math.random() * 100) + 50;
let height = Math.floor(Math.random() * 100) + 50;

rectangle.style.width = `${width}px`;
rectangle.style.height = `${height}px`;
rectangle.draggable=true;

let left = Math.random() * (canvas.clientWidth - width);
let top = Math.random() * (canvas.clientHeight - height);

rectangle.style.left = `${left}px`;
rectangle.style.top = `${top}px`;

rectangle.dataset.id = id;
canvas.appendChild(rectangle);
let shapeobj={
    id:id,
    x:left,
    y:top,
    height:height,
    width:width,
    type:"rectangle"
}
id++;

rectanglesarr.push(shapeobj);
rectangle.addEventListener("click", (e) => {
    // Remove selection from the previous rectangle
    if (selectedRectangle) {
        selectedRectangle.classList.remove("selected");
    }

    // Select the new rectangle
    selectedRectangle = rectangle;
    selectedRectangle.classList.add("selected");
    const id = Number(e.target.dataset.id);

    console.log(selectedRectangle.dataset.id);
const selectedShape = rectanglesarr.find(
    item => item.id === id
);

console.log(selectedShape);


});

})
    canvas.addEventListener("click", (e) => {
    // Only if the empty canvas itself was clicked
    if (e.target === canvas) {
        if (selectedRectangle) {

            selectedRectangle.classList.remove("selected");
            selectedRectangle = null;
              console.log(e.target);
        }
    }
});