import React from "react"
import "./Cell.scss"
import { Checker } from "../Checker/Checker"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import {
  cancelStep,
  makeStep,
  memorizeChecker,
  saveFirstStep,
  setTurn
} from "../../store/actions/GeneralActions"
import { useNextStep } from "../../hooks/useNextStep"
import { BLACK, WHITE } from "../../helpers/constants"
import classNames from "classnames";

type CellProps = {
  type: string,
  coordinate: string,
}

export const Cell: React.FC<CellProps> = ({type, coordinate}) => {
  const dispatch = useAppDispatch();
  const {
    whiteCheckers,
    blackCheckers,
    savedStep,
    memorizedChecker,
    tips
  } = useAppSelector(state => state.generalReducer);

  const { nextSteps } = useNextStep();

  const checkIfFilling = (): string => {
    const checkWhiteFilling = whiteCheckers.find((checker) => checker === coordinate);
    const checkBlackFilling = blackCheckers.find((checker) => checker === coordinate);

    if (!!checkWhiteFilling) {
      return WHITE;
    }
    if (!!checkBlackFilling) {
      return BLACK;
    }
  
    return "";
  }

  const finishStep = () => {
    if (memorizedChecker?.coordinate !== savedStep) {
      dispatch(setTurn());
    }
    dispatch(saveFirstStep(null));
    dispatch(memorizeChecker(null));
  }

  const handleClick = () => {
    if (coordinate === memorizedChecker?.coordinate) {
      finishStep();
    }
    if (coordinate === savedStep) {
      dispatch(cancelStep());
    }
    if (nextSteps.includes(coordinate)) {
      dispatch(makeStep(coordinate));
    }
  }

  return (
    <div className={classNames(`cell__${type}`, {
        "cell_red_border": !!nextSteps.includes(coordinate) && tips
      })}
      onClick={handleClick}
      style={{cursor: !checkIfFilling() ? "pointer" : ""}}
    >
      {checkIfFilling() && (
        <Checker coordinate={coordinate} type={checkIfFilling()}/>
      )}
    </div>
  )
}
