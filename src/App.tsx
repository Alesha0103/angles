import React from 'react';
import './App.scss';
import { board } from './helpers/GenerateChessBoard';
import { Cell } from './components/Cell/Cell';
import { useAppSelector } from './hooks/redux';

const App = () => {
  const checkerBoard = board.getBoard();
  // const { whiteCheckers, blackCheckers, memorizedChecker } = useAppSelector(state => state.generalReducer);

  return (
    <div className="app">
      <div className="grid">
        {checkerBoard.map(cell => (
          <Cell key={"key"+cell.coordinate} type={cell.color} coordinate={cell.coordinate}/>
        ))}
      </div>
    </div>
  );
}

export default App;
