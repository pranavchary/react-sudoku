/* SUDOKU LOGIC AND RULES */
/*
  This is where a new sudoku board is created and validated before showing on the screen.
  Throughout comments and syntax, "cells" will refer to a square containing a digit value for sudoku purposes (81)
  whereas "square" will refer to a 3x3 group of cells that form the sudoku board. (9)
*/

const rowGroups = [
  [0, 1, 2, 3, 4, 5, 6 ,7, 8],
  [9, 10, 11, 12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 31, 32, 33, 34, 35],
  [36, 37, 38, 39, 40, 41, 42, 43, 44],
  [45, 46, 47, 48, 49, 50, 51, 52, 53],
  [54, 55, 56, 57, 58, 59, 60, 61, 62],
  [63, 64, 65, 66, 67, 68, 69, 70, 71],
  [72, 73, 74, 75, 76, 77, 78, 79, 80]
];

const colGroups = [
  [0, 9, 18, 27, 36, 45, 54, 63, 72],
  [1, 10, 19, 28, 37, 46, 55, 64, 73],
  [2, 11, 20, 29, 38, 47, 56, 65, 74],
  [3, 12, 21, 30, 39, 48, 57, 66, 75],
  [4, 13, 22, 31, 40, 49, 58, 67, 76],
  [5, 14, 23, 32, 41, 50, 59, 68, 77],
  [6, 15, 24, 33, 42, 51, 60, 69, 78],
  [7, 16, 25, 34, 43, 52, 61, 70, 79],
  [8, 17, 26, 35, 44, 53, 62, 71, 80]
];

const diagGroups = [
  [0, 10, 20, 30, 40, 50, 60, 70, 80],
  [8, 16, 24, 32, 40, 48, 56, 64, 72]
];

const squareGroups = [
  [0, 1, 2, 9, 10, 11, 18, 19, 20],
  [3, 4, 5, 12, 13, 14, 21, 22, 23],
  [6, 7, 8, 15, 16, 17, 24, 25, 26],
  [27, 28, 29, 36, 37, 38, 45, 46, 47],
  [30, 31, 32, 39, 40, 41, 48, 49, 50],
  [33, 34, 35, 42, 43, 44, 51, 52, 53],
  [54, 55, 56, 63, 64, 65, 72, 73, 74],
  [57, 58, 59, 66, 67, 68, 75, 76, 77],
  [60, 61, 62, 69, 70, 71, 78, 79, 80]
];

const sudoku = () => {
  let allCells = new Array(81).fill(null);
  console.log(allCells);

  // Pick a digit from 1 - 9 to assign to a cell
  let cellValue = Math.floor(Math.random() * 9 + 1);
  // Pick a random cell from 0 - 80 to assign the value to
  let cellNumber = Math.floor(Math.random() * 81);
  // If the cell is already assigned, generate a new random cell number
  while (allCells[cellNumber] != null) {
    cellNumber = Math.floor(Math.random() * 81);
  }

  console.log(cellNumber);
  // Determined the square, row, and column the cell belongs to
  let squareCells = squareGroups.find(s => s.includes(cellNumber));
  let rowCells = rowGroups.find(r => r.includes(cellNumber));
  let colCells = colGroups.find(c => c.includes(cellNumber));

  let filteredCells = [...new Set(squareCells.concat(rowCells, colCells))]
  console.log(filteredCells);

  // For now, let's start with looping through cells
}

export default sudoku;
