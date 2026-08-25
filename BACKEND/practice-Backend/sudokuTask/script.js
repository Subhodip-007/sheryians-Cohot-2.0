const sudoku = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
let selectedCell = null;
let selectedRow = null;
let selectedCol = null;
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
const board = document.querySelector(".board");

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
        selectedRow = row

        selectedCell.classList.add("active");

    console.log("Row:", selectedRow)
    console.log("Column:", selectedCol)

    });

        board.appendChild(gridItem);
    }

}
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





