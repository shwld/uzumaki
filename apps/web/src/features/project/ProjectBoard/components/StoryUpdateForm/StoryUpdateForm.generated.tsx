import * as Types from "../../../../../graphql/generated/graphql";

import gql from "graphql-tag";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type StoryUpdateForm_ItemFragment = {
  __typename?: "Story";
  id: string;
  title: string;
  description: string;
  state: Types.StoryState;
  kind: Types.StoryKind;
  points?: number | undefined;
  requesterId: string;
  projectId: string;
  releaseDate?: any | undefined;
  position: Types.StoryPosition;
  priority: number;
  createdAt: any;
  updatedAt: any;
  isUnEstimated: boolean;
  isDeleted: boolean;
};

export type StoryUpdateFormQueryVariables = Types.Exact<{
  projectId: Types.Scalars["ID"];
  id: Types.Scalars["ID"];
}>;

export type StoryUpdateFormQuery = {
  __typename?: "Query";
  viewer?:
    | {
        __typename?: "Viewer";
        id: string;
        project?:
          | {
              __typename?: "Project";
              id: string;
              story?:
                | {
                    __typename?: "Story";
                    id: string;
                    title: string;
                    description: string;
                    state: Types.StoryState;
                    kind: Types.StoryKind;
                    points?: number | undefined;
                    requesterId: string;
                    projectId: string;
                    releaseDate?: any | undefined;
                    position: Types.StoryPosition;
                    priority: number;
                    createdAt: any;
                    updatedAt: any;
                    isUnEstimated: boolean;
                    isDeleted: boolean;
                  }
                | undefined;
            }
          | undefined;
      }
    | undefined;
};

export type StoryUpdateForm_UpdateStoryMutationVariables = Types.Exact<{
  input: Types.UpdateStoryInput;
}>;

export type StoryUpdateForm_UpdateStoryMutation = {
  __typename?: "Mutation";
  updateStory:
    | {
        __typename?: "InvalidArgumentsResult";
        issues: Array<{
          __typename?: "ValidationIssue";
          field?: string | undefined;
          message?: string | undefined;
        }>;
      }
    | { __typename?: "UnauthorizedResult" }
    | {
        __typename?: "UpdateStorySuccessResult";
        result: {
          __typename?: "Story";
          id: string;
          title: string;
          description: string;
          state: Types.StoryState;
          kind: Types.StoryKind;
          points?: number | undefined;
          requesterId: string;
          projectId: string;
          releaseDate?: any | undefined;
          position: Types.StoryPosition;
          priority: number;
          createdAt: any;
          updatedAt: any;
          isUnEstimated: boolean;
          isDeleted: boolean;
        };
      };
};

export type StoryUpdateForm_DestroyStoryMutationVariables = Types.Exact<{
  input: Types.DestroyStoryInput;
}>;

export type StoryUpdateForm_DestroyStoryMutation = {
  __typename?: "Mutation";
  destroyStory:
    | {
        __typename?: "DestroyStorySuccessResult";
        result: {
          __typename?: "Story";
          id: string;
          title: string;
          description: string;
          state: Types.StoryState;
          kind: Types.StoryKind;
          points?: number | undefined;
          requesterId: string;
          projectId: string;
          releaseDate?: any | undefined;
          position: Types.StoryPosition;
          priority: number;
          createdAt: any;
          updatedAt: any;
          isUnEstimated: boolean;
          isDeleted: boolean;
        };
      }
    | {
        __typename?: "InvalidArgumentsResult";
        issues: Array<{
          __typename?: "ValidationIssue";
          field?: string | undefined;
          message?: string | undefined;
        }>;
      }
    | { __typename?: "UnauthorizedResult" };
};

export const StoryUpdateForm_ItemFragmentDoc = gql`
  fragment StoryUpdateForm_Item on Story {
    id
    title
    description
    state
    kind
    points
    requesterId
    projectId
    releaseDate
    position
    priority
    createdAt
    updatedAt
    isUnEstimated
    isDeleted
  }
`;
export const StoryUpdateFormDocument = gql`
  query StoryUpdateForm($projectId: ID!, $id: ID!) {
    viewer {
      id
      project(id: $projectId) {
        id
        story(id: $id) {
          ...StoryUpdateForm_Item
        }
      }
    }
  }
  ${StoryUpdateForm_ItemFragmentDoc}
`;

export function useStoryUpdateFormQuery(
  options: Omit<Urql.UseQueryArgs<StoryUpdateFormQueryVariables>, "query">
) {
  return Urql.useQuery<StoryUpdateFormQuery>({
    query: StoryUpdateFormDocument,
    ...options,
  });
}
export const StoryUpdateForm_UpdateStoryDocument = gql`
  mutation StoryUpdateForm_UpdateStory($input: UpdateStoryInput!) {
    updateStory(input: $input) {
      ... on UpdateStorySuccessResult {
        result {
          ...StoryUpdateForm_Item
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
  ${StoryUpdateForm_ItemFragmentDoc}
`;

export function useStoryUpdateForm_UpdateStoryMutation() {
  return Urql.useMutation<
    StoryUpdateForm_UpdateStoryMutation,
    StoryUpdateForm_UpdateStoryMutationVariables
  >(StoryUpdateForm_UpdateStoryDocument);
}
export const StoryUpdateForm_DestroyStoryDocument = gql`
  mutation StoryUpdateForm_DestroyStory($input: DestroyStoryInput!) {
    destroyStory(input: $input) {
      ... on DestroyStorySuccessResult {
        result {
          ...StoryUpdateForm_Item
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
  ${StoryUpdateForm_ItemFragmentDoc}
`;

export function useStoryUpdateForm_DestroyStoryMutation() {
  return Urql.useMutation<
    StoryUpdateForm_DestroyStoryMutation,
    StoryUpdateForm_DestroyStoryMutationVariables
  >(StoryUpdateForm_DestroyStoryDocument);
}
