import { buildProject } from 'core-domain';
import { createMutationResolver } from '../../../../shared/helpers/mutationHelpers';
import { createProjectArgsValidationSchema } from './createProjectValidation';

export const createProject = createMutationResolver(
  'createProject',
  {
    validationSchema: createProjectArgsValidationSchema,
    authorize: ({ args, context }) => {
      if (context.currentUser == null) return;

      const account = context.db.account.findBy({
        id: args.input.accountId,
        user: context.currentUser,
      });
      return account;
    },
  },
  async ({ args, context }, account) => {
    const project = buildProject({
      id: args.input.id,
      name: args.input.name,
      description: args.input.description ?? '',
      privacy: args.input.privacy,
      createdBy: context.currentUser!,
      account,
    });
    await context.db.project.save(project);
    return {
      __typename: 'CreateProjectSuccessResult',
      result: project,
    };
  }
);
