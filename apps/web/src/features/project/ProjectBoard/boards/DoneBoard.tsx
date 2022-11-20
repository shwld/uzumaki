import { CheckIcon } from '@chakra-ui/icons';
import { Box, IconButton } from '@chakra-ui/react';
import { ProjectBoardStatusFunctions } from 'core-domain';
import { FC, Fragment, useMemo, useState } from 'react';
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
  const [closed, setClosed] = useState(false);

  if (closed) {
    return (
      <Box pt="2px">
        <IconButton
          as={CheckIcon}
          size="sm"
          ml="2"
          colorScheme="blue"
          aria-label="Done"
          cursor="pointer"
          onClick={() => setClosed(false)}
        />
      </Box>
    );
  }

  return (
    <StoryCard reverse>
      <StoryCardHead title="Done" onCloseClick={() => setClosed(true)} />
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
