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
  completedAt?: any | undefined;
  projectId: string;
};

export type ProjectBoard_ProjectFragment = {
  __typename?: 'Project';
  id: string;
  boardConfig: {
    __typename?: 'ProjectBoardConfig';
    id: string;
    startOn?: any | undefined;
    startIterationWeekNumber: number;
    iterationLength: number;
  };
  boardStatus: {
    __typename?: 'ProjectBoardStatus';
    id: string;
    velocity: number;
  };
};

export type ProjectBoard_StatusQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
}>;

export type ProjectBoard_StatusQuery = {
  __typename?: 'Query';
  viewer?:
    | {
        __typename?: 'Viewer';
        id: string;
        project?:
          | {
              __typename?: 'Project';
              id: string;
              boardConfig: {
                __typename?: 'ProjectBoardConfig';
                id: string;
                startOn?: any | undefined;
                startIterationWeekNumber: number;
                iterationLength: number;
              };
              boardStatus: {
                __typename?: 'ProjectBoardStatus';
                id: string;
                velocity: number;
              };
            }
          | undefined;
      }
    | undefined;
};

export type ProjectBoard_StoriesQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
  position?: Types.InputMaybe<Types.ProjectStoriesSearchPosition>;
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type ProjectBoard_StoriesQuery = {
  __typename?: 'Query';
  viewer?:
    | {
        __typename?: 'Viewer';
        id: string;
        project?:
          | {
              __typename?: 'Project';
              id: string;
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
                                completedAt?: any | undefined;
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
  projectId: Types.Scalars['ID'];
}>;

export type ProjectBoard_SubscSubscription = {
  __typename?: 'Subscription';
  subscribeStoryUpdate?: { __typename?: 'Story'; id: string } | undefined;
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
    completedAt
    projectId
  }
`;
export const ProjectBoard_ProjectFragmentDoc = gql`
  fragment ProjectBoard_Project on Project {
    id
    boardConfig {
      id
      startOn
      startIterationWeekNumber
      iterationLength
    }
    boardStatus {
      id
      velocity
    }
  }
`;
export const ProjectBoard_StatusDocument = gql`
  query ProjectBoard_Status($projectId: ID!) {
    viewer {
      id
      project(id: $projectId) {
        ...ProjectBoard_Project
      }
    }
  }
  ${ProjectBoard_ProjectFragmentDoc}
`;

export function useProjectBoard_StatusQuery(
  options: Omit<Urql.UseQueryArgs<ProjectBoard_StatusQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    ProjectBoard_StatusQuery,
    ProjectBoard_StatusQueryVariables
  >({ query: ProjectBoard_StatusDocument, ...options });
}
export const ProjectBoard_StoriesDocument = gql`
  query ProjectBoard_Stories(
    $projectId: ID!
    $position: ProjectStoriesSearchPosition
    $cursor: String
  ) {
    viewer {
      id
      project(id: $projectId) {
        id
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

export function useProjectBoard_StoriesQuery(
  options: Omit<Urql.UseQueryArgs<ProjectBoard_StoriesQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    ProjectBoard_StoriesQuery,
    ProjectBoard_StoriesQueryVariables
  >({ query: ProjectBoard_StoriesDocument, ...options });
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
  subscription ProjectBoard_Subsc($projectId: ID!) {
    subscribeStoryUpdate(projectId: $projectId) {
      id
    }
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
