import * as Types from '../../../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type StoryItem_ItemFragment = {
  __typename?: 'Story';
  id: string;
  state: Types.StoryState;
  points?: number | undefined;
  isUnEstimated: boolean;
  isCompleted: boolean;
  canEstimate: boolean;
};

export type StoryItem_EstimateStoryMutationVariables = Types.Exact<{
  input: Types.EstimateStoryInput;
}>;

export type StoryItem_EstimateStoryMutation = {
  __typename?: 'Mutation';
  estimateStory:
    | {
        __typename?: 'EstimateStorySuccessResult';
        result: {
          __typename?: 'Story';
          id: string;
          state: Types.StoryState;
          points?: number | undefined;
          isUnEstimated: boolean;
          isCompleted: boolean;
          canEstimate: boolean;
        };
      }
    | { __typename?: 'InvalidArgumentsResult' }
    | { __typename?: 'UnauthorizedResult' };
};

export const StoryItem_ItemFragmentDoc = gql`
  fragment StoryItem_Item on Story {
    id
    state
    points
    isUnEstimated
    isCompleted
    canEstimate
  }
`;
export const StoryItem_EstimateStoryDocument = gql`
  mutation StoryItem_EstimateStory($input: EstimateStoryInput!) {
    estimateStory(input: $input) {
      ... on EstimateStorySuccessResult {
        result {
          ...StoryItem_Item
        }
      }
    }
  }
  ${StoryItem_ItemFragmentDoc}
`;

export function useStoryItem_EstimateStoryMutation() {
  return Urql.useMutation<
    StoryItem_EstimateStoryMutation,
    StoryItem_EstimateStoryMutationVariables
  >(StoryItem_EstimateStoryDocument);
}
