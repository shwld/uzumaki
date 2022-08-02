import { HStack } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { useMovableStoryList } from './hooks';
import {
  ProjectBoard_StoryFragment,
  useProjectBoardQuery,
} from './ProjectBoard.generated';
import { StoryPosition } from '~/graphql/generated/graphql';
import { filterOfPresence } from '~/shared/functions/filterOfPresence';
import { DoneBoard } from './boards/DoneBoard';
import { DragDropContext } from 'react-beautiful-dnd';
import { CurrentBoard } from './boards/CurrentBoard';
import { BacklogBoard } from './boards/BacklogBoard';
import { IceboxBoard } from './boards/IceboxBoard';

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
        <DoneBoard stories={doneStories} />
        <CurrentBoard
          projectId={projectId}
          currentVelocity={currentVelocity}
          stories={currentStories}
        />
        <BacklogBoard
          projectId={projectId}
          currentVelocity={currentVelocity}
          stories={backlogStories}
        />
        <IceboxBoard projectId={projectId} stories={iceboxStories} />
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
