import React from 'react';
import './App.scss';
import { board } from './helpers/GenerateChessBoard';
import { Cell } from './components/Cell/Cell';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { reloadApp } from './store/actions/GeneralActions';
import classNames from 'classnames';
import { Buttons } from './components/Buttons/Buttons';
import { Tips } from './components/Tips/Tips';
import { Indicator } from './components/Indicator/Indicator';
import { Victory } from './components/Victory/Victory';

const App = () => {
  const checkerBoard = board.getBoard();
  const dispatch = useAppDispatch();

  const [loader, setLoader] = React.useState(true);
  const { rotate } = useAppSelector(state => state.generalReducer);

  React.useEffect(() => {
    const whiteCheckersStorage = localStorage.getItem("whiteCheckers");
    const blackCheckersStorage = localStorage.getItem("blackCheckers");
    const whoseTurnStorage = localStorage.getItem("whoseTurn");
    const tipsStorage = localStorage.getItem("tips");
    const victoryStorage = localStorage.getItem("victory");

    if (whiteCheckersStorage && blackCheckersStorage && whoseTurnStorage) {
      const data = {
        whiteCheckers: whiteCheckersStorage.split(","),
        blackCheckers: blackCheckersStorage.split(","),
        whoseTurn: whoseTurnStorage,
        tips: !!tipsStorage && tipsStorage === "true" ? true : false,
        victory: victoryStorage,
      }
      dispatch(reloadApp(data));
    }
    setLoader(false);
  // eslint-disable-next-line
  }, [])

  if (loader) return null;

  return (
    <div className="app">
      <Buttons/>
      <Indicator />
      <div className={classNames("grid", {"grid__rotate": rotate})}>
        {checkerBoard.map((cell) => (
          <Cell
            key={"key" + cell.coordinate}
            type={cell.color}
            coordinate={cell.coordinate}
          />
        ))}
      </div>
      <Tips/>
      <Victory />
    </div>
  );
}

export default App;
