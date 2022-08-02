import { useState } from 'react';

export const useIterationSchedules = (iterationLengthInWeeks: number) => {
  const [currentIterationStartDate] = useState();

  return {
    currentIterationStartDate,
  };
};
