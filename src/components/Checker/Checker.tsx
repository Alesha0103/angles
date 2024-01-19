import React from 'react'
import './Checker.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  cancelStep,
  memorizeChecker,
  saveFirstStep,
  setTurn,
} from "../../store/actions/GeneralActions";
import classNames from 'classnames';
import { BLACK, WHITE } from '../../helpers/constants';

type CheckerProps = {
  coordinate: string,
}
export const Checker:React.FC<CheckerProps> = ({coordinate}) => {
  const dispatch = useAppDispatch();
  const [checkerColor, setCheckerColor] = React.useState("");
  const { whiteCheckers, blackCheckers, memorizedChecker, savedStep, whoseTurn } = useAppSelector(state => state.generalReducer);

  React.useEffect(() => {
    const blackChecker = blackCheckers.find(checker => checker === coordinate);
    const whiteChecker = whiteCheckers.find(checker => checker === coordinate);
    if (blackChecker) {
      setCheckerColor(BLACK);
      return;
    }
    if (whiteChecker) {
      setCheckerColor(WHITE);
      return;
    }
    setCheckerColor("");
  }, [whiteCheckers, blackCheckers, whoseTurn])

  const finishStep = () => {
    if (memorizedChecker?.coordinate !== savedStep) {
      dispatch(setTurn());
    }
    dispatch(saveFirstStep(null));
  }

  const handleClick = () => {
    if (checkerColor === whoseTurn) {
      if (memorizedChecker?.coordinate === coordinate) {
        finishStep();
        return;
      }
      if (!!memorizedChecker) {
        return;
      }
      dispatch(memorizeChecker({ type: checkerColor, coordinate}));
      dispatch(saveFirstStep(coordinate));
    }
  }

  if (!checkerColor) {
    return null;
  }

  return (
    <div
      className={classNames("checker", {
        "checker__memorized": memorizedChecker?.coordinate === coordinate,
        "checker__white": checkerColor === WHITE,
        "checker__black": checkerColor === BLACK,
      })}
      style={{
        backgroundColor: checkerColor,
        cursor: !!memorizedChecker ||  (checkerColor !== whoseTurn) ? "default" : ""
      }}
      onClick={handleClick}
    />
  )
}
