import { HStack } from '@chakra-ui/react';
import { FC, useMemo, useState } from 'react';
import { useMovableStoryList } from './hooks/useMovableStoryList';
import {
  ProjectBoard_ProjectFragment,
  ProjectBoard_StoryFragment,
  useProjectBoard_StatusQuery,
  useProjectBoard_SubscSubscription,
} from './ProjectBoard.generated';
import { DoneBoard } from './boards/DoneBoard';
import { DragDropContext } from 'react-beautiful-dnd';
import { CurrentBoard } from './boards/CurrentBoard';
import { BacklogBoard } from './boards/BacklogBoard';
import { IceboxBoard } from './boards/IceboxBoard';
import { useExtendedProjectBoardQuery } from './hooks/useExtendedProjectBoardQuery';
import dayjs from 'dayjs';
import { InspectVelocityButton } from './components/InspectVelocityButton';

export const ProjectBoard: FC<{
  projectId: string;
}> = ({ projectId }) => {
  const [{ fetching, error, data }] = useProjectBoard_StatusQuery({
    variables: { projectId },
  });
  const [res] = useProjectBoard_SubscSubscription(
    {
      variables: {
        projectId,
      },
    },
    (messages: any, message) => {
      console.log({ messages, message });
      return [message];
    }
  );
  // console.log(res.data);
  const project = data?.viewer?.project;

  if (fetching) return <></>;
  if (error) return <></>;
  if (project == null) return <></>;

  return <StoriesContainer project={project} />;
};

/**
 * PRIVATE
 */
const StoriesContainer: FC<{
  project: ProjectBoard_ProjectFragment;
}> = ({ project }) => {
  const result = useExtendedProjectBoardQuery(project.id);

  if (result.fetching) return <></>;
  if (result.error) return <></>;

  return <ProjectStoryBoards project={project} stories={result.stories} />;
};

const ProjectStoryBoards: FC<{
  project: ProjectBoard_ProjectFragment;
  stories: ProjectBoard_StoryFragment[];
}> = ({ project, stories }) => {
  const projectStartDate = useMemo(
    () => dayjs().day(project.boardConfig.startIterationWeekNumber).toDate(),
    [project]
  );
  const [currentVelocity, setCurrentVelocity] = useState(
    project.boardStatus.velocity
  );
  const {
    currentStories,
    backlogStories,
    iceboxStories,
    doneStories,
    handleDragEnd,
  } = useMovableStoryList(project.id, projectStartDate, stories);
  return (
    <HStack align="stretch" h="calc(100vh - 5rem)">
      <DragDropContext onDragEnd={handleDragEnd}>
        <DoneBoard
          stories={doneStories.done}
          iterationLength={project.boardConfig.iterationLength}
          currentIterationStartDate={projectStartDate}
        />
        <CurrentBoard
          projectId={project.id}
          currentVelocity={currentVelocity}
          iterationLengthInWeek={project.boardConfig.iterationLength}
          iterationStartDate={projectStartDate}
          stories={currentStories}
          doneStories={doneStories.current}
          header={
            <InspectVelocityButton
              persistedVelocity={project.boardStatus.velocity}
              onChangeVelocity={setCurrentVelocity}
            />
          }
        />
        <BacklogBoard
          projectId={project.id}
          currentVelocity={currentVelocity}
          iterationLengthInWeek={project.boardConfig.iterationLength}
          currentIterationStartDate={projectStartDate}
          stories={backlogStories}
        />
        <IceboxBoard projectId={project.id} stories={iceboxStories} />
      </DragDropContext>
    </HStack>
  );
};
