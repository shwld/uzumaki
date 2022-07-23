import * as Types from '../../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectMemberSelect_MemberFragment = { __typename?: 'ProjectUser', id: string, role: Types.ProjectUserRole, name: string };

export type ProjectMemberSelectQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
}>;


export type ProjectMemberSelectQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, project?: { __typename?: 'Project', id: string, members: { __typename?: 'ProjectUserConnection', edges?: Array<{ __typename?: 'ProjectUserEdge', cursor?: string | undefined, node?: { __typename?: 'ProjectUser', id: string, role: Types.ProjectUserRole, name: string } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } } | undefined } | undefined };

export const ProjectMemberSelect_MemberFragmentDoc = gql`
    fragment ProjectMemberSelect_Member on ProjectUser {
  id
  role
  name
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
    ${ProjectMemberSelect_MemberFragmentDoc}`;

export function useProjectMemberSelectQuery(options: Omit<Urql.UseQueryArgs<ProjectMemberSelectQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectMemberSelectQuery>({ query: ProjectMemberSelectDocument, ...options });
};