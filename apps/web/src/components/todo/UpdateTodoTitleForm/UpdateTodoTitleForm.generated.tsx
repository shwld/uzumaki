import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateTodoTitleFormFragment = { __typename?: 'Todo', id: string, title: string };

export type TodoUpdateTitleFormMutationVariables = Types.Exact<{
  input: Types.UpdateTodoTitleInput;
}>;


export type TodoUpdateTitleFormMutation = { __typename?: 'Mutation', updateTodoTitle: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } | { __typename?: 'UpdateTodoTitleSuccessResult', result: { __typename?: 'Todo', id: string, title: string } } };

export const UpdateTodoTitleFormFragmentDoc = gql`
    fragment UpdateTodoTitleForm on Todo {
  id
  title
}
    `;
export const TodoUpdateTitleFormDocument = gql`
    mutation todoUpdateTitleForm($input: UpdateTodoTitleInput!) {
  updateTodoTitle(input: $input) {
    ... on UpdateTodoTitleSuccessResult {
      result {
        ...UpdateTodoTitleForm
      }
    }
  }
}
    ${UpdateTodoTitleFormFragmentDoc}`;

export function useTodoUpdateTitleFormMutation() {
  return Urql.useMutation<TodoUpdateTitleFormMutation, TodoUpdateTitleFormMutationVariables>(TodoUpdateTitleFormDocument);
};