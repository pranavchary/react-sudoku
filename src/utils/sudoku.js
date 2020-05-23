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

  let undefinedCellValueError = false;
  for (let i = 0; i < 45; i++) {
    if (undefinedCellValueError) break;
    let cellIsFilled = false;
    let valueOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    while (!cellIsFilled) {
      const optionIndex = Math.floor(Math.random() * valueOptions.length);
      // Pick a digit from 1 - 9 to assign to a cell
      const cellValue = valueOptions[optionIndex];
      if (cellValue === undefined) {
        console.log('cell value is undefined!!!');
        undefinedCellValueError = true;
        break;
      }

      // Determined the square, row, and column the cell belongs to
      const squareCells = squareGroups.find(s => s.includes(i));
      const rowCells = rowGroups.find(r => r.includes(i));
      const colCells = colGroups.find(c => c.includes(i));

      // Create a new array of all cells related to the cell we are trying to add to (square, rows, columns)
      let relatedCells = [...new Set(squareCells.concat(rowCells, colCells))];
      // Remove the cell we are trying to add, since we already know it's empty
      relatedCells.splice(relatedCells.indexOf(i), 1);

      let relatedCellsValidated = true
      for (let i = 0; i < relatedCells.length; i++) {
        if (allCells[relatedCells[i]] === cellValue) {
          relatedCellsValidated = false;
          break;
        }
      }

      if (relatedCellsValidated) {
        console.log('value', cellValue, 'can be placed in cell', i);
        allCells[i] = cellValue;
        cellIsFilled = true;
      } else {
        console.log('cannot place', cellValue, 'in', i, '- creating new value');
        valueOptions.splice(optionIndex, 1);
      }
    }
  }

  console.log(allCells);

  return Promise.resolve(allCells);
}

export default sudoku;
