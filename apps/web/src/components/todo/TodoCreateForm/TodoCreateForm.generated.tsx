import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TodoCreateFormResultFragment = { __typename?: 'Todo', id: string, title: string };

export type TodoCreateFormMutationVariables = Types.Exact<{
  input: Types.CreateTodoInput;
}>;


export type TodoCreateFormMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'CreateTodoSuccessResult', result: { __typename?: 'Todo', id: string, title: string } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } };

export const TodoCreateFormResultFragmentDoc = gql`
    fragment TodoCreateFormResult on Todo {
  id
  title
}
    `;
export const TodoCreateFormDocument = gql`
    mutation todoCreateForm($input: CreateTodoInput!) {
  createTodo(input: $input) {
    ... on CreateTodoSuccessResult {
      result {
        ...TodoCreateFormResult
      }
    }
  }
}
    ${TodoCreateFormResultFragmentDoc}`;

export function useTodoCreateFormMutation() {
  return Urql.useMutation<TodoCreateFormMutation, TodoCreateFormMutationVariables>(TodoCreateFormDocument);
};