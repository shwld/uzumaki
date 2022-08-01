import { HStack, Icon, Text } from '@chakra-ui/react';
import { StoryCard, StoryCardHead } from './components/StoryCard';
import { StoryCreateButton } from './components/StoryCreateButton';
import { FC, ReactNode, useEffect, useState } from 'react';
import { BsSpeedometer } from 'react-icons/bs';
import { useMovableStoryList, useNewStoryForm } from './hooks';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { AggregationContainer } from './components/AggregationContainer';
import {
  ProjectBoard_StoryFragment,
  useProjectBoardQuery,
} from './ProjectBoard.generated';
import { StoryPosition } from '~/graphql/generated/graphql';
import { filterOfPresence } from '~/shared/functions/filterOfPresence';
import { StoryCreateForm } from './components/StoryCreateForm';
import { StoryItem } from './components/StoryItem';

const nextPriority = (stories: ProjectBoard_StoryFragment[]): number => {
  if (stories.length === 0) return 0;
  return stories[0].priority + 1;
};

const ActiveStoryCard: FC<{
  title: string;
  projectId: string;
  stories: ProjectBoard_StoryFragment[];
  position: StoryPosition;
  headerChildren?: ReactNode;
}> = ({ title, position, projectId, stories, headerChildren }) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm();
  return (
    <Droppable droppableId={position.toString()}>
      {(provided, _snapshot) => {
        return (
          <StoryCard ref={provided.innerRef} {...provided.droppableProps}>
            <StoryCardHead title={title}>
              {headerChildren}
              <StoryCreateButton onClick={openForm} />
            </StoryCardHead>
            {formOpened && (
              <StoryCreateForm
                destination={{
                  position,
                  priority: nextPriority(stories),
                }}
                projectId={projectId}
                onCancel={closeForm}
                onComplete={closeForm}
              />
            )}
            <AggregationContainer
              currentVelocity={10}
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

const Card: FC<{
  projectId: string;
  title: string;
  stories: ProjectBoard_StoryFragment[];
  position: StoryPosition;
  canCreateStory?: boolean;
  headerChildren?: ReactNode;
}> = ({
  projectId,
  title,
  position,
  stories,
  canCreateStory,
  headerChildren,
}) => {
  const { formOpened, openForm, closeForm } = useNewStoryForm();
  return (
    <Droppable droppableId={position.toString()}>
      {(provided, _snapshot) => {
        return (
          <StoryCard ref={provided.innerRef} {...provided.droppableProps}>
            {position.toString()}
            <StoryCardHead title={title}>
              {headerChildren}
              {canCreateStory && <StoryCreateButton onClick={openForm} />}
            </StoryCardHead>
            {formOpened && (
              <StoryCreateForm
                destination={{
                  position,
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

const ProjectStoryBoards: FC<{
  projectId: string;
  currentVelocity: number;
  stories: ProjectBoard_StoryFragment[];
  onRefetch?(positions: StoryPosition[]): void;
}> = ({ projectId, currentVelocity, stories, onRefetch }) => {
  const {
    currentStories,
    backlogStories,
    iceboxStories,
    doneStories,
    handleDragEnd,
  } = useMovableStoryList(projectId, stories);
  return (
    <HStack align="stretch" h="calc(100vh - 5rem)">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Card
          projectId={projectId}
          title="Done"
          position={StoryPosition.Done}
          stories={doneStories}
        />
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
          projectId={projectId}
          title="Icebox"
          position={StoryPosition.Icebox}
          stories={iceboxStories}
          canCreateStory
        />
      </DragDropContext>
    </HStack>
  );
};

export const ProjectBoard: FC<{
  projectId: string;
}> = ({ projectId }) => {
  const [currentAndBacklogCursor, setCurrentAndBacklogCursor] = useState('');
  const [doneCursor, setDoneCursor] = useState('');
  const [iceboxCursor, setIceboxCursor] = useState('');
  const [currentAndBacklogItems] = useProjectBoardQuery({
    variables: {
      projectId,
      storySearchInput: {
        position: [StoryPosition.Current, StoryPosition.Backlog],
      },
      cursor: currentAndBacklogCursor,
    },
  });
  const [doneItems] = useProjectBoardQuery({
    variables: {
      projectId,
      storySearchInput: {
        position: [StoryPosition.Done],
      },
      cursor: doneCursor,
    },
  });
  const [iceboxItems] = useProjectBoardQuery({
    variables: {
      projectId,
      storySearchInput: {
        position: [StoryPosition.Icebox],
      },
      cursor: iceboxCursor,
    },
  });

  const currentAndBacklogNodes =
    currentAndBacklogItems.data?.viewer?.project?.stories.edges?.map(
      edge => edge?.node
    ) ?? [];
  const doneNodes =
    doneItems.data?.viewer?.project?.stories.edges?.map(edge => edge?.node) ??
    [];
  const iceboxNodes =
    iceboxItems.data?.viewer?.project?.stories.edges?.map(edge => edge?.node) ??
    [];
  const stories = filterOfPresence([
    ...currentAndBacklogNodes,
    ...doneNodes,
    ...iceboxNodes,
  ]).filter(it => !it.isDeleted);

  const project = currentAndBacklogItems.data?.viewer?.project;

  if (currentAndBacklogItems.fetching) return <></>;
  if (currentAndBacklogItems.error) return <></>;
  if (project == null) return <></>;

  return (
    <ProjectStoryBoards
      projectId={projectId}
      currentVelocity={project.currentVelocity}
      stories={stories}
    />
  );
};
