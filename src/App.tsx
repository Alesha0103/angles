import React from 'react';
import './App.scss';
import { board } from './helpers/GenerateChessBoard';
import { Cell } from './components/Cell/Cell';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { cancelStep, reloadApp } from './store/actions/GeneralActions';

const App = () => {
  const checkerBoard = board.getBoard();

  const dispatch = useAppDispatch();

  const {
    whiteCheckers,
    blackCheckers,
    whoseTurn
  } = useAppSelector(state => state.generalReducer);

  React.useEffect(() => {
    const whiteCheckersStorage = localStorage.getItem("whiteCheckers");
    const blackCheckersStorage = localStorage.getItem("blackCheckers");
    const whoseTurnStorage = localStorage.getItem("whoseTurn");

    if (whiteCheckersStorage && blackCheckersStorage && whoseTurnStorage) {
      const data = {
        whiteCheckers: whiteCheckersStorage.split(","),
        blackCheckers: blackCheckersStorage.split(","),
        whoseTurn: whoseTurnStorage,
      }
      dispatch(reloadApp(data));
    }
  }, [])

  // React.useEffect(() => {
  //   localStorage.setItem("whiteCheckers", whiteCheckers.toString());
  //   localStorage.setItem("blackCheckers", blackCheckers.toString());
  //   localStorage.setItem("whoseTurn", whoseTurn);
  // }, [whiteCheckers, blackCheckers, whoseTurn])

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
