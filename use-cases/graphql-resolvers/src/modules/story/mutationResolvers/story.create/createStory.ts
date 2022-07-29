import { buildStory } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { createStoryArgsValidationSchema } from './createStoryValidation';

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
      if (project == null) return;

      const requester = await context.db.projectMember.findBy({
        id: args.input.requesterId,
        projectId: project.id,
      });
      if (requester == null || requester.projectId !== project.id) return;
      return [project, requester] as const;
    },
  },
  async ({ args, context }, [project, requester]) => {
    const story = buildStory(project, {
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
