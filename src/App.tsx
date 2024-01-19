import React from 'react';
import './App.scss';
import { board } from './helpers/GenerateChessBoard';
import { Cell } from './components/Cell/Cell';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { cancelStep, reloadApp } from './store/actions/GeneralActions';
import { BLACK, WHITE } from './helpers/constants';

export const usePrevious = (value: any) => {
  const currentRef = React.useRef(value)
  const previousRef = React.useRef()
  if (currentRef.current !== value) {
      previousRef.current = currentRef.current
      currentRef.current = value
  }
  return previousRef.current
}

const App = () => {
  const checkerBoard = board.getBoard();

  const dispatch = useAppDispatch();

  const {
    whiteCheckers,
    blackCheckers,
    whoseTurn,
    savedStep,
    savedCheckers,
    memorizedChecker
  } = useAppSelector(state => state.generalReducer);

  const prevTurn = usePrevious(whoseTurn);

  console.log('savedCheckers :>> ', savedCheckers);
  console.log('memorizedChecker :>> ', memorizedChecker);
  console.log('savedStep :>> ', savedStep);
  console.log('prevTurn :>> ', prevTurn);

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

  const checkIfCancelNeed = () => {
    if (memorizedChecker || (prevTurn === whoseTurn)) {
      return null;
    }
  }

  const onClickHandle = () => {
    dispatch(cancelStep(memorizedChecker || (prevTurn === whoseTurn) ? undefined : true));
  }

  return (
    <div className="app">
      <button
        // disabled={ifDisabled()}
        style={{
          padding: "10px",
          position: "absolute",
          top: "5px",
          cursor: "pointer",
        }}
        onClick={onClickHandle}
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
