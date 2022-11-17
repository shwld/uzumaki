import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type DateString = string & { __dateStringBrand: any };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectMemberList_ProjectMemberFragment = {
  __typename?: 'ProjectMember';
  id: string;
  role: Types.ProjectMemberRole;
  name: string;
  avatarImageUrl: string;
};

export type ProjectMemberList_ProjectMemberInvitationFragment = {
  __typename?: 'ProjectMemberInvitation';
  id: string;
  role: Types.ProjectMemberRole;
  email: string;
};

export type ProjectMemberListQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
}>;

export type ProjectMemberListQuery = {
  __typename?: 'Query';
  viewer?:
    | {
        __typename?: 'Viewer';
        id: string;
        project?:
          | {
              __typename?: 'Project';
              id: string;
              members: {
                __typename?: 'ProjectMemberConnection';
                edges?:
                  | Array<
                      | {
                          __typename?: 'ProjectMemberEdge';
                          cursor?: string | undefined;
                          node?:
                            | {
                                __typename?: 'ProjectMember';
                                id: string;
                                role: Types.ProjectMemberRole;
                                name: string;
                                avatarImageUrl: string;
                              }
                            | undefined;
                        }
                      | undefined
                    >
                  | undefined;
                pageInfo?:
                  | {
                      __typename?: 'PageInfo';
                      hasNextPage: boolean;
                      endCursor?: string | undefined;
                    }
                  | undefined;
              };
              invitations: {
                __typename?: 'ProjectMemberInvitationConnection';
                edges?:
                  | Array<
                      | {
                          __typename?: 'ProjectMemberInvitationEdge';
                          cursor?: string | undefined;
                          node?:
                            | {
                                __typename?: 'ProjectMemberInvitation';
                                id: string;
                                role: Types.ProjectMemberRole;
                                email: string;
                              }
                            | undefined;
                        }
                      | undefined
                    >
                  | undefined;
                pageInfo?:
                  | {
                      __typename?: 'PageInfo';
                      hasNextPage: boolean;
                      endCursor?: string | undefined;
                    }
                  | undefined;
              };
            }
          | undefined;
      }
    | undefined;
};

export const ProjectMemberList_ProjectMemberFragmentDoc = gql`
  fragment ProjectMemberList_ProjectMember on ProjectMember {
    id
    role
    name
    avatarImageUrl
  }
`;
export const ProjectMemberList_ProjectMemberInvitationFragmentDoc = gql`
  fragment ProjectMemberList_ProjectMemberInvitation on ProjectMemberInvitation {
    id
    role
    email
  }
`;
export const ProjectMemberListDocument = gql`
  query ProjectMemberList($projectId: ID!) {
    viewer {
      id
      project(id: $projectId) {
        id
        members {
          edges {
            node {
              ...ProjectMemberList_ProjectMember
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
        invitations {
          edges {
            node {
              ...ProjectMemberList_ProjectMemberInvitation
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
  ${ProjectMemberList_ProjectMemberFragmentDoc}
  ${ProjectMemberList_ProjectMemberInvitationFragmentDoc}
`;

export function useProjectMemberListQuery(
  options: Omit<Urql.UseQueryArgs<ProjectMemberListQueryVariables>, 'query'>
) {
  return Urql.useQuery<ProjectMemberListQuery, ProjectMemberListQueryVariables>(
    { query: ProjectMemberListDocument, ...options }
  );
}
