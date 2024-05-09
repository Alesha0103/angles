import React from 'react'
import './Cell.scss'
import { Checker } from '../Checker/Checker'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  cancelStep,
  makeStep
} from '../../store/actions/GeneralActions'
import { useNextStep } from '../../hooks/useNextStep'

type CellProps = {
  type: string,
  coordinate: string,
}
export const Cell: React.FC<CellProps> = ({type, coordinate}) => {
  const dispatch = useAppDispatch();
  const { whiteCheckers, blackCheckers, savedStep, memorizedChecker } = useAppSelector(state => state.generalReducer);

  const nextSteps = useNextStep();

  const checkIfFilling =
    !!whiteCheckers.find((checker) => checker === coordinate) ||
    !!blackCheckers.find((checker) => checker === coordinate);

  const handleClick = () => {
    if (savedStep === coordinate) {
      dispatch(cancelStep());
      return;
    }
    if(
      !checkIfFilling &&
      nextSteps.includes(coordinate)
    ) {
      dispatch(makeStep(coordinate));
      return;
    }
  }

  return (
    <div className={`cell__${type}`}
      onClick={handleClick}
      style={{cursor: !checkIfFilling ? "pointer" : ""}}
    >
      <Checker coordinate={coordinate}/>
    </div>
  )
}
