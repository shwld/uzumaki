import * as Types from "../../../../../../../graphql/generated/graphql";

import gql from "graphql-tag";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type StoryStateUpdateButton_StoryFragment = {
  __typename?: "Story";
  id: string;
  state: Types.StoryState;
};

export type StoryStateUpdateButton_UpdateStoryStateMutationVariables =
  Types.Exact<{
    input: Types.UpdateStoryStateInput;
  }>;

export type StoryStateUpdateButton_UpdateStoryStateMutation = {
  __typename?: "Mutation";
  updateStoryState:
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
        __typename?: "UpdateStoryStateSuccessResult";
        result: { __typename?: "Story"; id: string; state: Types.StoryState };
      };
};

export const StoryStateUpdateButton_StoryFragmentDoc = gql`
  fragment StoryStateUpdateButton_Story on Story {
    id
    state
  }
`;
export const StoryStateUpdateButton_UpdateStoryStateDocument = gql`
  mutation StoryStateUpdateButton_UpdateStoryState(
    $input: UpdateStoryStateInput!
  ) {
    updateStoryState(input: $input) {
      ... on UpdateStoryStateSuccessResult {
        result {
          ...StoryStateUpdateButton_Story
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
  ${StoryStateUpdateButton_StoryFragmentDoc}
`;

export function useStoryStateUpdateButton_UpdateStoryStateMutation() {
  return Urql.useMutation<
    StoryStateUpdateButton_UpdateStoryStateMutation,
    StoryStateUpdateButton_UpdateStoryStateMutationVariables
  >(StoryStateUpdateButton_UpdateStoryStateDocument);
}
