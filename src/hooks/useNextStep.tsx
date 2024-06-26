import React from 'react'
import { useAppSelector } from './redux';
import { findPossibleSteps, CoordinateObj } from '../helpers/FindPossibleSteps';

export const useNextStep = () => {
  const [nextSteps, setNextSteps] = React.useState<any[]>([]);

  const { savedStep, whoseTurn } = useAppSelector(state => state.generalReducer);

  React.useEffect(() => {
    if (!savedStep) {
      setNextSteps([]);
    }
    if (savedStep) {
      const foundFirstStep = findPossibleSteps(savedStep);
      setNextSteps([ ...foundFirstStep ]);
    }
    if (savedStep && !!nextSteps?.length) {
      checkFoundSteps(nextSteps);
    }
    // eslint-disable-next-line
  }, [savedStep, whoseTurn, nextSteps?.length]);

  const checkFoundSteps = (steps: any[]) => {
    const allSteps = steps.map((el: CoordinateObj | string) => {
      if (typeof el === "string") {
        return el;
      }
      return findPossibleSteps(el, false);
    })?.flat();

    // @ts-ignore
    const result = [...new Set([...steps, ...allSteps])];
  
    const uniqueResult = result.filter((value, index, self) => {
      if (typeof value === 'object') {
        return index === self.findIndex(obj => obj.coordinate === value.coordinate && obj.jumped === value.jumped);
      }
      return self.indexOf(value) === index;
    });

    setNextSteps(uniqueResult);
  };

  return { nextSteps: nextSteps?.map(el => !!el.coordinate ? el.coordinate : el) }
}
