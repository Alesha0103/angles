import React from 'react';
import './App.scss';
import { board } from './helpers/GenerateChessBoard';
import { Cell } from './components/Cell/Cell';

const App = () => {
  const chessBoard = board.getBoard();

  return (
    <div className="app">
      <div className="grid">
        {chessBoard.map(cell => (
          <Cell key={"key"+cell.coordinate} type={cell.color} coordinate={cell.coordinate}/>
        ))}
      </div>
    </div>
  );
}

export default App;
