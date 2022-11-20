import { FC, useMemo, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { StoryPosition } from '~/graphql/generated/graphql';
import { AggregationContainer } from '../components/AggregationContainer';
import { StoryCard, StoryCardHead } from '../components/StoryCard';
import { StoryCreateButton } from '../components/StoryCreateButton';
import { StoryCreateForm } from '../components/StoryCreateForm';
import { StoryItem } from '../components/StoryItem';
import { nextPriority } from '../functions/nextPriority';
import { useNewStoryForm } from '../hooks/useNewStoryForm';
import { ProjectBoard_StoryFragment } from '../ProjectBoard.generated';
import dayjs from 'dayjs';
import { Box, IconButton } from '@chakra-ui/react';
import { IoIosNotifications } from 'react-icons/io';

export const BacklogBoard: FC<{
  projectId: string;
  currentVelocity: number;
  iterationLengthInWeek: number;
  currentIterationStartDate: Date;
  stories: ProjectBoard_StoryFragment[];
}> = ({
  projectId,
  currentVelocity,
  iterationLengthInWeek,
  currentIterationStartDate,
  stories,
}) => {
  const iterationStartDate = useMemo(
    () =>
      dayjs(currentIterationStartDate)
        .add(iterationLengthInWeek, 'weeks')
        .toDate(),
    [currentIterationStartDate, iterationLengthInWeek]
  );
  const { formOpened, openForm, closeForm } = useNewStoryForm();
  const [closed, setClosed] = useState(false);

  if (closed) {
    return (
      <Box pt="2px">
        <IconButton
          as={IoIosNotifications}
          size="sm"
          ml="2"
          colorScheme="blue"
          aria-label="Backlog"
          cursor="pointer"
          onClick={() => setClosed(false)}
        />
      </Box>
    );
  }

  return (
    <Droppable droppableId={StoryPosition.Backlog}>
      {(provided, _snapshot) => {
        return (
          <StoryCard ref={provided.innerRef} {...provided.droppableProps}>
            <StoryCardHead title="Backlog" onCloseClick={() => setClosed(true)}>
              <StoryCreateButton onClick={openForm} />
            </StoryCardHead>
            {formOpened && (
              <StoryCreateForm
                destination={{
                  position: StoryPosition.Backlog,
                  priority: nextPriority(stories),
                }}
                projectId={projectId}
                onCancel={closeForm}
                onComplete={closeForm}
              />
            )}
            <AggregationContainer
              currentVelocity={currentVelocity}
              startDate={iterationStartDate}
              stories={stories}
              iterationLengthInWeek={iterationLengthInWeek}
              renderStoryItem={(story, index, iterationStartDate) => (
                <Draggable key={story.id} draggableId={story.id} index={index}>
                  {(provided, _snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <StoryItem
                        story={story}
                        iterationStartDate={iterationStartDate}
                      />
                    </div>
                  )}
                </Draggable>
              )}
            />
            {provided.placeholder}
          </StoryCard>
        );
      }}
    </Droppable>
  );
};
