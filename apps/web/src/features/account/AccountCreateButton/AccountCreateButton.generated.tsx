import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AccountCreateButtonResultFragment = { __typename?: 'Account', id: string, name: string };

export type AccountCreateButtonMutationVariables = Types.Exact<{
  input: Types.CreateAccountInput;
}>;


export type AccountCreateButtonMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountSuccessResult', result: { __typename?: 'Account', id: string, name: string } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } };

export const AccountCreateButtonResultFragmentDoc = gql`
    fragment AccountCreateButtonResult on Account {
  id
  name
}
    `;
export const AccountCreateButtonDocument = gql`
    mutation accountCreateButton($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ... on CreateAccountSuccessResult {
      result {
        ...AccountCreateButtonResult
      }
    }
  }
}
    ${AccountCreateButtonResultFragmentDoc}`;

export function useAccountCreateButtonMutation() {
  return Urql.useMutation<AccountCreateButtonMutation, AccountCreateButtonMutationVariables>(AccountCreateButtonDocument);
};