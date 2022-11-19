import dayjs from 'dayjs';

type Summary = {
  points: number;
  startDate: Date /*, termStrength: number */;
};

type ItemIndex =
  | { type: 'story'; index: number; summaryIndex: number }
  | { type: 'summary'; index: number };
type Story = { points?: number | null };

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
    let iterationTotalPoints = totalPoints();
    const indices: ItemIndex[] = [{ type: 'summary', index: 0 }];
    stories.forEach((story, index) => {
      indices.push({
        type: 'story',
        index,
        summaryIndex: indices.filter(it => it.type === 'summary').length - 1,
      });

      const storyPoints = story.points ?? 0;
      if (storyPoints > currentVelocity) {
        iterationTotalPoints.plus(storyPoints);
        summaries.push(storyPoints);
        indices.push({ type: 'summary', index: summaries.getNextIndex() });
        iterationTotalPoints.minus(currentVelocity);

        while (iterationTotalPoints.shouldSummarize(currentVelocity)) {
          summaries.push(0);
          indices.push({ type: 'summary', index: summaries.getNextIndex() });
          iterationTotalPoints.minus(currentVelocity);
        }
      } else {
        iterationTotalPoints.plus(storyPoints);
        if (iterationTotalPoints.shouldSummarize(currentVelocity)) {
          summaries.push(iterationTotalPoints.value);
          indices.push({ type: 'summary', index: summaries.getNextIndex() });
          iterationTotalPoints.minus(currentVelocity);
        }
      }
    });
    summaries.push(iterationTotalPoints.capacity);
    return indices;
  })();

  // console.log({ summaries: summaries.getItems(), itemIndices });
  return {
    summaries: summaries.getItems(),
    itemIndices,
  };
}

/**
 * PRIVATE
 */

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
    getItems(): Summary[] {
      return summaries;
    },
    getNextIndex(): number {
      return summaries.length;
    },
  };
}

function totalPoints() {
  let _storyPoints = 0;
  let _iterationPoints = 0;
  return {
    get value(): number {
      return _storyPoints;
    },
    get capacity(): number {
      return _iterationPoints;
    },
    plus(point: number): void {
      _storyPoints += point;
      _iterationPoints += point;
    },
    minus(point: number): void {
      _storyPoints = 0;
      _iterationPoints -= point;
      if (_iterationPoints < 0) _iterationPoints = 0;
    },
    shouldSummarize(velocity: number): boolean {
      return _iterationPoints >= velocity;
    },
  };
}
