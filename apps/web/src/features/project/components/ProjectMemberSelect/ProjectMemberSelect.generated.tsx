import * as Types from '../../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectMemberSelectMemberFragment = { __typename?: 'User', id: string, name: string };

export type ProjectMemberSelectQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
}>;


export type ProjectMemberSelectQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, project?: { __typename?: 'Project', id: string, members: Array<{ __typename?: 'User', id: string, name: string }> } | undefined } | undefined };

export const ProjectMemberSelectMemberFragmentDoc = gql`
    fragment ProjectMemberSelectMember on User {
  id
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
        ...ProjectMemberSelectMember
      }
    }
  }
}
    ${ProjectMemberSelectMemberFragmentDoc}`;

export function useProjectMemberSelectQuery(options: Omit<Urql.UseQueryArgs<ProjectMemberSelectQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectMemberSelectQuery>({ query: ProjectMemberSelectDocument, ...options });
};