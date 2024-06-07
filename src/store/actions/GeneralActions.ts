import { AppDispatch, RootState } from "..";
import { BLACK, WHITE } from "../../helpers/constants";
import { MemorizedChecker } from "../../types";
import { generalActions } from "../reducers/GeneralSlice";

export const makeStep = (coordinate: string) => (dispatch: AppDispatch, getState: () => RootState) => {
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
} // good

export const cancelStep = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { savedCheckers, whoseTurn } = getState().generalReducer;
  if (!!savedCheckers.length) {
    dispatch(
      whoseTurn === BLACK
        ? generalActions.makeBlackStep(savedCheckers)
        : generalActions.makeWhiteStep(savedCheckers)
    );
    dispatch(saveFirstStep(null));
    dispatch(memorizeChecker(null));
    dispatch(generalActions.saveCheckers([]));
  }
}; // good

export const cancelStepButton = () => (dispatch: AppDispatch, getState: () => RootState) => {
  const { savedCheckers, whoseTurn } = getState().generalReducer;
  if (!!savedCheckers.length) {
    dispatch(
      whoseTurn === WHITE
        ? generalActions.makeBlackStep(savedCheckers)
        : generalActions.makeWhiteStep(savedCheckers)
    );
    dispatch(setTurn());
    dispatch(generalActions.saveCheckers([]));
  }
} // good

export const saveFirstStep = (coordinate: string | null) => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const { blackCheckers, whiteCheckers, whoseTurn } = getState().generalReducer;
  if (!coordinate) {
    dispatch(generalActions.saveFirstStep(null));
    dispatch(generalActions.memorizeChecker(null));
    return;
  }
  dispatch(generalActions.saveFirstStep(coordinate));
  dispatch(generalActions.saveCheckers(whoseTurn === BLACK ? blackCheckers : whiteCheckers));
} // good

export const memorizeChecker = (memorizedChecker: MemorizedChecker | null) => 
  generalActions.memorizeChecker(memorizedChecker); // good

export const setTurn = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const { whoseTurn, whiteCheckers, blackCheckers, victory } = getState().generalReducer;
  if (victory) {
    return;
  }

  localStorage.setItem("whiteCheckers", whiteCheckers.toString());
  localStorage.setItem("blackCheckers", blackCheckers.toString());
  localStorage.setItem("whoseTurn", whoseTurn === BLACK ? WHITE : BLACK);

  dispatch(generalActions.setTurn(whoseTurn === BLACK ? WHITE : BLACK));
} // good

export const reloadApp = (data: any) => generalActions.reloadApp(data); // good
export const rotateBoard = () => generalActions.rotateBoard(); // good

export const resetApp = () => {
  localStorage.clear();
  return generalActions.resetApp()
}; // good

export const setTips = (state: boolean) => {
  localStorage.setItem("tips", state.toString());
  return generalActions.setTips(state)
}; // good

export const setVictory = (who: string) => {
  localStorage.setItem("victory", who);
  return generalActions.setVictory(who);
} // good 