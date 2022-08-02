import { FC, Fragment } from 'react';
import { ProjectBoard_StoryFragment } from '~/graphql/generated/graphql';
import { SummaryOfPeriod } from '../SummaryOfPeriod';

type Summary = {
  points: number;
  startDate: Date /*, termStrength: number */;
};

type ComponentParam = { type: 'story' | 'summary'; index: number };

export const AggregationContainer: FC<{
  currentVelocity: number;
  startDate: Date;
  iterationLengthInWeek?: number;
  stories: ProjectBoard_StoryFragment[];
  renderStoryItem(
    story: ProjectBoard_StoryFragment,
    index: number
  ): JSX.Element;
}> = ({ currentVelocity, stories, renderStoryItem, startDate }) => {
  const summaries: Summary[] = [];
  const componentParams: ComponentParam[] = (() => {
    let summariesIndex = 0;
    let totalPoints = 0;
    const params: ComponentParam[] = [
      { type: 'summary', index: summariesIndex },
    ];
    stories.forEach((story, index) => {
      totalPoints += story.points ?? 0;
      params.push({ type: 'story', index });
      if (totalPoints > currentVelocity) {
        summaries.push({
          points: totalPoints,
          startDate: new Date('2022-02-02'),
        });
        summariesIndex++;
        params.push({ type: 'summary', index: summariesIndex });
        totalPoints = 0;
      }
    });
    summaries.push({
      points: totalPoints,
      startDate: new Date('2022-02-02'),
    });
    return params;
  })();
  return (
    <>
      {componentParams.map((param, i) => (
        <Fragment key={i}>
          {param.type === 'story' &&
            renderStoryItem(stories[param.index], param.index)}
          {param.type === 'summary' && (
            <SummaryOfPeriod
              points={summaries[param.index]?.points}
              startDate={summaries[param.index]?.startDate}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};
