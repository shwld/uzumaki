import { UserProfileMutations, UserPolicy } from 'core-domain';
import { andThen, map, resolve, pipe } from 'core-domain';
import { MutationResolvers } from '../../../../generated/resolvers-types';
import { fileToDataUrl } from '../../../../shared/helpers/file-helper';
import { handleError } from '../../../../shared/helpers/handle-error';
import { resolverReturnType } from '../../../../shared/helpers/result-helpers';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { updateUserProfileArgsValidationSchema } from './update-user-profile-validation';

export const updateUserProfile: Required<MutationResolvers>['updateUserProfile'] =
  async (parent, args, context, info) => {
    const result = await pipe(
      {
        parent,
        context,
        info,
        args: {
          input:
            args.input.avatarImage != null
              ? {
                  name: args.input.name,
                  avatarImageUrl: await fileToDataUrl(args.input.avatarImage),
                }
              : { name: args.input.name },
        },
        user: context.currentUser,
      },
      UserPolicy(context.db).authorize,
      andThen(validateArguments(updateUserProfileArgsValidationSchema)),
      andThen(v => pipe(v.user, UserProfileMutations.edit(v.args.input))),
      andThen(context.db.user.update),
      map(
        resolverReturnType('UpdateUserProfileSuccessResult', result => ({
          result,
        }))
      ),
      handleError,
      resolve
    );

    return result;
  };
