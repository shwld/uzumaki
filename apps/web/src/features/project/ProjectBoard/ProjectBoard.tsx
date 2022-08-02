import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useMovableStoryList } from './hooks/useMovableStoryList';
import { ProjectBoard_StoryFragment } from './ProjectBoard.generated';
import { StoryPosition } from '~/graphql/generated/graphql';
import { DoneBoard } from './boards/DoneBoard';
import { DragDropContext } from 'react-beautiful-dnd';
import { CurrentBoard } from './boards/CurrentBoard';
import { BacklogBoard } from './boards/BacklogBoard';
import { IceboxBoard } from './boards/IceboxBoard';
import { useExtendedProjectBoardQuery } from './hooks/useExtendedProjectBoardQuery';

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
  const result = useExtendedProjectBoardQuery(projectId);
  console.log(result);

  // if (result.fetching) return <></>;
  if (result.error) return <></>;
  if (result.project == null) return <></>;

  return (
    <ProjectStoryBoards
      projectId={projectId}
      currentVelocity={result.project.currentVelocity}
      stories={result.stories}
    />
  );
};
