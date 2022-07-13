import * as Types from '../../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type StoryUpdateFormItemFragment = { __typename?: 'Story', id: string, title: string, description: string, state: Types.StoryState, kind: Types.StoryKind, points?: number | null, requesterId?: string | null, projectId: string, releaseDate?: any | null, position: Types.StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean };

export type StoryUpdateFormQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID'];
  id: Types.Scalars['ID'];
}>;


export type StoryUpdateFormQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, project?: { __typename?: 'Project', id: string, story?: { __typename?: 'Story', id: string, title: string, description: string, state: Types.StoryState, kind: Types.StoryKind, points?: number | null, requesterId?: string | null, projectId: string, releaseDate?: any | null, position: Types.StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean } | null } | null } | null };

export type StoryUpdateFormUpdateStoryMutationVariables = Types.Exact<{
  input: Types.UpdateStoryInput;
}>;


export type StoryUpdateFormUpdateStoryMutation = { __typename?: 'Mutation', updateStory: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } | { __typename?: 'UpdateStorySuccessResult', result: { __typename?: 'Story', id: string, title: string, description: string, state: Types.StoryState, kind: Types.StoryKind, points?: number | null, requesterId?: string | null, projectId: string, releaseDate?: any | null, position: Types.StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean } } };

export type StoryUpdateFormDestroyStoryMutationVariables = Types.Exact<{
  input: Types.DestroyStoryInput;
}>;


export type StoryUpdateFormDestroyStoryMutation = { __typename?: 'Mutation', destroyStory: { __typename?: 'DestroyStorySuccessResult', result: { __typename?: 'Story', id: string, title: string, description: string, state: Types.StoryState, kind: Types.StoryKind, points?: number | null, requesterId?: string | null, projectId: string, releaseDate?: any | null, position: Types.StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } };

export const StoryUpdateFormItemFragmentDoc = gql`
    fragment StoryUpdateFormItem on Story {
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
        ...StoryUpdateFormItem
      }
    }
  }
}
    ${StoryUpdateFormItemFragmentDoc}`;

export function useStoryUpdateFormQuery(options: Omit<Urql.UseQueryArgs<StoryUpdateFormQueryVariables>, 'query'>) {
  return Urql.useQuery<StoryUpdateFormQuery>({ query: StoryUpdateFormDocument, ...options });
};
export const StoryUpdateFormUpdateStoryDocument = gql`
    mutation StoryUpdateFormUpdateStory($input: UpdateStoryInput!) {
  updateStory(input: $input) {
    ... on UpdateStorySuccessResult {
      result {
        ...StoryUpdateFormItem
      }
    }
  }
}
    ${StoryUpdateFormItemFragmentDoc}`;

export function useStoryUpdateFormUpdateStoryMutation() {
  return Urql.useMutation<StoryUpdateFormUpdateStoryMutation, StoryUpdateFormUpdateStoryMutationVariables>(StoryUpdateFormUpdateStoryDocument);
};
export const StoryUpdateFormDestroyStoryDocument = gql`
    mutation StoryUpdateFormDestroyStory($input: DestroyStoryInput!) {
  destroyStory(input: $input) {
    ... on DestroyStorySuccessResult {
      result {
        ...StoryUpdateFormItem
      }
    }
  }
}
    ${StoryUpdateFormItemFragmentDoc}`;

export function useStoryUpdateFormDestroyStoryMutation() {
  return Urql.useMutation<StoryUpdateFormDestroyStoryMutation, StoryUpdateFormDestroyStoryMutationVariables>(StoryUpdateFormDestroyStoryDocument);
};