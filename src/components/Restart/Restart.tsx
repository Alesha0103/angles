import React from 'react';

import "./Restart.scss";
import { useAppDispatch } from '../../hooks/redux';
import { resetApp } from '../../store/actions/GeneralActions';

export const Restart = () => {
  const dispatch = useAppDispatch();
  const [question, setQuestion] = React.useState(false);
  const answersRef = React.useRef<any>(null);
  const restartRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (!question) {
      const restartElement = document.getElementById("restart");
      restartRef.current = restartElement;
    }
    if (question) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [question])

  const onRestartClick = () => {
    setQuestion(true);
  }

  const rejectReset = () => {
    setQuestion(false);
  }
  const resetGame = () => {
    dispatch(resetApp());
    setQuestion(false);
  }

  const handleClickOutside = (event: any) => {
    if (
        answersRef.current &&
        !answersRef.current.contains(event.target) &&
        restartRef.current &&
        !restartRef.current.contains(event.target)
      ) {
      rejectReset();
    }
  }

  if (question) {
    return (
      <div className="restart__answers" ref={answersRef}>
        <button onClick={resetGame}>Yes</button>
        <button onClick={rejectReset}>No</button>
      </div>
    )
  }

  return (
    <button
      id="restart"
      onClick={onRestartClick}
    >
      Restart
    </button>
  )
}
