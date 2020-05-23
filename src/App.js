import React from 'react';
import sudoku from './utils/sudoku';
import './App.css';

const App = () => {
  // let numbers = sudoku();
  sudoku();
  let numbers = [];
  return (
    <div className="App">
      <div className="sudoku">
        { numbers.map((s, i) => <div className="cell" key={ `cell${ i }` }>{ s }</div>) }
      </div>
    </div>
  );
}

export default App;
