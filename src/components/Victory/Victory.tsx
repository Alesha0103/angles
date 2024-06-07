import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { BLACK, DRAW, WHITE } from '../../helpers/constants';
import { board } from '../../helpers/GenerateChessBoard';
import { setVictory } from '../../store/actions/GeneralActions';

import "./Victory.scss";

export const Victory = () => {
  const dispatch = useAppDispatch();
  const {
    whiteCheckers,
    blackCheckers,
    memorizedChecker,
    whoseTurn,
    victory
  } = useAppSelector(state => state.generalReducer);

  const [ opened, setOpen ] = React.useState(false);
  const whiteHome = board.getHome(WHITE);
  const blackHome = board.getHome(BLACK);

  React.useEffect(() => {
    checkWinner();
    // eslint-disable-next-line
  }, [whiteCheckers, blackCheckers, memorizedChecker])

  const checkWinner = () => {
    const checkingWhite = blackHome?.every(el => whiteCheckers.includes(el));
    const checkingBlack = whiteHome?.every(el => blackCheckers.includes(el));
    if (
      checkingBlack &&
      checkingWhite &&
      !memorizedChecker &&
      !victory
    ) {
      setOpen(true);
      dispatch(setVictory(DRAW));
      return;
    }
    if (
      checkingWhite &&
      whoseTurn === WHITE &&
      !memorizedChecker &&
      !victory
    ) {
      setOpen(true);
      dispatch(setVictory(WHITE));
      return;
    }
    if (
      checkingBlack &&
      !memorizedChecker &&
      !victory
    ) {
      setOpen(true);
      dispatch(setVictory(BLACK));
      return;
    }
  };

  const onClick = () => {
    setOpen(false);
  }

  if (!opened) {
    return null;
  }

  return (
    <div className="winner__wrapp">
      <div className="winner__section">
        {victory === DRAW ? (
          <span>
            There is no winner!
          </span>
        ) : (
          <span>
            The winner is {victory === WHITE ? "white!" : "black!"}
          </span>
        )}
        <button onClick={onClick}>Ok!</button>
      </div>
    </div>
  )
}
