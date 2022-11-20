import { Box, IconButton } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { StoryPosition } from '~/graphql/generated/graphql';
import { StoryCard, StoryCardHead } from '../components/StoryCard';
import { StoryCreateButton } from '../components/StoryCreateButton';
import { StoryCreateForm } from '../components/StoryCreateForm';
import { StoryItem } from '../components/StoryItem';
import { nextPriority } from '../functions/nextPriority';
import { useNewStoryForm } from '../hooks/useNewStoryForm';
import { ProjectBoard_StoryFragment } from '../ProjectBoard.generated';
import { IoIosListBox } from 'react-icons/io';

export const IceboxBoard: FC<{
  projectId: string;
  stories: ProjectBoard_StoryFragment[];
}> = ({ projectId, stories }) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm();

  const [closed, setClosed] = useState(false);

  if (closed) {
    return (
      <Box pt="2px">
        <IconButton
          as={IoIosListBox}
          size="sm"
          ml="2"
          colorScheme="blue"
          aria-label="Icebox"
          cursor="pointer"
          onClick={() => setClosed(false)}
        />
      </Box>
    );
  }

  return (
    <Droppable droppableId={StoryPosition.Icebox}>
      {(provided, _snapshot) => {
        return (
          <StoryCard ref={provided.innerRef} {...provided.droppableProps}>
            <StoryCardHead title="Icebox" onCloseClick={() => setClosed(true)}>
              <StoryCreateButton onClick={openForm} />
            </StoryCardHead>
            {formOpened && (
              <StoryCreateForm
                destination={{
                  position: StoryPosition.Icebox,
                  priority: nextPriority(stories),
                }}
                projectId={projectId}
                onCancel={closeForm}
                onComplete={closeForm}
              />
            )}
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
