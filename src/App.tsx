import React from 'react';
import './App.scss';
import { board } from './helpers/GenerateChessBoard';
import { Cell } from './components/Cell/Cell';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { cancelStep } from './store/actions/GeneralActions';

const App = () => {
  const checkerBoard = board.getBoard();

  const dispatch = useAppDispatch();

  return (
    <div className="app">
      <button
        style={{
          padding: "10px",
          position: "absolute",
          top: "5px",
          cursor: "pointer",
        }}
        onClick={()=>dispatch(cancelStep())}
      >
        cancel step
      </button>
      <div className="grid">
        {checkerBoard.map((cell) => (
          <Cell
            key={"key" + cell.coordinate}
            type={cell.color}
            coordinate={cell.coordinate}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
