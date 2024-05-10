import React from 'react'
import { useAppSelector } from './redux';
import { findPossibleSteps } from '../helpers/FindPossibleSteps';

export const useNextStep = () => {
  const [nextSteps, setNextSteps] = React.useState<string[]>([]);

  const { savedStep, memorizedChecker, whoseTurn } = useAppSelector(state => state.generalReducer);

  React.useEffect(() => {
    if (!savedStep) {
      setNextSteps([]);
    }
    if (savedStep) {
      const foundFirstStep = findPossibleSteps(savedStep);
      setNextSteps([...foundFirstStep]);
    }
  }, [savedStep, whoseTurn]);

  React.useEffect(() => {
    if (memorizedChecker && !!nextSteps?.length) {
      const foundNextSteps = findPossibleSteps(memorizedChecker.coordinate, false);
      setNextSteps([...foundNextSteps]);
    }
  }, [memorizedChecker]);

  return nextSteps;
}
