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
  isCompleted: boolean;
  projectId: string;
};

export type ProjectBoardQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
  position?: Types.InputMaybe<Types.ProjectStoriesSearchPosition>;
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
              boardStatus: {
                __typename?: 'ProjectBoardStatus';
                id: string;
                velocity: number;
              };
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
                                isCompleted: boolean;
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

export type ProjectBoard_SubscSubscriptionVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ProjectBoard_SubscSubscription = {
  __typename?: 'Subscription';
  greetings?: string | undefined;
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
    isCompleted
    projectId
  }
`;
export const ProjectBoardDocument = gql`
  query ProjectBoard(
    $projectId: ID!
    $position: ProjectStoriesSearchPosition
    $cursor: String
  ) {
    viewer {
      id
      project(id: $projectId) {
        id
        boardStatus {
          id
          velocity
        }
        stories(position: $position, first: 50, after: $cursor) {
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
export const ProjectBoard_SubscDocument = gql`
  subscription ProjectBoard_Subsc {
    greetings
  }
`;

export function useProjectBoard_SubscSubscription<
  TData = ProjectBoard_SubscSubscription
>(
  options: Omit<
    Urql.UseSubscriptionArgs<ProjectBoard_SubscSubscriptionVariables>,
    'query'
  > = {},
  handler?: Urql.SubscriptionHandler<ProjectBoard_SubscSubscription, TData>
) {
  return Urql.useSubscription<
    ProjectBoard_SubscSubscription,
    TData,
    ProjectBoard_SubscSubscriptionVariables
  >({ query: ProjectBoard_SubscDocument, ...options }, handler);
}
