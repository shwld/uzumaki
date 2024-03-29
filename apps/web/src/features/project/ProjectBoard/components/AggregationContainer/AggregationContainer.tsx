import { FC, Fragment } from 'react';
import { SummaryOfPeriod } from '../SummaryOfPeriod';
import { ProjectBoardStatusFunctions } from 'core-domain';
import { ProjectBoard_StoryFragment } from '../../ProjectBoard.generated';

export const AggregationContainer: FC<{
  currentVelocity: number;
  startDate: Date;
  iterationLengthInWeek?: number;
  stories: ProjectBoard_StoryFragment[];
  renderStoryItem(
    story: ProjectBoard_StoryFragment,
    index: number,
    iterationStartDate: Date
  ): JSX.Element;
}> = ({
  currentVelocity,
  stories,
  renderStoryItem,
  iterationLengthInWeek = 1,
  startDate,
}) => {
  const { itemIndices, summaries } =
    ProjectBoardStatusFunctions.estimateIterations(stories, {
      currentVelocity,
      iterationLength: iterationLengthInWeek ?? 1,
      startDate,
    });
  // console.log({ itemIndices, summaries });
  return (
    <>
      {itemIndices.map((param, i) => (
        <Fragment key={i}>
          {param.type === 'story' &&
            renderStoryItem(
              stories[param.index],
              param.index,
              summaries[param.summaryIndex]?.startDate
            )}
          {param.type === 'summary' && (
            <SummaryOfPeriod
              points={summaries[param.index]?.points}
              startDate={summaries[param.index]?.startDate}
              iterationLength={iterationLengthInWeek}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};
