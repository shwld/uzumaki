import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Connection = {
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CreateTodoInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateTodoMutationResult = CreateTodoSuccessResult | InvalidArgumentsResult | UnauthenticatedResult;

export type CreateTodoSuccessResult = {
  __typename?: 'CreateTodoSuccessResult';
  result: Todo;
};

export type Edge = {
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Node>;
};

export type InvalidArgumentsResult = {
  __typename?: 'InvalidArgumentsResult';
  issues: Array<ValidationIssue>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: CreateTodoMutationResult;
  updateTodoTitle: UpdateTodoTitleMutationResult;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationUpdateTodoTitleArgs = {
  input: UpdateTodoTitleInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['String']>;
};

export type PagedConnection = {
  nodes?: Maybe<Array<Maybe<Node>>>;
  pageInfo?: Maybe<PagedPageInfo>;
};

export type PagedPageInfo = {
  __typename?: 'PagedPageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  totalPagesCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  viewer?: Maybe<Viewer>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type Todo = Node & {
  __typename?: 'Todo';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TodoConnection = Connection & {
  __typename?: 'TodoConnection';
  edges?: Maybe<Array<Maybe<TodoEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type TodoEdge = Edge & {
  __typename?: 'TodoEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Todo>;
};

export type UnauthenticatedResult = {
  __typename?: 'UnauthenticatedResult';
  errorMessage: Scalars['String'];
};

export type UpdateTodoTitleInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type UpdateTodoTitleMutationResult = InvalidArgumentsResult | UnauthenticatedResult | UpdateTodoTitleSuccessResult;

export type UpdateTodoTitleSuccessResult = {
  __typename?: 'UpdateTodoTitleSuccessResult';
  result: Todo;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ValidationIssue = {
  __typename?: 'ValidationIssue';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Viewer = {
  __typename?: 'Viewer';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  picture: Scalars['String'];
  todos: TodoConnection;
  updatedAt: Scalars['DateTime'];
};


export type ViewerTodosArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type TodoCreateFormResultFragment = { __typename?: 'Todo', id: string, title: string };

export type TodoCreateFormMutationVariables = Exact<{
  input: CreateTodoInput;
}>;


export type TodoCreateFormMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'CreateTodoSuccessResult', result: { __typename?: 'Todo', id: string, title: string } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthenticatedResult' } };

export type TodoListResultFragment = { __typename?: 'Todo', id: string, title: string };

export type TodoListQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type TodoListQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, todos: { __typename?: 'TodoConnection', edges?: Array<{ __typename?: 'TodoEdge', cursor?: string | null, node?: { __typename?: 'Todo', id: string, title: string } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } | null } } | null };

export type UpdateTodoTitleFormFragment = { __typename?: 'Todo', id: string, title: string };

export type TodoUpdateTitleFormMutationVariables = Exact<{
  input: UpdateTodoTitleInput;
}>;


export type TodoUpdateTitleFormMutation = { __typename?: 'Mutation', updateTodoTitle: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthenticatedResult' } | { __typename?: 'UpdateTodoTitleSuccessResult', result: { __typename?: 'Todo', id: string, title: string } } };

export const TodoCreateFormResult = gql`
    fragment TodoCreateFormResult on Todo {
  id
  title
}
    `;
export const TodoListResult = gql`
    fragment TodoListResult on Todo {
  id
  title
}
    `;
export const UpdateTodoTitleForm = gql`
    fragment UpdateTodoTitleForm on Todo {
  id
  title
}
    `;
export const TodoCreateForm = gql`
    mutation todoCreateForm($input: CreateTodoInput!) {
  createTodo(input: $input) {
    ... on CreateTodoSuccessResult {
      result {
        ...TodoCreateFormResult
      }
    }
  }
}
    ${TodoCreateFormResult}`;
export const TodoList = gql`
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
    ${TodoListResult}`;
export const TodoUpdateTitleForm = gql`
    mutation todoUpdateTitleForm($input: UpdateTodoTitleInput!) {
  updateTodoTitle(input: $input) {
    ... on UpdateTodoTitleSuccessResult {
      result {
        ...UpdateTodoTitleForm
      }
    }
  }
}
    ${UpdateTodoTitleForm}`;
export const TodoCreateFormResultFragmentDoc = gql`
    fragment TodoCreateFormResult on Todo {
  id
  title
}
    `;
export const TodoListResultFragmentDoc = gql`
    fragment TodoListResult on Todo {
  id
  title
}
    `;
export const UpdateTodoTitleFormFragmentDoc = gql`
    fragment UpdateTodoTitleForm on Todo {
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