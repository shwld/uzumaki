import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { StoryPosition } from '~/graphql/generated/graphql';
import {
  ProjectBoard_StoryFragment,
  useProjectBoard_MoveStoriesMutation,
} from '../ProjectBoard.generated';
import { reorderByPriority, SortableItem } from '../functions/reorder';
import dayjs from 'dayjs';
import { not } from '~/shared/functions/not';

export function useMovableStoryList(
  projectId: string,
  iterationStartDate: Date,
  stories: ProjectBoard_StoryFragment[]
) {
  const isCompletedInCurrentIteration =
    useIsCompletedInCurrentIteration(iterationStartDate);
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
    if (sourceItem == null) return;
    const destinationItems = filterStories(stories, destinationPosition).filter(
      it => it.id !== sourceItem.id
    );
    // 一番下に移動するときにundefindになる
    const destinationItemId: string | undefined =
      destinationItems?.[destination.index]?.id;
    // dropped outside the list

    const storiesWithoutDone = stories.filter(
      it => it.position !== StoryPosition.Done
    );
    const reorderedStories = reorderByPriority({
      allItems: storiesWithoutDone.map(toSortableItem),
      source: {
        items: [toSortableItem(sourceItem)],
      },
      destination: {
        group: destinationPosition,
        itemId: destinationItemId,
      },
    });

    // console.log({
    //   source,
    //   sourceItem,
    //   destination,
    //   destinationItemId,
    //   reorderedStories,
    // });

    move({
      input: {
        projectId,
        stories: reorderedStories
          .filter(
            it => it.priority !== it.oldPriority || it.group !== it.oldGroup
          )
          .map(it => ({
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
    doneStories: {
      current: filterStories(stories, StoryPosition.Done).filter(
        isCompletedInCurrentIteration
      ),
      done: filterStories(stories, StoryPosition.Done).filter(
        not(isCompletedInCurrentIteration)
      ),
    },
    handleDragEnd,
  };
}

/**
 * PRIVATE
 */

const filterStories = (
  stories: ProjectBoard_StoryFragment[],
  position: StoryPosition
) =>
  stories
    .filter(it => it.position === position && !it.isDeleted)
    .sort((a, b) => (a.priority < b.priority ? 0 : -1));

const toSortableItem = (story: ProjectBoard_StoryFragment): SortableItem => ({
  id: story.id,
  group: story.position,
  oldGroup: story.position,
  priority: story.priority,
  oldPriority: story.priority,
});

function useIsCompletedInCurrentIteration(
  iterationStartDate: Date
): (story?: ProjectBoard_StoryFragment) => boolean {
  return story => {
    if (story?.isCompleted && story?.completedAt != null)
      return dayjs(story.completedAt).isAfter(iterationStartDate);

    return false;
  };
}
