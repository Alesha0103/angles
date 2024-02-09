import React from 'react';

import "./Restart.scss";
import { useAppDispatch } from '../../hooks/redux';
import { resetApp } from '../../store/actions/GeneralActions';

export const Restart = () => {
  const dispatch = useAppDispatch();
  const [question, setQuestion] = React.useState(false);
  const confirmButtonRef = React.useRef<any>(null);
  const rejectButtonRef = React.useRef<any>(null);

  React.useEffect(() => {
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
    console.log('event :>> ', event.target);
    console.log('confirmButtonRef.current :>> ', confirmButtonRef.current);
    console.log('rejectButtonRef.current :>> ', rejectButtonRef.current);
    if (
      // (confirmButtonRef.current && !confirmButtonRef.current.contains(event.target)) ||
      (rejectButtonRef.current && rejectButtonRef.current.contains(event.target))
    ) {
      setQuestion(false);
    }
  }

  if (question) {
    return (
      <div className="restart__answers">
        <button onClick={resetGame} ref={confirmButtonRef}>Yes</button>
        <button onClick={rejectReset} ref={rejectButtonRef}>No</button>
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
