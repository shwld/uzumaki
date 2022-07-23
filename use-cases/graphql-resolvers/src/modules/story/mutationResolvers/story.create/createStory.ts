import { buildStory } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { createStoryArgsValidationSchema } from './createStoryValidation';

export const createStory = createMutationResolver(
  'createStory',
  {
    validationSchema: createStoryArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const requester = await context.db.projectUser.findBy({
        projectId: args.input.projectId,
        userId: args.input.requesterId ?? context.currentUser.id,
      });
      if (requester == null) return;
      return requester;
    },
  },
  async ({ args, context }, requester) => {
    const story = buildStory({
      id: args.input.id,
      title: args.input.title,
      description: args.input.description,
      kind: args.input.kind,
      points: args.input.points,
      releaseDate: args.input.releaseDate,
      state: args.input.state,
      requester,
      position: args.input.position,
      priority: args.input.priority,
    });
    await context.db.story.save(story);
    return {
      __typename: 'CreateStorySuccessResult',
      result: story,
    };
  }
);
