import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { updateStateToNextStoryArgsValidationSchema } from './storyValidation';

export const updateStateToNextStory = createMutationResolver(
  'updateStateToNextStory',
  {
    validationSchema: updateStateToNextStoryArgsValidationSchema,
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
  async ({ context }, story) => {
    const newStory = await context.db.story.save(story.updateStateToNext());
    return {
      __typename: 'UpdateStateToNextStorySuccessResult',
      result: newStory,
    };
  }
);
