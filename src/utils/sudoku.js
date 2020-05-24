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
        givenCount = 36;
        break;
      case 2:
        givenCount = 33;
        break;
      case 3:
        givenCount = 30;
        break;
      case 4:
        givenCount = 27;
        break;
      case 5:
        givenCount = 24;
        break;
      default:
        break;
    }

    if (givenCount === undefined) return new Error('No difficulty level specified');

    // Testing this backtracking method
    this.fillBoard();

    this.allCells.forEach((cell, i) => {
      if (cell === null) this.allCells[i] = new Cell();
    });

    return this.allCells;
  }

  checkRelCellValidation = (index, value) => {
    // Determined the block, band, and stack the cell belongs to
    const block = this.blocks.find(s => s.includes(index));
    const band = this.bands.find(r => r.includes(index));
    const stack = this.stacks.find(c => c.includes(index));

    // Create a new array of all indexs related to the index we are trying to add to (square, rows, columns)
    let relatedCells = [...new Set(block.concat(band, stack))];
    // Remove the index we are trying to add, since we already know it's empty
    relatedCells.splice(relatedCells.indexOf(index), 1);

    for (let i = 0; i < relatedCells.length; i++) {
      const currentCell = this.allCells[relatedCells[i]];
      if (currentCell !== null && currentCell.value === value) {
        return false;
      }
    }

    return true;
  }

  fillBoard = () => {
    const fillOrder = [0, 1, 3, 2, 4, 6, 5, 7, 8];
    let fillIndex = 0;
    let stepsToBacktrack = 1;
    let backtrackCounter = 0;

    const backtrack = () => {
      if (backtrackCounter === 2500) /*throw new Error('2,500 backtracks reached.');*/ return false;
        fillIndex = fillIndex - stepsToBacktrack;
        if (fillIndex < 0) fillIndex = 0;
        stepsToBacktrack++;
        if (stepsToBacktrack > fillOrder.length - 1 || fillIndex === 0) stepsToBacktrack = 1;
        backtrackCounter++;

        return true;
    }

    while (fillIndex < this.blocks.length) {
      console.log('trying to fill block', fillOrder[fillIndex]);
      if (!this.populateSudokuBlock(fillOrder[fillIndex]) && !backtrack()) break;
      else fillIndex++;
    }

    if (fillIndex === 9) console.log('ALL POPULATED THANK GOD.');
  }

  populateSudokuBlock = (blockIndex = 0) => {
    let block = this.blocks[blockIndex].slice(0, this.blocks[blockIndex].length);
    let blockValues = this.valueOptions.slice(0, this.valueOptions.length);
    while (block.length > 0) {
      const randomValue = blockValues[Math.floor(Math.random() * blockValues.length)];
      if (randomValue === undefined) {
        console.log('UNDEFINED VALUE FOUND. RESET BLOCK', blockIndex);
         return false;
       }
      if (this.checkRelCellValidation(block[0], randomValue)) {
        this.allCells[block[0]] = new Cell();
        this.allCells[block[0]].value = randomValue;
        block.splice(0, 1);
        blockValues = this.valueOptions.slice(0, this.valueOptions.length);
      } else {
        blockValues.splice(blockValues.indexOf(randomValue), 1);
      }
    }

    return true;
  }

  pencilSudokuBlock = (blockIndex) => {
    let block = this.blocks[blockIndex].slice(0, this.blocks[blockIndex].length);
    // Pencil in all possible values for the cell
    while (block.length > 0) {
      let pencilArray = [];
      for (let i = 0; i < this.valueOptions.length; i++) {
        const value = this.valueOptions[i];
        this.allCells[block[0]] = new Cell();
        if (this.checkRelCellValidation(block[0], value)) {
          pencilArray.push(value);
        }
      }
      this.allCells[block[0]].pencil = pencilArray;
      block.splice(0, 1);
    }

    // If any pencil arrays are empty, this means there is an invalid placement somewhere. We need to backtrack.
    // Otherwise Assign values to any cells that have only one possible value
    for (let i = 0; i < this.blocks[blockIndex].length; i++) {
      let idx = this.blocks[blockIndex][i];
      console.log('check out block', idx);
      console.log(this.allCells[idx].pencil)
      if (this.allCells[idx].pencil.length === 0) {
        console.log('IMPOSSIBLE COMBO FOUND. RESET.');
        return false;
      } else if (this.allCells[idx].pencil.length === 1) {
        this.allCells[idx].value = this.allCells[idx].pencil[0];
        this.allCells[idx].pencil = [];
      }
    }

    return true;
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
