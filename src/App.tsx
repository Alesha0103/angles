import React from 'react';
import './App.scss';
import { board } from './helpers/GenerateChessBoard';
import { Cell } from './components/Cell/Cell';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { cancelStep, reloadApp } from './store/actions/GeneralActions';
import { BLACK, WHITE } from './helpers/constants';
import classNames from 'classnames';
import { Buttons } from './components/Buttons/Buttons';

const App = () => {
  const checkerBoard = board.getBoard();
  const dispatch = useAppDispatch();

  const { rotate } = useAppSelector(state => state.generalReducer);

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

  return (
    <div className="app">
      <Buttons/>
      <div className={classNames("grid", {"grid__rotate": rotate})}>
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
