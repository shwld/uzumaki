import * as Types from '../../../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type StoryCreateForm_ItemFragment = {
  __typename?: 'Story';
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
  isCompleted: boolean;
  isDeleted: boolean;
};

export type StoryCreateForm_CreateStoryMutationVariables = Types.Exact<{
  input: Types.CreateStoryInput;
}>;

export type StoryCreateForm_CreateStoryMutation = {
  __typename?: 'Mutation';
  createStory:
    | {
        __typename?: 'CreateStorySuccessResult';
        result: {
          __typename?: 'Story';
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
          isCompleted: boolean;
          isDeleted: boolean;
        };
      }
    | {
        __typename?: 'InvalidArgumentsResult';
        issues: Array<{
          __typename?: 'ValidationIssue';
          field?: string | undefined;
          message?: string | undefined;
        }>;
      }
    | { __typename?: 'UnauthorizedResult' };
};

export const StoryCreateForm_ItemFragmentDoc = gql`
  fragment StoryCreateForm_Item on Story {
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
    isCompleted
    isDeleted
  }
`;
export const StoryCreateForm_CreateStoryDocument = gql`
  mutation StoryCreateForm_CreateStory($input: CreateStoryInput!) {
    createStory(input: $input) {
      ... on CreateStorySuccessResult {
        result {
          ...StoryCreateForm_Item
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
  ${StoryCreateForm_ItemFragmentDoc}
`;

export function useStoryCreateForm_CreateStoryMutation() {
  return Urql.useMutation<
    StoryCreateForm_CreateStoryMutation,
    StoryCreateForm_CreateStoryMutationVariables
  >(StoryCreateForm_CreateStoryDocument);
}
