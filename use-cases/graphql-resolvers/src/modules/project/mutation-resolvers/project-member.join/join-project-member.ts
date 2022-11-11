import {
  ProjectMemberInvitationTokenPolicy,
  ProjectMemberMutations,
} from 'core-domain';
import {
  andThen,
  map,
  resolve,
  pipe,
  Result,
  patternMatch,
  RuntimeError,
  InvalidAttributesError,
} from 'core-domain';
import {
  InternalErrorResult,
  JoinProjectMemberAlreadyJoinedResult,
  JoinProjectMemberSuccessResult,
  JoinProjectMemberTokenIsExpiredResult,
  MutationResolvers,
} from '../../../../generated/resolvers-types';
import { handleError } from '../../../../shared/helpers/handle-error';
import { validateArguments } from '../../../../shared/helpers/validation-helper';
import { joinProjectMemberArgsValidationSchema } from './join-project-member-validation';

export const joinProjectMember: Required<MutationResolvers>['joinProjectMember'] =
  async (parent, args, context, info) => {
    const result = await pipe(
      context.db.projectMemberInvitationToken.find({
        id: args.input.confirmationToken,
      }),
      map(it => ({
        parent,
        args,
        context,
        info,
        user: context.currentUser,
        token: it,
      })),
      andThen(ProjectMemberInvitationTokenPolicy(context.db).authorizeJoining),
      andThen(validateArguments(joinProjectMemberArgsValidationSchema)),
      andThen(it => {
        const matched: Result<
          InternalErrorResult | RuntimeError | InvalidAttributesError,
          | JoinProjectMemberAlreadyJoinedResult
          | JoinProjectMemberTokenIsExpiredResult
          | JoinProjectMemberSuccessResult
        > = patternMatch(it)
          .with({ token: { state: 'JOINED' } }, () =>
            Result.right({
              __typename: 'JoinProjectMemberAlreadyJoinedResult',
              result: true,
            } as JoinProjectMemberAlreadyJoinedResult)
          )
          .with({ token: { state: 'EXPIRED' } }, value =>
            Result.right({
              __typename: 'JoinProjectMemberTokenIsExpiredResult',
              expiredAt: value.token.expiredAt,
            } as JoinProjectMemberTokenIsExpiredResult)
          )
          .with({ token: { state: 'INVITING' } }, value => {
            return pipe(
              {
                id: value.args.input.memberId,
                projectId: value.token.projectId,
                role: value.token.role,
                createdByInvitationId: value.token.invitationId,
                user: value.user,
              },
              ProjectMemberMutations.build,
              andThen(context.db.projectMember.create),
              map(
                () =>
                  ({
                    __typename: 'JoinProjectMemberSuccessResult',
                    result: true,
                  } as JoinProjectMemberSuccessResult)
              )
            );
          })
          .otherwise(() =>
            Result.left({
              __typename: 'InternalErrorResult',
              errorMessage: 'Unknown error',
            } as InternalErrorResult)
          );

        return matched;
      }),
      handleError,
      resolve
    );

    return result;
  };
