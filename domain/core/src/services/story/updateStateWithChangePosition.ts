import { Aggregates } from '../../aggregates/repositoryInterfaces';
import { StoryEntity, StoryState } from '../../models';
import { match } from 'ts-pattern';

const EMPTY_STORIES: StoryEntity[] = [];

export async function updateStateWithChangePosition(
  aggregates: Aggregates,
  story: StoryEntity,
  state: StoryState
): Promise<{ result: StoryEntity; effectedStories: StoryEntity[] }> {
  if (story.state === state) {
    return {
      result: story,
      effectedStories: [],
    };
  }

  const [newStory, effectedStories] = await match(story.updateState(state))
    .with({ state: 'STARTED' }, async it => {
      const effectedStories = await aggregates.story.incrementPriority({
        projectId: story.projectId,
        position: 'CURRENT',
      });
      return [it.moveTo('CURRENT', 0), effectedStories] as const;
    })
    .with({ state: 'ACCEPTED' }, it => {
      return [it.moveTo('DONE', 0), EMPTY_STORIES] as const;
    })
    .with({ state: 'UNSTARTED' }, async it => {
      const max = await aggregates.story.findMaxPriority({
        projectId: story.projectId,
        position: 'BACKLOG',
      });
      const priority = max == null ? 0 : max.priority + 1;
      return [it.moveTo('BACKLOG', priority), EMPTY_STORIES] as const;
    })
    .otherwise(it => [it, EMPTY_STORIES] as const);

  return {
    result: await aggregates.story.save(newStory),
    effectedStories,
  };
}
