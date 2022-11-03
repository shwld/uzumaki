import { StoryService } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutation-helpers';
import { updateStoryStateArgsValidationSchema } from './updateStoryStateValidation';

export const updateStoryState = createMutationResolver(
  'updateStoryState',
  {
    validationSchema: updateStoryStateArgsValidationSchema,
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
    const result = await StoryService.updateStateWithChangePosition(
      context.db,
      story,
      args.input.state
    );
    return {
      __typename: 'UpdateStoryStateSuccessResult',
      ...result,
    };
  }
);
