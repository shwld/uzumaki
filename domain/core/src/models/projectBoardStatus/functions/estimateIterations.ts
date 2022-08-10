import dayjs from 'dayjs';

type Summary = {
  points: number;
  startDate: Date /*, termStrength: number */;
};

type ComponentParam = { type: 'story' | 'summary'; index: number };
type Story = { points?: number };

function nextIterationStartDate(date: Date, iterationLength: number): Date {
  return dayjs(date).add(iterationLength, 'weeks').toDate();
}

export function estimateIterations(
  stories: Story[],
  parameters: {
    currentVelocity: number;
    iterationLength: number;
    startDate: Date;
  }
): {
  summaries: Summary[];
  componentParams: ComponentParam[];
} {
  const summaries: Summary[] = [];
  const componentParams: ComponentParam[] = (() => {
    let summariesIndex = 0;
    let totalPoints = 0;
    let iterationStartDate = parameters.startDate;
    const params: ComponentParam[] = [
      { type: 'summary', index: summariesIndex },
    ];
    stories.forEach((story, index) => {
      const iterationPoints = story.points ?? 0;

      params.push({ type: 'story', index });
      if (totalPoints + iterationPoints >= parameters.currentVelocity) {
        totalPoints += iterationPoints;
        summaries.push({
          points: totalPoints,
          startDate: iterationStartDate,
        });
        summariesIndex++;
        params.push({ type: 'summary', index: summariesIndex });
        totalPoints -= parameters.currentVelocity;
        while (totalPoints >= parameters.currentVelocity) {
          iterationStartDate = nextIterationStartDate(
            iterationStartDate,
            parameters.iterationLength
          );

          summaries.push({
            points: 0,
            startDate: iterationStartDate,
          });
          summariesIndex++;
          params.push({ type: 'summary', index: summariesIndex });
          totalPoints -= parameters.currentVelocity;
        }
        iterationStartDate = nextIterationStartDate(
          iterationStartDate,
          parameters.iterationLength
        );

        if (totalPoints < 0) totalPoints = 0;
      } else {
        totalPoints += iterationPoints;
      }
    });
    summaries.push({
      points: totalPoints,
      startDate: iterationStartDate,
    });
    return params;
  })();

  return {
    summaries,
    componentParams,
  };
}
