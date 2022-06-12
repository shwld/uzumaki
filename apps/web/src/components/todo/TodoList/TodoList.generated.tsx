import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TodoListResultFragment = { __typename?: 'Todo', id: string, title: string };

export type TodoListQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type TodoListQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, todos: { __typename?: 'TodoConnection', edges?: Array<{ __typename?: 'TodoEdge', cursor?: string | null, node?: { __typename?: 'Todo', id: string, title: string } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } | null } } | null };

export const TodoListResultFragmentDoc = gql`
    fragment TodoListResult on Todo {
  id
  title
}
    `;
export const TodoListDocument = gql`
    query todoList($cursor: String) {
  viewer {
    id
    todos(first: 3, after: $cursor) {
      edges {
        node {
          ...TodoListResult
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
    ${TodoListResultFragmentDoc}`;

export function useTodoListQuery(options?: Omit<Urql.UseQueryArgs<TodoListQueryVariables>, 'query'>) {
  return Urql.useQuery<TodoListQuery>({ query: TodoListDocument, ...options });
};