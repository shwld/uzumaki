import { StoryService } from 'core-domain';
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

      const project = await context.db.project.findByUser({
        id: story.projectId,
        user: context.currentUser,
      });
      if (project == null) return;

      const requester = await context.db.projectMember.findBy({
        id: args.input.requesterId,
        projectId: story.projectId,
      });
      if (requester == null) return;
      return [story, requester] as const;
    },
  },
  async ({ args, context }, [story, requester]) => {
    const result = await StoryService.updateStateWithChangePosition(
      context.db,
      story.update({
        title: args.input.title,
        description: args.input.description,
        kind: args.input.kind,
        points: args.input.points,
        releaseDate: args.input.releaseDate,
        requester,
      }),
      args.input.state
    );
    context.pubsub.story.publish({
      object: story,
      triggeredBy: context.currentUser!,
    });
    context.background.hello.enqueue({ name: 'mogemoge' });
    return {
      __typename: 'UpdateStorySuccessResult',
      ...result,
    };
  }
);
