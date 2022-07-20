import { useState } from 'react';
import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import {
  StoryPosition,
  useProjectBoard_MoveStoriesMutation,
} from '~/graphql/generated/graphql';
import { ProjectBoard_StoryFragment } from './ProjectBoard.generated';
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
  stories: ProjectBoard_StoryFragment[],
  position: StoryPosition
) =>
  stories
    .filter((it) => it.position === position && !it.isDeleted)
    .sort((a, b) => (a.priority < b.priority ? 0 : -1));

const toSortableItem = (story: ProjectBoard_StoryFragment): SortableItem => ({
  id: story.id,
  group: story.position,
  oldGroup: story.position,
  priority: story.priority,
  oldPriority: story.priority,
});

export function useMovableStoryList(
  projectId: string,
  stories: ProjectBoard_StoryFragment[]
) {
  const [moveResult, move] = useProjectBoard_MoveStoriesMutation();

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
    const destinationItems = filterStories(stories, destinationPosition).filter(
      (it) => it.id !== sourceItem.id
    );
    // 一番下に移動するときにundefindになる
    const destinationItemId: string | undefined =
      destinationItems?.[destination.index]?.id;
    // dropped outside the list
    if (sourceItem == null) return;

    const reorderedStories = reorderByPriority({
      allItems: stories.map(toSortableItem),
      source: {
        items: [toSortableItem(sourceItem)],
      },
      destination: {
        group: destinationPosition,
        itemId: destinationItemId,
      },
    });

    console.log({
      source,
      sourceItem,
      destination,
      destinationItemId,
      reorderedStories,
    });

    move({
      input: {
        projectId,
        stories: reorderedStories
          .filter(
            (it) => it.priority !== it.oldPriority || it.group !== it.oldGroup
          )
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
