import * as Types from '../../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type DateString = string & { __dateStringBrand: any };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectMemberSelect_MemberFragment = {
  __typename?: 'ProjectMember';
  id: string;
  role: Types.ProjectMemberRole;
  name: string;
  isMe: boolean;
};

export type ProjectMemberSelectQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
}>;

export type ProjectMemberSelectQuery = {
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
                                isMe: boolean;
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

export const ProjectMemberSelect_MemberFragmentDoc = gql`
  fragment ProjectMemberSelect_Member on ProjectMember {
    id
    role
    name
    isMe
  }
`;
export const ProjectMemberSelectDocument = gql`
  query ProjectMemberSelect($projectId: ID!) {
    viewer {
      id
      project(id: $projectId) {
        id
        members {
          edges {
            node {
              ...ProjectMemberSelect_Member
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
  ${ProjectMemberSelect_MemberFragmentDoc}
`;

export function useProjectMemberSelectQuery(
  options: Omit<Urql.UseQueryArgs<ProjectMemberSelectQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    ProjectMemberSelectQuery,
    ProjectMemberSelectQueryVariables
  >({ query: ProjectMemberSelectDocument, ...options });
}
