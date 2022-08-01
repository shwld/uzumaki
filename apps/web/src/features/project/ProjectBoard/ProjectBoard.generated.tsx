import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectBoard_StoryFragment = {
  __typename?: 'Story';
  id: string;
  kind: Types.StoryKind;
  title: string;
  state: Types.StoryState;
  position: Types.StoryPosition;
  priority: number;
  points?: number | undefined;
  isDeleted: boolean;
  isUnEstimated: boolean;
  projectId: string;
};

export type ProjectBoardQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
  storySearchInput?: Types.InputMaybe<Types.ProjectStoriesSearchInput>;
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type ProjectBoardQuery = {
  __typename?: 'Query';
  viewer?:
    | {
        __typename?: 'Viewer';
        id: string;
        project?:
          | {
              __typename?: 'Project';
              id: string;
              currentVelocity: number;
              stories: {
                __typename?: 'StoryConnection';
                edges?:
                  | Array<
                      | {
                          __typename?: 'StoryEdge';
                          cursor?: string | undefined;
                          node?:
                            | {
                                __typename?: 'Story';
                                id: string;
                                kind: Types.StoryKind;
                                title: string;
                                state: Types.StoryState;
                                position: Types.StoryPosition;
                                priority: number;
                                points?: number | undefined;
                                isDeleted: boolean;
                                isUnEstimated: boolean;
                                projectId: string;
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

export type ProjectBoard_MoveStoriesMutationVariables = Types.Exact<{
  input: Types.MoveStoriesInput;
}>;

export type ProjectBoard_MoveStoriesMutation = {
  __typename?: 'Mutation';
  moveStories:
    | {
        __typename?: 'InvalidArgumentsResult';
        issues: Array<{
          __typename?: 'ValidationIssue';
          field?: string | undefined;
          message?: string | undefined;
        }>;
      }
    | {
        __typename?: 'MoveStoriesSuccessResult';
        result: Array<{
          __typename?: 'Story';
          id: string;
          position: Types.StoryPosition;
          priority: number;
        }>;
      }
    | { __typename?: 'UnauthorizedResult' };
};

export const ProjectBoard_StoryFragmentDoc = gql`
  fragment ProjectBoard_Story on Story {
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
  query ProjectBoard(
    $projectId: ID!
    $storySearchInput: ProjectStoriesSearchInput
    $cursor: String
  ) {
    viewer {
      id
      project(id: $projectId) {
        id
        currentVelocity
        stories(input: $storySearchInput, first: 100, after: $cursor) {
          edges {
            node {
              ...ProjectBoard_Story
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
  ${ProjectBoard_StoryFragmentDoc}
`;

export function useProjectBoardQuery(
  options: Omit<Urql.UseQueryArgs<ProjectBoardQueryVariables>, 'query'>
) {
  return Urql.useQuery<ProjectBoardQuery>({
    query: ProjectBoardDocument,
    ...options,
  });
}
export const ProjectBoard_MoveStoriesDocument = gql`
  mutation ProjectBoard_MoveStories($input: MoveStoriesInput!) {
    moveStories(input: $input) {
      ... on MoveStoriesSuccessResult {
        result {
          id
          position
          priority
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
`;

export function useProjectBoard_MoveStoriesMutation() {
  return Urql.useMutation<
    ProjectBoard_MoveStoriesMutation,
    ProjectBoard_MoveStoriesMutationVariables
  >(ProjectBoard_MoveStoriesDocument);
}
