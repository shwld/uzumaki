import { createMutationResolver } from '../../../../shared/helpers/result-helpers';
import { destroyStoryArgsValidationSchema } from './destroy-story-validation';

export const destroyStory = createMutationResolver(
  'destroyStory',
  {
    validationSchema: destroyStoryArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const story = await context.db.story.findBy({ id: args.input.id });
      if (story == null) return;

      const project = await context.db.project.findByUser({
        id: story.projectId,
        user: context.currentUser,
      });
      return project != null && story;
    },
  },
  async ({ context }, story) => {
    const newStory = await context.db.story.save(story.destroy());
    return {
      __typename: 'DestroyStorySuccessResult',
      result: newStory,
    };
  }
);
