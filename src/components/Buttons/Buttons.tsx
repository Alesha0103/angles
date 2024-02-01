import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { cancelStep, rotateBoard } from '../../store/actions/GeneralActions';
import { usePrevious } from '../../hooks/usePrevious';
import { WHITE } from '../../helpers/constants';

import "./Buttons.scss";
import { Restart } from '../Restart/Restart';

export const Buttons = () => {

  const dispatch = useAppDispatch();
  const {
    whoseTurn,
    memorizedChecker,
    whiteCheckers,
    blackCheckers,
    savedCheckers
  } = useAppSelector(state => state.generalReducer);

  const prevTurn = usePrevious(whoseTurn);

  const checkIfButtonDisabled = () => {
    if (!savedCheckers.length) return true;
    return whoseTurn === WHITE ? 
      whiteCheckers.every(element => savedCheckers.includes(element))
      : blackCheckers.every(element => savedCheckers.includes(element));
  }

  const onCancelClick = () => {
    dispatch(cancelStep(memorizedChecker || (prevTurn === whoseTurn) ? undefined : true));
  }
  const onRotateClick = () => {
    dispatch(rotateBoard());
  }

  return (
    <div className="buttons">
      <button
        disabled={checkIfButtonDisabled()}
        onClick={onCancelClick}
        className="buttons__default"
      >
        Cancel step
      </button>
      <Restart/>
      <button
        onClick={onRotateClick}
        className="buttons__default"
      >
        Rotate
      </button>
    </div>
  )
}
