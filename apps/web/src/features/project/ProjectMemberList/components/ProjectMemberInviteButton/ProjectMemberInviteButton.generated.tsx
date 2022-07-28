import * as Types from '../../../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectMemberInviteButton_InviteMutationVariables = Types.Exact<{
  input: Types.InviteProjectMemberInput;
}>;

export type ProjectMemberInviteButton_InviteMutation = {
  __typename?: 'Mutation';
  inviteProjectMember:
    | { __typename?: 'InvalidArgumentsResult' }
    | {
        __typename?: 'InviteProjectMemberSuccessResult';
        result?:
          | { __typename?: 'ProjectMemberInvitation'; id: string }
          | undefined;
      }
    | { __typename?: 'UnauthorizedResult' };
};

export const ProjectMemberInviteButton_InviteDocument = gql`
  mutation ProjectMemberInviteButton_Invite($input: InviteProjectMemberInput!) {
    inviteProjectMember(input: $input) {
      ... on InviteProjectMemberSuccessResult {
        result {
          id
        }
      }
    }
  }
`;

export function useProjectMemberInviteButton_InviteMutation() {
  return Urql.useMutation<
    ProjectMemberInviteButton_InviteMutation,
    ProjectMemberInviteButton_InviteMutationVariables
  >(ProjectMemberInviteButton_InviteDocument);
}
