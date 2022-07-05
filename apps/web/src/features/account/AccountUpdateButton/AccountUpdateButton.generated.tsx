import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateAccountButtonFragment = { __typename?: 'Account', id: string, name: string };

export type AccountUpdateButtonMutationVariables = Types.Exact<{
  input: Types.UpdateAccountInput;
}>;


export type AccountUpdateButtonMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } | { __typename?: 'UpdateAccountSuccessResult', result: { __typename?: 'Account', id: string, name: string } } };

export const UpdateAccountButtonFragmentDoc = gql`
    fragment UpdateAccountButton on Account {
  id
  name
}
    `;
export const AccountUpdateButtonDocument = gql`
    mutation accountUpdateButton($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    ... on UpdateAccountSuccessResult {
      result {
        ...UpdateAccountButton
      }
    }
  }
}
    ${UpdateAccountButtonFragmentDoc}`;

export function useAccountUpdateButtonMutation() {
  return Urql.useMutation<AccountUpdateButtonMutation, AccountUpdateButtonMutationVariables>(AccountUpdateButtonDocument);
};