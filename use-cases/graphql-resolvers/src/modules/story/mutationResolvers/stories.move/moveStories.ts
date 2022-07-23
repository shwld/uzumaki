import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { moveStoriesArgsValidationSchema } from './storiesValidation';

export const moveStories = createMutationResolver(
  'moveStories',
  {
    validationSchema: moveStoriesArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const project = await context.db.project.findByUser({
        id: args.input.projectId,
        user: context.currentUser,
      });
      if (project == null) return;

      const storyIds = args.input.stories.map(it => it.id);
      const stories = await context.db.story.findMany({
        project,
        ids: storyIds,
      });
      return stories.nodes.length > 0 && stories.nodes;
    },
  },
  async ({ args, context }, stories) => {
    const newStories = await Promise.all(
      args.input.stories.map(destination => {
        const story = stories.find(it => it.id === destination.id);
        if (story == null) throw new Error('story is not found');

        const newStory = story.moveTo(
          destination.position,
          destination.priority
        );
        return context.db.story.save(newStory);
      })
    );
    return {
      __typename: 'MoveStoriesSuccessResult',
      result: newStories,
    };
  }
);
