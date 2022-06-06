import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TodoCreateFormFragment = { __typename?: 'Todo', id: string, title: string };

export type TodoCreateFormMutationVariables = Types.Exact<{
  input: Types.TodoInput;
}>;


export type TodoCreateFormMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'RecordInvalidResult' } | { __typename?: 'TodoSucessResult', result: { __typename?: 'Todo', id: string, title: string } } | { __typename?: 'UserErrorResult' } };

export const TodoCreateFormFragmentDoc = gql`
    fragment TodoCreateForm on Todo {
  id
  title
}
    `;
export const TodoCreateFormDocument = gql`
    mutation todoCreateForm($input: TodoInput!) {
  createTodo(input: $input) {
    ... on TodoSucessResult {
      result {
        ...TodoCreateForm
      }
    }
  }
}
    ${TodoCreateFormFragmentDoc}`;

export function useTodoCreateFormMutation() {
  return Urql.useMutation<TodoCreateFormMutation, TodoCreateFormMutationVariables>(TodoCreateFormDocument);
};