import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setTips } from '../../store/actions/GeneralActions';

import "./Tips.scss";

export const Tips: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tips } = useAppSelector(state => state.generalReducer);

  const [ question, setQuestion ] = React.useState(false);
  const answersRef = React.useRef<any>(null);
  const tipsRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (!question) {
      const tipsElement = document.getElementById("tips");
      tipsRef.current = tipsElement;
    }
    if (question) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [question])

  const onTipsClick = () => {
    setQuestion(true);
  }

  const rejectTips = () => {
    setQuestion(false);
    setQuestion(false);
  }

  const changeTipState = () => {
    dispatch(setTips(!tips));
    setQuestion(false);
  }

  const handleClickOutside = (event: any) => {
    if (
        answersRef.current &&
        !answersRef.current.contains(event.target) &&
        tipsRef.current &&
        !tipsRef.current.contains(event.target)
      ) {
        rejectTips();
    }
  }

  if (question) {
    return (
      <div className="tips__question" ref={answersRef}>
        <label>{`Turn ${tips ? "off" : "on"} tips?`}</label>
        <div className="tips__answers">
          <button onClick={changeTipState}>Yes</button>
          <button onClick={rejectTips}>No</button>
        </div>
      </div>
    )
  }

  return (
    <button
      id="tips"
      onClick={onTipsClick}
    >
      Tips
    </button>
  )
}
