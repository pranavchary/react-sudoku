/* SUDOKU LOGIC AND RULES */
/*
  This is where a new sudoku board is created and validated before showing on the screen.
  Throughout comments and syntax, "cells" will refer to a square containing a digit value for sudoku purposes (81)
  whereas "square" will refer to a 3x3 group of cells that form the sudoku board. (9)

  This basically needs to be a Sudoku solving algorithm to generate a board properly...
*/

class Sudoku {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.allCells = new Array(81).fill(null);
    this.bands = [
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
    this.stacks = [
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
    this.blocks = [
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
    this.valueOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  init = () => {
    let givenCount;
    // Let's add some givens randomly based on difficulty
    switch (this.difficulty) {
      case 1:
        givenCount = 27;
        break;
      case 2:
        givenCount = 22;
        break;
      case 3:
        givenCount = 18;
        break;
      case 4:
        givenCount = 14;
        break;
      case 5:
        givenCount = 10;
        break;
      default:
        break;
    }

    if (givenCount === undefined) return new Error('No difficulty level specified');
    for (let i = 0; i < givenCount; i++) {
      let randomIndex = Math.floor(Math.random() * 81);
      while (this.allCells[randomIndex] !== null) {
        randomIndex = Math.floor(Math.random() * 81);
      }
      let cellIsFilled = false;
      while (!cellIsFilled) {
        cellIsFilled = this.digitPlacement(randomIndex, true);
      }
    }

    // Get all possible options for a cell,
    for (let i in this.allCells) {
      if (this.allCells[i] === null) this.allCells[i] = new Cell();
      this.getCellPossibilities(i);
    }



    return this.allCells;
  }

  checkRelCellValidation = (index, value) => {
    // Determined the square, row, and column the cell belongs to
    const blocks = this.blocks.find(s => s.includes(index));
    const bands = this.bands.find(r => r.includes(index));
    const stacks = this.stacks.find(c => c.includes(index));

    // Create a new array of all indexs related to the index we are trying to add to (square, rows, columns)
    let relatedCells = [...new Set(blocks.concat(bands, stacks))];
    // Remove the index we are trying to add, since we already know it's empty
    relatedCells.splice(relatedCells.indexOf(index), 1);

    for (let i = 0; i < relatedCells.length; i++) {
      if (this.allCells[relatedCells[i]] !== null && this.allCells[relatedCells[i]].value === value) {
        return false;
      }
    }

    return true;
  }

  digitPlacement = (index, given, value) => {
    if (value === undefined) value = this.valueOptions[Math.floor(Math.random() * 9)];
    // If it's still undefined, something went wrong. Return false immediately.
    if (value === undefined) return false;

    let passedRelCellValidation = this.checkRelCellValidation(index, value);

    if (passedRelCellValidation) {
      const cell = new Cell();
      cell.value = value;
      cell.given = given;
      cell.display = true;
      this.allCells[index] = cell;
    }

    return passedRelCellValidation;
  }

  getCellPossibilities = (index) => {
    if (typeof index !== 'number') index = parseInt(index, 10);
    for (let i = 0; i < this.valueOptions.length; i++) {
      if (this.checkRelCellValidation(index, this.valueOptions[i])) {
        this.allCells[index].pencil.push(this.valueOptions[i]);
      }
    }

    if (this.allCells[index].pencil.length === 1) {
      this.allCells[index].value = this.allCells[index].pencil[0];
      this.allCells[index].display = true;
    }
  }

}

class Cell {
  constructor() {
    this.value = null;
    this.given = false;
    this.display = false;
    this.pencil = [];
  }
}

export default Sudoku;
