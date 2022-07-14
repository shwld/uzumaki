import { useState } from 'react';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { StoryPosition } from '~/graphql/generated/graphql';
import { ProjectBoardStoryFragment } from './ProjectBoard.generated';

export const useNewStoryForm = () => {
  const [formOpened, setOpenedForm] = useState(false);
  const openForm = () => {
    setOpenedForm(true);
  };
  const closeForm = () => {
    setOpenedForm(false);
  };

  return {
    formOpened,
    openForm,
    closeForm,
  };
};

// const MOVE_STORY_MUTATION = gql`
//   fragment MoveStoryFragment on Story {
//     id
//     orderPriority {
//       position
//       priority
//     }
//     updatedAt
//   }
//   mutation MoveStoryMutation(
//     $ids: [String!]!
//     $destination: StoryDestination!
//   ) {
//     moveStory(ids: $ids, destination: $destination) {
//       ...MoveStoryFragment
//     }
//   }
// `;

const filterStories = (
  stories: ProjectBoardStoryFragment[],
  position: StoryPosition
) =>
  stories
    .filter((it) => it.position === position && !it.isDeleted)
    .sort((a, b) => (a.priority < b.priority ? 0 : -1));

export function useMovableStoryList(stories: ProjectBoardStoryFragment[]) {
  // const [move, moveResult] = useMutation<
  //   MoveStoryMutation,
  //   MoveStoryMutationVariables
  // >(MOVE_STORY_MUTATION);

  const handleDragEnd = (
    result: DropResult,
    _provided: ResponderProvided
  ): void => {
    // if (moveResult.loading) return;
    const { source, destination } = result;
    if (destination == null) return;

    const sourcePosition = source.droppableId as StoryPosition;
    const destinationPosition = destination.droppableId as StoryPosition;
    const sourceItem = filterStories(stories, sourcePosition)?.[source.index];
    // 別カードの一番下に移動するときにundefindになる
    const destinationItem =
      filterStories(stories, destinationPosition)?.[destination.index] ??
      filterStories(stories, destinationPosition)?.[0];
    // dropped outside the list
    if (sourceItem == null) return;

    // console.log({
    //   source,
    //   sourceItem,
    //   destination,
    //   destinationItem,
    // })
    // move({
    //   variables: {
    //     ids: [sourceItem.id],
    //     destination: {
    //       position: destinationPosition,
    //       priority: destinationItem?.orderPriority.priority ?? 0,
    //     },
    //   },
    // });
  };

  return {
    currentStories: filterStories(stories, StoryPosition.Current),
    backlogStories: filterStories(stories, StoryPosition.Backlog),
    iceboxStories: filterStories(stories, StoryPosition.Icebox),
    handleDragEnd,
  };
}

export const useIterationSchedules = (iterationLengthInWeeks: number) => {
  const [currentIterationStartDate] = useState();

  return {
    currentIterationStartDate,
  };
};
