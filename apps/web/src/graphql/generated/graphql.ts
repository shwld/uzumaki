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

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: TodoMutationResult;
};


export type MutationCreateTodoArgs = {
  input: TodoInput;
};

export type Query = {
  __typename?: 'Query';
  sample?: Maybe<Scalars['String']>;
};

export type RecordInvalidResult = {
  __typename?: 'RecordInvalidResult';
  validationErrors: Array<ValidationError>;
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TodoInput = {
  id: Scalars['String'];
  title: Scalars['String'];
};

export type TodoMutationResult = RecordInvalidResult | TodoSucessResult | UserErrorResult;

export type TodoSucessResult = {
  __typename?: 'TodoSucessResult';
  result: Todo;
};

export type UserErrorResult = {
  __typename?: 'UserErrorResult';
  errorMessage: Scalars['String'];
};

export type ValidationError = {
  __typename?: 'ValidationError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type SampleQueryVariables = Exact<{ [key: string]: never; }>;


export type SampleQuery = { __typename?: 'Query', sample?: string | null };

export type TodoCreateFormFragment = { __typename?: 'Todo', id: string, title: string };

export type TodoCreateFormMutationVariables = Exact<{
  input: TodoInput;
}>;


export type TodoCreateFormMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'RecordInvalidResult' } | { __typename?: 'TodoSucessResult', result: { __typename?: 'Todo', id: string, title: string } } | { __typename?: 'UserErrorResult' } };

export const TodoCreateForm = gql`
    fragment TodoCreateForm on Todo {
  id
  title
}
    `;
export const Sample = gql`
    query sample {
  sample
}
    `;
export const TodoCreateForm = gql`
    mutation todoCreateForm($input: TodoInput!) {
  createTodo(input: $input) {
    ... on TodoSucessResult {
      result {
        ...TodoCreateForm
      }
    }
  }
}
    ${TodoCreateForm}`;
export const TodoCreateFormFragmentDoc = gql`
    fragment TodoCreateForm on Todo {
  id
  title
}
    `;
export const SampleDocument = gql`
    query sample {
  sample
}
    `;

export function useSampleQuery(options?: Omit<Urql.UseQueryArgs<SampleQueryVariables>, 'query'>) {
  return Urql.useQuery<SampleQuery>({ query: SampleDocument, ...options });
};
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