import React, { useState, useEffect } from 'react';
import Sudoku from './utils/sudoku';
import './App.css';

const App = () => {
  const [board, setBoard] = useState([]);
  useEffect(() => {
    const sudoku = new Sudoku(3);
    setBoard(sudoku.init());

    return () => { console.log('return'); setBoard([]); }
  }, []);
  console.log(board);
  return (
    <div className="App">
      <div className="sudoku">
        { board.map((n, i) => (
          <div
            className={ `cell${n.value !== null && n.display === false ? 'hidden-solved' : ''}` }
            key={ `cell${i}` }
            title={ JSON.stringify(n.pencil) }
          >
            { n.value }
          </div>
        )) }
      </div>
    </div>
  );
}

export default App;
