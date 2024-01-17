import { AppDispatch, RootState } from "..";
import { BLACK, WHITE } from "../../helpers/constants";
import { MemorizedChecker } from "../../types";
import { generalActions } from "../reducers/GeneralSlice";

export const makeStep = (coordinate: string) => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const { whiteCheckers, blackCheckers, memorizedChecker } = getState().generalReducer;

  if (memorizedChecker) {
    const type = memorizedChecker.type;
    const newCheckers = type === BLACK ? [...blackCheckers] : [...whiteCheckers];
    const indexToRemove = newCheckers.indexOf(memorizedChecker.coordinate);

    if (indexToRemove !== -1) {
      newCheckers.splice(indexToRemove, 1);
    }
    dispatch(memorizeChecker({ coordinate, type }));
    dispatch(
      type === BLACK
        ? blackStep([...newCheckers, coordinate])
        : whiteStep([...newCheckers, coordinate])
    );
  }
}

export const memorizeChecker = (memorizedChecker: MemorizedChecker | null) => 
  generalActions.memorizeChecker(memorizedChecker);

export const setTurn = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const whoseTurn = getState().generalReducer.whoseTurn;
  dispatch(generalActions.setTurn(whoseTurn === BLACK ? WHITE : BLACK)); 
}

export const whiteStep = (checkers: string[]) => generalActions.makeWhiteStep(checkers);
export const blackStep = (checkers: string[]) => generalActions.makeBlackStep(checkers);