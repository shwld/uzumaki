import dayjs from 'dayjs';

type Summary = {
  points: number;
  startDate: Date /*, termStrength: number */;
};

type ItemIndex = { type: 'story' | 'summary'; index: number };
type Story = { points?: number };

function nextIterationStartDate(date: Date, iterationLength: number): Date {
  return dayjs(date).add(iterationLength, 'weeks').toDate();
}

function summaryItems(startDate: Date, iterationLength: number) {
  let iterationStartDate = startDate;
  const summaries: Summary[] = [];
  return {
    push(points: number) {
      summaries.push({
        points,
        startDate: iterationStartDate,
      });
      iterationStartDate = nextIterationStartDate(
        iterationStartDate,
        iterationLength
      );
    },
    getItems() {
      return summaries;
    },
    getNextIndex() {
      return summaries.length;
    },
  };
}

export function estimateIterations(
  stories: Story[],
  {
    currentVelocity,
    iterationLength,
    startDate,
  }: {
    currentVelocity: number;
    iterationLength: number;
    startDate: Date;
  }
): {
  summaries: Summary[];
  itemIndices: ItemIndex[];
} {
  const summaries = summaryItems(startDate, iterationLength);
  const itemIndices: ItemIndex[] = (() => {
    let iterationTotalPoints = 0;
    const indices: ItemIndex[] = [{ type: 'summary', index: 0 }];
    stories.forEach((story, index) => {
      indices.push({ type: 'story', index });

      const storyPoints = story.points ?? 0;
      if (storyPoints > currentVelocity) {
        iterationTotalPoints += storyPoints;
        summaries.push(storyPoints);
        indices.push({ type: 'summary', index: summaries.getNextIndex() });
        iterationTotalPoints -= currentVelocity;

        while (iterationTotalPoints >= currentVelocity) {
          summaries.push(0);
          indices.push({ type: 'summary', index: summaries.getNextIndex() });
          iterationTotalPoints -= currentVelocity;
        }
      } else {
        iterationTotalPoints += storyPoints;
        if (iterationTotalPoints >= currentVelocity) {
          summaries.push(iterationTotalPoints);
          indices.push({ type: 'summary', index: summaries.getNextIndex() });
          iterationTotalPoints -= currentVelocity;
        }
      }

      if (iterationTotalPoints < 0) iterationTotalPoints = 0;
    });
    summaries.push(iterationTotalPoints);
    return indices;
  })();

  console.log({ summaries: summaries.getItems(), itemIndices });
  return {
    summaries: summaries.getItems(),
    itemIndices,
  };
}
