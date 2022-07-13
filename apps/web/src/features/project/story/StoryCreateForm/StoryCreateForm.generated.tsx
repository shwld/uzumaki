import * as Types from '../../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type StoryCreateFormItemFragment = { __typename?: 'Story', id: string, title: string, description: string, state: Types.StoryState, kind: Types.StoryKind, points?: number | null, requesterId?: string | null, projectId: string, releaseDate?: any | null, position: Types.StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean };

export type StoryCreateFormCreateStoryMutationVariables = Types.Exact<{
  input: Types.CreateStoryInput;
}>;


export type StoryCreateFormCreateStoryMutation = { __typename?: 'Mutation', createStory: { __typename?: 'CreateStorySuccessResult', result: { __typename?: 'Story', id: string, title: string, description: string, state: Types.StoryState, kind: Types.StoryKind, points?: number | null, requesterId?: string | null, projectId: string, releaseDate?: any | null, position: Types.StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean } } | { __typename?: 'InvalidArgumentsResult', issues: Array<{ __typename?: 'ValidationIssue', field?: string | null, message?: string | null }> } | { __typename?: 'UnauthorizedResult' } };

export const StoryCreateFormItemFragmentDoc = gql`
    fragment StoryCreateFormItem on Story {
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
export const StoryCreateFormCreateStoryDocument = gql`
    mutation StoryCreateFormCreateStory($input: CreateStoryInput!) {
  createStory(input: $input) {
    ... on CreateStorySuccessResult {
      result {
        ...StoryCreateFormItem
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
    ${StoryCreateFormItemFragmentDoc}`;

export function useStoryCreateFormCreateStoryMutation() {
  return Urql.useMutation<StoryCreateFormCreateStoryMutation, StoryCreateFormCreateStoryMutationVariables>(StoryCreateFormCreateStoryDocument);
};