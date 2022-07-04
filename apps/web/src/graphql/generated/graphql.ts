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

export type Account = Node & {
  __typename?: 'Account';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AccountConnection = Connection & {
  __typename?: 'AccountConnection';
  edges?: Maybe<Array<Maybe<AccountEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type AccountEdge = Edge & {
  __typename?: 'AccountEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Account>;
};

export type Connection = {
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CreateAccountInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateAccountMutationResult = CreateAccountSuccessResult | InvalidArgumentsResult | UnauthorizedResult;

export type CreateAccountSuccessResult = {
  __typename?: 'CreateAccountSuccessResult';
  result: Account;
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
  createAccount: CreateAccountMutationResult;
  updateAccount: UpdateAccountMutationResult;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
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

export type UnauthorizedResult = {
  __typename?: 'UnauthorizedResult';
  errorMessage: Scalars['String'];
};

export type UpdateAccountInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateAccountMutationResult = InvalidArgumentsResult | UnauthorizedResult | UpdateAccountSuccessResult;

export type UpdateAccountSuccessResult = {
  __typename?: 'UpdateAccountSuccessResult';
  result: Account;
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
  accounts: AccountConnection;
  avatarImageUrl: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};


export type ViewerAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type AccountCreateFormResultFragment = { __typename?: 'Account', id: string, name: string };

export type AccountCreateFormMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type AccountCreateFormMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountSuccessResult', result: { __typename?: 'Account', id: string, name: string } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } };

export type AccountListResultFragment = { __typename?: 'Account', id: string, name: string };

export type AccountListQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type AccountListQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, accounts: { __typename?: 'AccountConnection', edges?: Array<{ __typename?: 'AccountEdge', cursor?: string | null, node?: { __typename?: 'Account', id: string, name: string } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } | null } } | null };

export type UpdateAccountFormFragment = { __typename?: 'Account', id: string, name: string };

export type AccountUpdateFormMutationVariables = Exact<{
  input: UpdateAccountInput;
}>;


export type AccountUpdateFormMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } | { __typename?: 'UpdateAccountSuccessResult', result: { __typename?: 'Account', id: string, name: string } } };

export const AccountCreateFormResult = gql`
    fragment AccountCreateFormResult on Account {
  id
  name
}
    `;
export const AccountListResult = gql`
    fragment AccountListResult on Account {
  id
  name
}
    `;
export const UpdateAccountForm = gql`
    fragment UpdateAccountForm on Account {
  id
  name
}
    `;
export const AccountCreateForm = gql`
    mutation accountCreateForm($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ... on CreateAccountSuccessResult {
      result {
        ...AccountCreateFormResult
      }
    }
  }
}
    ${AccountCreateFormResult}`;
export const AccountList = gql`
    query accountList($cursor: String) {
  viewer {
    id
    accounts(first: 3, after: $cursor) {
      edges {
        node {
          ...AccountListResult
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
    ${AccountListResult}`;
export const AccountUpdateForm = gql`
    mutation accountUpdateForm($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    ... on UpdateAccountSuccessResult {
      result {
        ...UpdateAccountForm
      }
    }
  }
}
    ${UpdateAccountForm}`;
export const AccountCreateFormResultFragmentDoc = gql`
    fragment AccountCreateFormResult on Account {
  id
  name
}
    `;
export const AccountListResultFragmentDoc = gql`
    fragment AccountListResult on Account {
  id
  name
}
    `;
export const UpdateAccountFormFragmentDoc = gql`
    fragment UpdateAccountForm on Account {
  id
  name
}
    `;
export const AccountCreateFormDocument = gql`
    mutation accountCreateForm($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ... on CreateAccountSuccessResult {
      result {
        ...AccountCreateFormResult
      }
    }
  }
}
    ${AccountCreateFormResultFragmentDoc}`;

export function useAccountCreateFormMutation() {
  return Urql.useMutation<AccountCreateFormMutation, AccountCreateFormMutationVariables>(AccountCreateFormDocument);
};
export const AccountListDocument = gql`
    query accountList($cursor: String) {
  viewer {
    id
    accounts(first: 3, after: $cursor) {
      edges {
        node {
          ...AccountListResult
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
    ${AccountListResultFragmentDoc}`;

export function useAccountListQuery(options?: Omit<Urql.UseQueryArgs<AccountListQueryVariables>, 'query'>) {
  return Urql.useQuery<AccountListQuery>({ query: AccountListDocument, ...options });
};
export const AccountUpdateFormDocument = gql`
    mutation accountUpdateForm($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    ... on UpdateAccountSuccessResult {
      result {
        ...UpdateAccountForm
      }
    }
  }
}
    ${UpdateAccountFormFragmentDoc}`;

export function useAccountUpdateFormMutation() {
  return Urql.useMutation<AccountUpdateFormMutation, AccountUpdateFormMutationVariables>(AccountUpdateFormDocument);
};