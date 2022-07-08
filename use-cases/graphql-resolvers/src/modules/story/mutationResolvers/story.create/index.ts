import { buildStory } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { createStoryArgsValidationSchema } from './validation';

export const createStory = createMutationResolver(
  'createStory',
  {
    validationSchema: createStoryArgsValidationSchema,
    async authorize({ args, context }) {
      if (context.currentUser == null) return;

      const project = await context.db.project.findByUser({
        id: args.input.projectId,
        user: context.currentUser,
      });
      return project;
    },
  },
  async ({ args, context }, project) => {
    const story = buildStory({
      id: args.input.id,
      title: args.input.title,
      description: args.input.description,
      kind: args.input.kind,
      points: args.input.points,
      releaseDate: args.input.releaseDate,
      state: args.input.state,
      requester: context.currentUser,
      project,
      position: args.input.position,
      priority: args.input.priority,
    });
    await context.db.story.create(story);
    return {
      __typename: 'CreateStorySuccessResult',
      result: story,
    };
  }
);
