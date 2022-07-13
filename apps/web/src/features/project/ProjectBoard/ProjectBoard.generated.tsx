import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectBoardStoryFragment = { __typename?: 'Story', id: string, kind: Types.StoryKind, title: string, state: Types.StoryState, position: Types.StoryPosition, priority: number, points?: number | null, isDeleted: boolean, isUnEstimated: boolean, projectId: string };

export type ProjectBoardQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
}>;


export type ProjectBoardQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, project?: { __typename?: 'Project', id: string, currentVelocity: number, stories: { __typename?: 'StoryConnection', edges?: Array<{ __typename?: 'StoryEdge', cursor?: string | null, node?: { __typename?: 'Story', id: string, kind: Types.StoryKind, title: string, state: Types.StoryState, position: Types.StoryPosition, priority: number, points?: number | null, isDeleted: boolean, isUnEstimated: boolean, projectId: string } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } | null } } | null } | null };

export const ProjectBoardStoryFragmentDoc = gql`
    fragment ProjectBoardStory on Story {
  id
  kind
  title
  state
  position
  priority
  points
  isDeleted
  isUnEstimated
  projectId
}
    `;
export const ProjectBoardDocument = gql`
    query ProjectBoard($projectId: ID!) {
  viewer {
    id
    project(id: $projectId) {
      id
      currentVelocity
      stories {
        edges {
          node {
            ...ProjectBoardStory
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
    ${ProjectBoardStoryFragmentDoc}`;

export function useProjectBoardQuery(options: Omit<Urql.UseQueryArgs<ProjectBoardQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectBoardQuery>({ query: ProjectBoardDocument, ...options });
};