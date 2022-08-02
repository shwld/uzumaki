import { Icon, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BsSpeedometer } from 'react-icons/bs';
import { StoryPosition } from '~/graphql/generated/graphql';
import { AggregationContainer } from '../components/AggregationContainer';
import { StoryCard, StoryCardHead } from '../components/StoryCard';
import { StoryCreateButton } from '../components/StoryCreateButton';
import { StoryCreateForm } from '../components/StoryCreateForm';
import { StoryItem } from '../components/StoryItem';
import { nextPriority } from '../functions/nextPriority';
import { useNewStoryForm } from '../hooks';
import { ProjectBoard_StoryFragment } from '../ProjectBoard.generated';

export const CurrentBoard: FC<{
  projectId: string;
  currentVelocity: number;
  stories: ProjectBoard_StoryFragment[];
}> = ({ projectId, currentVelocity, stories }) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm();
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
            <AggregationContainer
              currentVelocity={currentVelocity}
              startDate={new Date()}
              stories={stories}
              renderStoryItem={(story, index) => (
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
              )}
            />
            {provided.placeholder}
          </StoryCard>
        );
      }}
    </Droppable>
  );
};
