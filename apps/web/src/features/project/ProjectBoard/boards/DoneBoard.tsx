import { ProjectBoardStatusFunctions } from 'core-domain';
import { FC, Fragment, useMemo } from 'react';
import { StoryCard, StoryCardHead } from '../components/StoryCard';
import { StoryItem } from '../components/StoryItem';
import { SummaryOfPeriod } from '../components/SummaryOfPeriod';
import { ProjectBoard_StoryFragment } from '../ProjectBoard.generated';

export const DoneBoard: FC<{
  stories: ProjectBoard_StoryFragment[];
  iterationLength: number;
  currentIterationStartDate: Date;
}> = ({ stories, iterationLength, currentIterationStartDate }) => {
  const { itemIndices, summaries } = useMemo(
    () =>
      ProjectBoardStatusFunctions.organizeDoneStories(stories, {
        iterationLength,
        currentIterationStartDate,
      }),
    [currentIterationStartDate, iterationLength, stories]
  );
  return (
    <StoryCard reverse>
      <StoryCardHead title="Done" />
      {itemIndices.map((param, i) => (
        <Fragment key={i}>
          {param.type === 'story' && (
            <StoryItem
              key={stories[param.index].id}
              story={stories[param.index]}
            />
          )}
          {param.type === 'summary' && (
            <SummaryOfPeriod
              points={summaries[param.index]?.points}
              startDate={summaries[param.index]?.startDate}
              iterationLength={iterationLength}
            />
          )}
        </Fragment>
      ))}
    </StoryCard>
  );
};
