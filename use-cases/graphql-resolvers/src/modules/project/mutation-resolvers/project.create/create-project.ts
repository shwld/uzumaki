import { ProjectMutations, ProjectPolicy } from 'core-domain';
import { andThen, map, resolve, pipe } from 'core-domain/lib';
import { MutationResolvers } from '../../../../generated/resolvers-types';
import { handleError } from '../../../../shared/helpers/handle-error';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { createProjectArgsValidationSchema } from './create-project-validation';

export const createProject: Required<MutationResolvers>['createProject'] =
  async (parent, args, context, info) => {
    const result = await pipe(
      context.db.account.find({ id: args.input.accountId }),
      map(account => ({
        parent,
        args,
        context,
        info,
        account,
        user: context.currentUser,
      })),
      andThen(ProjectPolicy(context.db).authorize),
      andThen(validateArguments(createProjectArgsValidationSchema)),
      andThen(v =>
        ProjectMutations.build({
          id: v.args.input.id,
          name: v.args.input.name,
          privacy: v.args.input.privacy,
          description: v.args.input.description!,
          accountId: v.account.id,
          createdById: v.user.id,
        })
      ),
      andThen(context.db.project.create),
      map(
        v =>
          ({
            __typename: 'CreateProjectSuccessResult',
            result: v,
          } as const)
      ),
      handleError,
      resolve
    );

    return result;
  };
