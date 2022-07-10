import { HStack, Icon, Text } from '@chakra-ui/react';
import { StoryCard, StoryCardHead } from '../story/StoryCard';
import { StoryCreateButton } from '../story/StoryCreateButton';
import { FC, ReactNode } from 'react';
// import NewStory from './components/NewStory/NewStory';
// import StoryItem from './components/StoryItem/StoryItem';
import { BsSpeedometer } from 'react-icons/bs';
import { useMovableStoryList, useNewStoryForm } from './hooks';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AggregationContainer } from './components/AggregationContainer';
import {
  ProjectBoardStoryFragment,
  useProjectBoardQuery,
} from './ProjectBoard.generated';
import { StoryPosition } from '~/graphql/generated/graphql';
import { filterOfPresence } from '~/shared/functions/filterOfPresence';

// const nextPriority = (stories: ProjectBoardStoryFragment[]): number => {
//   if (stories.length === 0) return 0;
//   return stories[0].orderPriority.priority + 1;
// };

const ActiveStoryCard: FC<{
  title: string;
  projectId: string;
  stories: ProjectBoardStoryFragment[];
  position: StoryPosition;
  headerChildren?: ReactNode;
}> = ({ title, position, projectId, stories, headerChildren }) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm();
  return (
    <Droppable droppableId={position as string}>
      {(provided, _snapshot) => {
        return (
          <StoryCard ref={provided.innerRef} {...provided.droppableProps}>
            <StoryCardHead title={title}>
              {headerChildren}
              {/* <StoryCreateButton onClick={openForm} /> */}
            </StoryCardHead>
            {/* {formOpened && (
              <NewStory
                destination={{
                  position,
                  priority: nextPriority(stories),
                }}
                projectId={projectId}
                onCancel={closeForm}
                onComplete={closeForm}
              />
            )} */}
            {/* <AggregationContainer
              currentVelocity={10}
              startDate={new Date()}
              stories={stories}
              renderStoryItem={(story, index) => (
                <Draggable key={story.id} draggableId={story.id} index={index}>
                  {(provided, _snapshot) => (
                    <StoryItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      story={story}
                    />
                  )}
                </Draggable>
              )}
            /> */}
            {provided.placeholder}
          </StoryCard>
        );
      }}
    </Droppable>
  );
};

const Card: FC<{
  title: string;
  stories: ProjectBoardStoryFragment[];
  position: StoryPosition;
  headerChildren?: ReactNode;
}> = ({ title, position, stories, headerChildren }) => {
  return (
    <Droppable droppableId={position as string}>
      {(provided, _snapshot) => {
        return (
          <StoryCard ref={provided.innerRef} {...provided.droppableProps}>
            <StoryCardHead title={title}>{headerChildren}</StoryCardHead>

            {/* {stories.map((story, index) => (
              <Draggable key={story.id} draggableId={story.id} index={index}>
                {(provided, _snapshot) => (
                  <StoryItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    story={story}
                  />
                )}
              </Draggable>
            ))} */}
            {provided.placeholder}
          </StoryCard>
        );
      }}
    </Droppable>
  );
};

const PresentationProjectBoard: FC<{
  projectId: string;
  currentVelocity: number;
  stories: ProjectBoardStoryFragment[];
}> = ({ projectId, currentVelocity, stories }) => {
  const { currentStories, backlogStories, iceboxStories, handleDragEnd } =
    useMovableStoryList(stories);
  return (
    <HStack align="stretch" h="calc(100vh - 5rem)">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Card title="Done" position={StoryPosition.Done} stories={[]} />
        <ActiveStoryCard
          title="Current Iteration"
          position={StoryPosition.Current}
          projectId={projectId}
          stories={currentStories}
          headerChildren={
            <>
              <Icon as={BsSpeedometer} color="white" />
              <Text color="white"> {currentVelocity}</Text>
            </>
          }
        />
        <ActiveStoryCard
          title="Backlog"
          position={StoryPosition.Backlog}
          projectId={projectId}
          stories={backlogStories}
        />
        <Card
          title="Icebox"
          position={StoryPosition.Icebox}
          stories={iceboxStories}
        />
      </DragDropContext>
    </HStack>
  );
};

export const ProjectBoard: FC<{
  projectId: string;
}> = ({ projectId }) => {
  const [result] = useProjectBoardQuery({
    variables: {
      projectId,
    },
  });

  const stories = filterOfPresence(
    result.data?.viewer?.project?.stories.edges?.map((edge) => edge?.node) ?? []
  );
  const project = result.data?.viewer?.project;

  if (result.fetching) return <></>;
  if (result.error) return <></>;
  if (project == null) return <></>;

  return (
    <PresentationProjectBoard
      projectId={projectId}
      currentVelocity={project.currentVelocity}
      stories={stories}
    />
  );
};
