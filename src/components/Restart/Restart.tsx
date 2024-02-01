import React from 'react';

import "./Restart.scss";
import { useAppDispatch } from '../../hooks/redux';
import { resetApp } from '../../store/actions/GeneralActions';

export const Restart = () => {
  const dispatch = useAppDispatch();
  const [question, setQuestion] = React.useState(false);

  const onRestartClick = () => {
    setQuestion(true);
  }

  const rejectReset = () => {
    setQuestion(false);
  }
  const resetGame = () => {
    // Зробити щоб після reset шашки стали на свої місця!!!
    dispatch(resetApp());
    setQuestion(false);
  }

  if (question) {
    return (
      <div className="restart__answers">
        <button onClick={resetGame}>Yes</button>
        <button onClick={rejectReset}>No</button>
      </div>
    )
  }

  return (
    <button
      className="restart"
      onClick={onRestartClick}
    >
      Restart
    </button>
  )
}
