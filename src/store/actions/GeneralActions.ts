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

export const cancelStep = (stepBack?: boolean) => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const { savedCheckers, whoseTurn, memorizedChecker } = getState().generalReducer;

  console.log('stepBack :>> ', stepBack);

  if (stepBack) {
    console.log("cancel custom");
    dispatch(setTurn());
    dispatch(
      whoseTurn === WHITE
        ? generalActions.makeBlackStep(savedCheckers)
        : generalActions.makeWhiteStep(savedCheckers)
    );
    return;
  }

  if (!!savedCheckers.length) {
    console.log("cancel default");
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
    return;
  }
  dispatch(generalActions.saveFirstStep(coordinate));
  dispatch(generalActions.saveCheckers(whoseTurn === BLACK ? blackCheckers : whiteCheckers));
}

export const memorizeChecker = (memorizedChecker: MemorizedChecker | null) => 
  generalActions.memorizeChecker(memorizedChecker);

export const setTurn = () => (dispatch: AppDispatch, getState: ()=> RootState) => {
  const { whoseTurn, whiteCheckers, blackCheckers } = getState().generalReducer;

  // localStorage.setItem("whiteCheckers", whiteCheckers.toString());
  // localStorage.setItem("blackCheckers", blackCheckers.toString());
  // localStorage.setItem("whoseTurn", whoseTurn === BLACK ? WHITE : BLACK);

  dispatch(generalActions.setTurn(whoseTurn === BLACK ? WHITE : BLACK)); 
}

export const reloadApp = (data: any) => generalActions.reloadApp(data);