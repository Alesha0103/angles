import React from 'react'
import './Cell.scss'
import { Checker } from '../Checker/Checker'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

type CellProps = {
  type: string,
  coordinate?: string,
}
export const Cell: React.FC<CellProps> = ({type, coordinate}) => {
  const dispatch = useAppDispatch();
  const [checkerColor, setCheckerColor] = React.useState("");
  const { whiteCheckers, blackCheckers } = useAppSelector(state => state.generalReducer);

  React.useEffect(() => {
    const blackChecker = blackCheckers.find(checker => checker === coordinate);
    const whiteChecker = whiteCheckers.find(checker => checker === coordinate);
    if (blackChecker) {
      setCheckerColor("#3c3200");
    }
    if (whiteChecker) {
      setCheckerColor("#fffaeb")
    }
  }, [whiteCheckers, blackCheckers])

  const handleClick = () => {
    console.log("coordinate ", coordinate)
  }

  return (
    <div className={`cell__${type}`} onClick={handleClick}>
      {checkerColor && (
        <Checker checkerColor={checkerColor}/>
      )}
    </div>
  )
}
