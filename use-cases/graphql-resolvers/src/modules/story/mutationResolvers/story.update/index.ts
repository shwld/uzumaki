import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { updateStoryArgsValidationSchema } from './validation';

export const updateStory = createMutationResolver(
  'updateStory',
  {
    validationSchema: updateStoryArgsValidationSchema,
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
  async ({ args, context }, story) => {
    const newStory = story.update({
      title: args.input.title,
      description: args.input.description,
      state: args.input.state,
      kind: args.input.kind,
      points: args.input.points,
      releaseDate: args.input.releaseDate,
    });
    await context.db.story.save(newStory);
    return {
      __typename: 'UpdateStorySuccessResult',
      result: newStory,
    };
  }
);
