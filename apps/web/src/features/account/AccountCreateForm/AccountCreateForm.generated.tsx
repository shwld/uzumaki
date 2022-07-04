import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AccountCreateFormResultFragment = { __typename?: 'Account', id: string, name: string };

export type AccountCreateFormMutationVariables = Types.Exact<{
  input: Types.CreateAccountInput;
}>;


export type AccountCreateFormMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountSuccessResult', result: { __typename?: 'Account', id: string, name: string } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } };

export const AccountCreateFormResultFragmentDoc = gql`
    fragment AccountCreateFormResult on Account {
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