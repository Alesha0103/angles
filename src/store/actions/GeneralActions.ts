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
    dispatch(memorizeChecker({ type, coordinate }));
    dispatch(
      type === BLACK
        ? generalActions.makeBlackStep([...newCheckers, coordinate])
        : generalActions.makeWhiteStep([...newCheckers, coordinate])
    );
  }
}

export const cancelStep = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const { savedCheckers, whoseTurn } = getState().generalReducer;

  if (!!savedCheckers.length) {
    dispatch(
      whoseTurn === BLACK
        ? generalActions.makeBlackStep(savedCheckers)
        : generalActions.makeWhiteStep(savedCheckers)
    );
    dispatch(saveFirstStep(null));
    dispatch(memorizeChecker(null));
  }
}

export const saveFirstStep = (coordinate: string | null) => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const { blackCheckers, whiteCheckers, whoseTurn } = getState().generalReducer;
  if (!coordinate) {
    dispatch(generalActions.saveFirstStep(null));
    dispatch(generalActions.memorizeChecker(null));
    dispatch(generalActions.saveCheckers([]));
    return;
  }
  dispatch(generalActions.saveFirstStep(coordinate));
  dispatch(generalActions.saveCheckers(whoseTurn === BLACK ? blackCheckers : whiteCheckers));
}

export const memorizeChecker = (memorizedChecker: MemorizedChecker | null) => 
  generalActions.memorizeChecker(memorizedChecker);

export const setTurn = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const whoseTurn = getState().generalReducer.whoseTurn;
  dispatch(generalActions.setTurn(whoseTurn === BLACK ? WHITE : BLACK)); 
}