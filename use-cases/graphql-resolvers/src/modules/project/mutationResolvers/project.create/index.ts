import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { createProjectArgsValidationSchema } from './validation';

export const createProject = createMutationResolver(
  'createProject',
  {
    validationSchema: createProjectArgsValidationSchema,
    authorize: ({ context }) => {
      return context.currentUser != null;
    },
  },
  async ({ args, context }) => {
    // TODO
    return {
      __typename: 'CreateProjectSuccessResult',
      // TODO result: ,
    };
  }
);
