import { Icon, Text } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BsSpeedometer } from 'react-icons/bs';
import { StoryPosition } from '~/graphql/generated/graphql';
import { StoryCard, StoryCardHead } from '../components/StoryCard';
import { StoryCreateButton } from '../components/StoryCreateButton';
import { StoryCreateForm } from '../components/StoryCreateForm';
import { StoryItem } from '../components/StoryItem';
import { SummaryOfPeriod } from '../components/SummaryOfPeriod';
import { nextPriority } from '../functions/nextPriority';
import { useNewStoryForm } from '../hooks/useNewStoryForm';
import { ProjectBoard_StoryFragment } from '../ProjectBoard.generated';

const sum = (prev: number, next: number) => prev + next;

export const CurrentBoard: FC<{
  projectId: string;
  currentVelocity: number;
  stories: ProjectBoard_StoryFragment[];
}> = ({ projectId, currentVelocity, stories }) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm();
  const totalPoints = useMemo(
    () => stories.map(it => it.points ?? 0).reduce(sum, 0),
    [stories]
  );
  return (
    <Droppable droppableId={StoryPosition.Current}>
      {(provided, _snapshot) => {
        return (
          <StoryCard ref={provided.innerRef} {...provided.droppableProps}>
            <StoryCardHead title="Current Iteration">
              <Icon as={BsSpeedometer} color="white" />
              <Text color="white"> {currentVelocity}</Text>
              <StoryCreateButton onClick={openForm} />
            </StoryCardHead>
            {formOpened && (
              <StoryCreateForm
                destination={{
                  position: StoryPosition.Current,
                  priority: nextPriority(stories),
                }}
                projectId={projectId}
                onCancel={closeForm}
                onComplete={closeForm}
              />
            )}
            <SummaryOfPeriod
              points={totalPoints}
              startDate={new Date('2022-02-02')}
            />
            {stories.map((story, index) => (
              <Draggable key={story.id} draggableId={story.id} index={index}>
                {(provided, _snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <StoryItem story={story} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </StoryCard>
        );
      }}
    </Droppable>
  );
};