const board = [
  [0, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],

  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],

  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];
/**
 * 
 * @function - displaysudo
 * @description - user to  display the sudoku board in console
 * 
 */

const displaySudo = (board) => {
  for (let i = 0; i < board.length; i++) {
    let line = "";

    for (let j = 0; j < board[i].length; j++) {

      if (j === 3 || j === 6) {
        line += "| ";
      }

      if (board[i][j] === 0) {
        line += "_ ";
      } else {
        line += board[i][j] + " ";
      }
    }

    console.log(line);

    if (i === 2 || i === 5) {
      console.log("---------------------");
    }
  }
};
/**
5 3 . | . 7 . | . . .
6 . . | 1 9 5 | . . .
. 9 8 | . . . | . 6 .
---------------------
8 . . | . 6 . | . . 3
4 . . | 8 . 3 | . . 1
7 . . | . 2 . | . . 6
---------------------
. 6 . | . . . | 2 8 .
. . . | 4 1 9 | . . 5
. . . | . 8 . | . 7 9
 */

// a function is valide move 
function isBoardComplete(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }

  return true;
}

 function isValidMove(board, row, col, input) {
    if (
  row < 0 || row > 8 ||
  col < 0 || col > 8 ||
  input < 1 || input > 9
) {
  return {
    success: false,
    message: "Invalid row, column, or input"
  };
}
  // Cell must be empty
  if (board[row][col] !== 0) {
    return {
      success: false,
      message: "Cell is already occupied"
    };
  }

  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === input) {
      return {
        success: false,
        message: "input already exists in this row"
      };
    }
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === input) {
      return {
        success: false,
        message: "input already exists in this column"
      };
    }
  }

  // Find the 3×3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  // Check 3×3 box
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === input) {
        return {
          success: false,
          message: "input already exists in this 3x3 box"
        };
      }
    }
  }

  return {
    success: true,
    message: "Move is valid"
  };
}
function makeMove(board, row, col, input) {

  const result = isValidMove(board, row, col, input);

  if (!result.success) {
    return result;
  }

  board[row][col] = input;

  return {
    success: true,
    message: "input placed successfully"
    
  };

  
}
function playMove(board, row, col, input) {
  const result = makeMove(board, row, col, input);

  console.log(result);

  displaySudo(board);

  if (result.success && isBoardComplete(board)) {
    console.log("WINNER!");
  }
}
playMove(board,0,2,5)
playMove(board,0,0,1)

