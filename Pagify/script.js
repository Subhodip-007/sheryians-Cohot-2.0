let addRectangle = document.querySelector(".Add-Rectangle");
let canvas = document.querySelector(".canvas");

let id = 0;
let selectedRectangle = null;
const rectanglesarr = [];

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
function getRectangleById(id){
     return rectanglesarr.find(
                item => item.id === Number(id)
            )
}

addRectangle.addEventListener("click", () => {

    let rectangle = document.createElement("div");
    rectangle.classList.add("shape");
   
    


    let width = Math.floor(Math.random() * 100) + 50;
    let height = Math.floor(Math.random() * 100) + 50;

    rectangle.style.width = `${width}px`;
    rectangle.style.height = `${height}px`;

    let left = Math.random() * (canvas.clientWidth - width);
    let top = Math.random() * (canvas.clientHeight - height);

    rectangle.style.left = `${left}px`;
    rectangle.style.top = `${top}px`;

    rectangle.dataset.id = id;

    canvas.appendChild(rectangle);

    const shapeObj = {
        id,
        x: left,
        y: top,
        width,
        height,
        type: "rectangle"
    };

    rectanglesarr.push(shapeObj);

    id++;

    rectangle.addEventListener("mousedown", (e) => {

        // Remove previous selection
        if (selectedRectangle) {
            selectedRectangle.classList.remove("selected");
        }

        // Select current rectangle
        selectedRectangle = rectangle;
        selectedRectangle.classList.add("selected");
         rectangle.classList.add("handle");
    rectangle.classList.add("se");

        // Start dragging
        isDragging = true;

        // Mouse position inside rectangle
        offsetX = e.offsetX;
        offsetY = e.offsetY;

        console.log(
            getRectangleById(selectedRectangle.dataset.id)
        );
        

    });

});

document.addEventListener("mousemove", (e) => {

    if (!isDragging || !selectedRectangle) return;

    const canvasRect = canvas.getBoundingClientRect();

    let left = e.clientX - canvasRect.left - offsetX;
    let top = e.clientY - canvasRect.top - offsetY;

    // Keep inside canvas
    left = Math.max(
        0,
        Math.min(left, canvas.clientWidth - selectedRectangle.offsetWidth)
    );

    top = Math.max(
        0,
        Math.min(top, canvas.clientHeight - selectedRectangle.offsetHeight)
    );

    // Move DOM
    selectedRectangle.style.left = `${left}px`;
    selectedRectangle.style.top = `${top}px`;

    // Update object
    const shape = getRectangleById(selectedRectangle.dataset.id);

    if (shape) {
        shape.x = left;
        shape.y = top;
    }

});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

canvas.addEventListener("click", (e) => {

    // Clicked empty canvas
    if (e.target === canvas) {

        if (selectedRectangle) {
            selectedRectangle.classList.remove("selected");
            selectedRectangle = null;
        }

    }

});