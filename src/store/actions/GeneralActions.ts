import { AppDispatch, RootState } from "..";
import { BLACK, WHITE } from "../../helpers/constants";
import { MemorizedChecker } from "../../types";
import { generalActions } from "../reducers/GeneralSlice";

export const makeStep = (coordinate: string) => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const { whiteCheckers, blackCheckers, memorizedChecker } = getState().generalReducer;
  if (memorizedChecker && memorizedChecker.type === BLACK) {
    const indexToRemove = blackCheckers.indexOf(memorizedChecker.coordinate);
    // const newCheckers = [...blackCheckers.splice(indexToRemove, 1)];
    // console.log('newCheckers :>> ', newCheckers);
    // dispatch(blackStep(newCheckers));
  }
  // if (memorizedChecker && memorizedChecker.type === WHITE) {
  //   const indexToRemove = whiteCheckers.indexOf(memorizedChecker.coordinate);
  //   const newCheckers = [...whiteCheckers.slice(1, indexToRemove), coordinate];
  //   dispatch(whiteStep(newCheckers));
  // }
  dispatch(memorizeChecker(null));
}

export const memorizeChecker = (memorizedChecker: MemorizedChecker | null) => 
  generalActions.memorizeChecker(memorizedChecker);

export const whiteStep = (checkers: string[]) => generalActions.makeWhiteStep(checkers);
export const blackStep = (checkers: string[]) => generalActions.makeBlackStep(checkers);