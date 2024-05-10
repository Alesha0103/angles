import React from 'react'
import './Checker.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  memorizeChecker,
  saveFirstStep,
} from "../../store/actions/GeneralActions";
import classNames from 'classnames';
import { BLACK, WHITE } from '../../helpers/constants';

type CheckerProps = {
  coordinate: string,
  type: string,
}
export const Checker:React.FC<CheckerProps> = ({ coordinate, type }) => {
  const dispatch = useAppDispatch();

  const {
    memorizedChecker,
    whoseTurn
  } = useAppSelector(state => state.generalReducer);

  const handleClick = () => {
    if (type === whoseTurn) {
      if (memorizedChecker?.coordinate) {
        return;
      }

      dispatch(memorizeChecker({ type, coordinate }));
      dispatch(saveFirstStep(coordinate));
      return;
    }
  };

  return (
    <div
      className={classNames("checker", {
        "checker__memorized": memorizedChecker?.coordinate === coordinate,
        "checker__white": type === WHITE,
        "checker__black": type === BLACK,
      })}
      style={{
        cursor: !!memorizedChecker ||  (type !== whoseTurn) ? "default" : ""
      }}
      onClick={handleClick}
    />
  )
}
