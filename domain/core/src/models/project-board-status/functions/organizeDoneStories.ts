import dayjs from 'dayjs';

type Story = { id: string; points?: number; completedAt?: string };

type Summary = {
  points: number;
  startDate: Date /*, termStrength: number */;
};

type ItemIndex = { type: 'story' | 'summary'; index: number };

export function organizeDoneStories<T extends Story>(
  stories: T[],
  {
    iterationLength,
    currentIterationStartDate,
  }: {
    iterationLength: number;
    currentIterationStartDate: Date;
  }
): {
  summaries: Summary[];
  itemIndices: ItemIndex[];
} {
  const summaries = summaryItems(currentIterationStartDate, iterationLength);
  const indices: ItemIndex[] = [];
  let iterationTotalPoints = 0;
  stories
    .filter(it => it.completedAt != null)
    .forEach((story, index) => {
      const storyPoints = story.points ?? 0;
      iterationTotalPoints += storyPoints;
      if (new Date(story.completedAt!) < summaries.getIterationStartDate()) {
        summaries.push(iterationTotalPoints);
        indices.push({ type: 'summary', index: summaries.getNextIndex() });
        iterationTotalPoints = 0;
      }
      indices.push({ type: 'story', index });
    });
  summaries.push(iterationTotalPoints);
  indices.push({ type: 'summary', index: summaries.getNextIndex() });
  return {
    summaries: summaries.getItems(),
    itemIndices: indices.reverse(),
  };
}

/**
 * PRIVATE
 */
function previousIterationStartDate(date: Date, iterationLength: number): Date {
  return dayjs(date).subtract(iterationLength, 'weeks').toDate();
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
      iterationStartDate = previousIterationStartDate(
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
    getIterationStartDate() {
      return iterationStartDate;
    },
  };
}
