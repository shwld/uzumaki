import { useState } from 'react';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import {
  StoryPosition,
  useProjectBoardMoveStoriesMutation,
} from '~/graphql/generated/graphql';
import { ProjectBoardStoryFragment } from './ProjectBoard.generated';
import { reorderByPriority, SortableItem } from './functions/reorder';

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

const filterStories = (
  stories: ProjectBoardStoryFragment[],
  position: StoryPosition
) =>
  stories
    .filter((it) => it.position === position && !it.isDeleted)
    .sort((a, b) => (a.priority < b.priority ? 0 : -1));

const toSortableItem = (story: ProjectBoardStoryFragment): SortableItem => ({
  id: story.id,
  group: story.position,
  priority: story.priority,
  oldPriority: story.priority,
});

export function useMovableStoryList(
  projectId: string,
  stories: ProjectBoardStoryFragment[]
) {
  const [moveResult, move] = useProjectBoardMoveStoriesMutation();

  const handleDragEnd = (
    result: DropResult,
    _provided: ResponderProvided
  ): void => {
    if (moveResult.fetching) return;
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

    const reorderedStories = reorderByPriority({
      allItems: stories.map(toSortableItem),
      source: {
        items: [toSortableItem(sourceItem)],
      },
      destination: {
        group: destinationItem.position,
        priority: destinationItem.priority,
      },
    });

    // console.log({
    //   source,
    //   sourceItem,
    //   destination,
    //   destinationItem,
    // })

    move({
      input: {
        projectId,
        stories: reorderedStories
          .filter((it) => it.priority !== it.oldPriority)
          .map((it) => ({
            id: it.id,
            position: it.group as StoryPosition,
            priority: it.priority,
          })),
      },
    });
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
