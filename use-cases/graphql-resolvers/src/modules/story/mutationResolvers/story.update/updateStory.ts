import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { updateStoryArgsValidationSchema } from './updateStoryValidation';

export const updateStory = createMutationResolver(
  'updateStory',
  {
    validationSchema: updateStoryArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const story = await context.db.story.findBy({ id: args.input.id });
      if (story == null) return;

      const requester =
        args.input.requesterId != null
          ? await context.db.projectMember.findBy({
              projectId: story.projectId,
              userId: args.input.requesterId,
            })
          : undefined;
      if (requester == null) return;
      return [story, requester] as const;
    },
  },
  async ({ args, context }, [story, requester]) => {
    const newStory = story.update({
      title: args.input.title,
      description: args.input.description,
      state: args.input.state,
      kind: args.input.kind,
      points: args.input.points,
      releaseDate: args.input.releaseDate,
      requester,
    });
    await context.db.story.save(newStory);
    return {
      __typename: 'UpdateStorySuccessResult',
      result: newStory,
    };
  }
);
