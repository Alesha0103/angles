import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { cancelStep, cancelStepButton, rotateBoard } from '../../store/actions/GeneralActions';
import { usePrevious } from '../../hooks/usePrevious';

import "./Buttons.scss";
import { Restart } from '../Restart/Restart';

export const Buttons = () => {

  const dispatch = useAppDispatch();
  const {
    whoseTurn,
    memorizedChecker,
    savedCheckers,
    victory
  } = useAppSelector(state => state.generalReducer);

  const prevTurn = usePrevious(whoseTurn);

  const disabledCancelOnVictory = !!victory && !memorizedChecker;

  const onCancelClick = () => {
    if (memorizedChecker) {
      dispatch(cancelStep());
    }
    if (!memorizedChecker && prevTurn && prevTurn !== whoseTurn && !victory) {
      dispatch(cancelStepButton());
    }
  }
  const onRotateClick = () => {
    dispatch(rotateBoard());
  }

  return (
    <div className="buttons">
      <button
        disabled={!savedCheckers.length || disabledCancelOnVictory}
        onClick={onCancelClick}
        className="buttons__default"
      >
        Cancel step
      </button>

      <Restart />

      <button
        onClick={onRotateClick}
        className="buttons__default"
      >
        Rotate
      </button>
    </div>
  )
}
