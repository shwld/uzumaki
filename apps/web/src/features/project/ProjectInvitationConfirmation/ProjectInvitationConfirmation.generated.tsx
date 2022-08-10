import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectInvitationConfirmation_MemberFragment = {
  __typename?: 'ProjectMember';
  id: string;
  role: Types.ProjectMemberRole;
  name: string;
  avatarImageUrl: string;
};

export type ProjectInvitationConfirmationQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
  confirmationToken: Types.Scalars['String'];
}>;

export type ProjectInvitationConfirmationQuery = {
  __typename?: 'Query';
  viewer?:
    | {
        __typename?: 'Viewer';
        id: string;
        project?: { __typename?: 'Project'; id: string } | undefined;
        invitationToken?:
          | {
              __typename?: 'ProjectMemberInvitationToken';
              id: string;
              expiredAt: any;
              isExpired: boolean;
              invitation: {
                __typename?: 'ProjectMemberInvitation';
                projectName: string;
              };
            }
          | undefined;
      }
    | undefined;
};

export type ProjectInvitationConfirmation_JoinProjectMemberMutationVariables =
  Types.Exact<{
    input: Types.JoinProjectMemberInput;
  }>;

export type ProjectInvitationConfirmation_JoinProjectMemberMutation = {
  __typename?: 'Mutation';
  joinProjectMember:
    | {
        __typename?: 'InvalidArgumentsResult';
        issues: Array<{
          __typename?: 'ValidationIssue';
          field?: string | undefined;
          message?: string | undefined;
        }>;
      }
    | {
        __typename?: 'JoinProjectMemberAlreadyJoinedResult';
        result: {
          __typename?: 'ProjectMember';
          id: string;
          role: Types.ProjectMemberRole;
          name: string;
          avatarImageUrl: string;
        };
      }
    | {
        __typename?: 'JoinProjectMemberSuccessResult';
        result: {
          __typename?: 'ProjectMember';
          id: string;
          role: Types.ProjectMemberRole;
          name: string;
          avatarImageUrl: string;
        };
      }
    | {
        __typename?: 'JoinProjectMemberTokenIsAlreadyUsedResult';
        result: { __typename?: 'ProjectMemberInvitation'; id: string };
      }
    | { __typename?: 'JoinProjectMemberTokenIsExpiredResult'; expiredAt: any }
    | { __typename?: 'UnauthorizedResult' };
};

export const ProjectInvitationConfirmation_MemberFragmentDoc = gql`
  fragment ProjectInvitationConfirmation_Member on ProjectMember {
    id
    role
    name
    avatarImageUrl
  }
`;
export const ProjectInvitationConfirmationDocument = gql`
  query ProjectInvitationConfirmation(
    $projectId: ID!
    $confirmationToken: String!
  ) {
    viewer {
      id
      project(id: $projectId) {
        id
      }
      invitationToken(confirmationToken: $confirmationToken) {
        id
        expiredAt
        isExpired
        invitation {
          projectName
        }
      }
    }
  }
`;

export function useProjectInvitationConfirmationQuery(
  options: Omit<
    Urql.UseQueryArgs<ProjectInvitationConfirmationQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    ProjectInvitationConfirmationQuery,
    ProjectInvitationConfirmationQueryVariables
  >({ query: ProjectInvitationConfirmationDocument, ...options });
}
export const ProjectInvitationConfirmation_JoinProjectMemberDocument = gql`
  mutation ProjectInvitationConfirmation_JoinProjectMember(
    $input: JoinProjectMemberInput!
  ) {
    joinProjectMember(input: $input) {
      ... on JoinProjectMemberSuccessResult {
        result {
          ...ProjectInvitationConfirmation_Member
        }
      }
      ... on JoinProjectMemberTokenIsAlreadyUsedResult {
        result {
          id
        }
      }
      ... on JoinProjectMemberTokenIsExpiredResult {
        expiredAt
      }
      ... on JoinProjectMemberAlreadyJoinedResult {
        result {
          ...ProjectInvitationConfirmation_Member
        }
      }
      ... on InvalidArgumentsResult {
        issues {
          field
          message
        }
      }
    }
  }
  ${ProjectInvitationConfirmation_MemberFragmentDoc}
`;

export function useProjectInvitationConfirmation_JoinProjectMemberMutation() {
  return Urql.useMutation<
    ProjectInvitationConfirmation_JoinProjectMemberMutation,
    ProjectInvitationConfirmation_JoinProjectMemberMutationVariables
  >(ProjectInvitationConfirmation_JoinProjectMemberDocument);
}
