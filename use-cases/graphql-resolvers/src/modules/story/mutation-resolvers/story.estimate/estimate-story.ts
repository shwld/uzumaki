import { createMutationResolver } from '../../../../shared/helpers/mutation-helpers';
import { estimateStoryArgsValidationSchema } from './story-validation';

export const estimateStory = createMutationResolver(
  'estimateStory',
  {
    validationSchema: estimateStoryArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const story = await context.db.story.findBy({ id: args.input.id });
      if (story == null) return;

      const project = await context.db.project.findByUser({
        id: story.projectId,
        user: context.currentUser,
      });
      if (project == null) return;
      return story;
    },
  },
  async ({ args, context }, story) => {
    const newStory = story.estimate(args.input.points);
    await context.db.story.save(newStory);
    return {
      __typename: 'EstimateStorySuccessResult',
      result: newStory,
    };
  }
);
