import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectMemberList_ProjectUserFragment = { __typename?: 'ProjectUser', id: string, role: Types.ProjectUserRole, name: string, avatarImageUrl: string };

export type ProjectMemberListQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
}>;


export type ProjectMemberListQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', project?: { __typename?: 'Project', members: { __typename?: 'ProjectUserConnection', edges?: Array<{ __typename?: 'ProjectUserEdge', cursor?: string | undefined, node?: { __typename?: 'ProjectUser', id: string, role: Types.ProjectUserRole, name: string, avatarImageUrl: string } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } } | undefined } | undefined };

export const ProjectMemberList_ProjectUserFragmentDoc = gql`
    fragment ProjectMemberList_ProjectUser on ProjectUser {
  id
  role
  name
  avatarImageUrl
}
    `;
export const ProjectMemberListDocument = gql`
    query ProjectMemberList($projectId: ID!) {
  viewer {
    project(id: $projectId) {
      members {
        edges {
          node {
            ...ProjectMemberList_ProjectUser
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
    ${ProjectMemberList_ProjectUserFragmentDoc}`;

export function useProjectMemberListQuery(options: Omit<Urql.UseQueryArgs<ProjectMemberListQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectMemberListQuery>({ query: ProjectMemberListDocument, ...options });
};