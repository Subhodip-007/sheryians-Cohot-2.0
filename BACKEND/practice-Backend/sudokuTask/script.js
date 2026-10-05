// genetate sudoku algo 
// flow --> a 9X9 array.filled - 0  -- > isvalid function
function genereteSudoku(){
   


}
//......................................................................

let selectedCell = null;
let selectedRow = null;
let selectedCol = null;
let invalidCounter = 0;
const resetBtn = document.querySelector("#reset-btn");
const board = document.querySelector(".board");
const error  =  document.querySelector(".error");
const errorvalue = document.querySelector(".incorrect-move");
const timer = document.querySelector(".timer");

function checkWin() {

    for (let row = 0; row < 9; row++) {

    for (let col = 0; col < 9; col++) {

    if (sudoku[row][col] === 0) {
                return false;
    }

    }

    }

    return true;
}
function checkRow(row, number) {

    for (let col = 0; col < 9; col++) {

        if (sudoku[row][col] === number) {
            return false;
        }

    }

    return true;
}
function checkCol(col, number) {

    for (let row = 0; row < 9; row++) {

        if (sudoku[row][col] === number) {
            return false;
        }

    }

    return true;
}
function checkBox(Row,col,num){
        let startRow = Math.floor(Row / 3) * 3;

    let startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {

        for (let j = startCol; j < startCol + 3; j++) {

            if (sudoku[i][j] === num) {
                return false;
            }

        }

    }

    return true;

}
// TESTING..... timer feature 

// 




for (let row = 0; row < 9; row++) {

    for (let col = 0; col < 9; col++) {

        const gridItem = document.createElement("div");

        if (sudoku[row][col] !== 0) {

            gridItem.textContent = sudoku[row][col];

            gridItem.classList.add("fixed");

        }

        gridItem.classList.add("grid-item");

        gridItem.addEventListener("click", function () {

            if (gridItem.classList.contains("fixed")) {
                return;
            }

            if (selectedCell) {
                selectedCell.classList.remove("active");
            }

            selectedCell = gridItem;
            selectedCol = col;
            selectedRow = row;

            selectedCell.classList.add("active");

            console.log("Row:", selectedRow);
            console.log("Column:", selectedCol);

        });

        board.appendChild(gridItem);
    }
}
resetBtn.addEventListener('click', () => {

    const cells = document.querySelectorAll(".grid-item");

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const index = row * 9 + col;

            if (!cells[index].classList.contains("fixed")) {

                sudoku[row][col] = 0;

                cells[index].textContent = "";
                errorvalue.style.color = 'white'
                invalidCounter=0;
                errorvalue.textContent=`Error  ${invalidCounter}`;;

            }

        }
    }

});
document.addEventListener("keydown", (e) => {

    if (!selectedCell) {
        return;
    }

   if (e.key >= "1" && e.key <= "9") {

    let num = Number(e.key);
     if (sudoku[selectedRow][selectedCol] === 0) {
    if (checkRow(selectedRow,num)&&checkCol(selectedCol,num)&&checkBox(selectedRow,selectedCol,num)){

        selectedCell.textContent = num;

        sudoku[selectedRow][selectedCol] = num;
        if (checkWin()) {
    console.log("You won!");
 }  
        console.log("Valid move");

    }else{

        console.log("Invalid move");
        invalidCounter++;
        errorvalue.style.color = 'red'
        errorvalue.textContent = `Error  ${invalidCounter}`
        error.style.display = "flex"
        setTimeout(()=>{
            error.style.display = "none"
        },1000)

    }
}else{
    console.log("cell is occupied");
    
}
}

    if (e.key === "Backspace" || e.key === "Delete") {

    sudoku[selectedRow][selectedCol] = 0;

    selectedCell.textContent = "";

        console.log(sudoku);

    }
   

});


// generater pending....


