import * as Types from '../../../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type StoryItem_ItemFragment = { __typename?: 'Story', id: string, state: Types.StoryState, points?: number | undefined, isUnEstimated: boolean };

export type StoryItem_EstimateStoryMutationVariables = Types.Exact<{
  input: Types.UpdateStoryInput;
}>;


export type StoryItem_EstimateStoryMutation = { __typename?: 'Mutation', updateStory: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } | { __typename?: 'UpdateStorySuccessResult', result: { __typename?: 'Story', id: string, state: Types.StoryState, points?: number | undefined, isUnEstimated: boolean } } };

export const StoryItem_ItemFragmentDoc = gql`
    fragment StoryItem_Item on Story {
  id
  state
  points
  isUnEstimated
}
    `;
export const StoryItem_EstimateStoryDocument = gql`
    mutation StoryItem_EstimateStory($input: UpdateStoryInput!) {
  updateStory(input: $input) {
    ... on UpdateStorySuccessResult {
      result {
        ...StoryItem_Item
      }
    }
  }
}
    ${StoryItem_ItemFragmentDoc}`;

export function useStoryItem_EstimateStoryMutation() {
  return Urql.useMutation<StoryItem_EstimateStoryMutation, StoryItem_EstimateStoryMutationVariables>(StoryItem_EstimateStoryDocument);
};