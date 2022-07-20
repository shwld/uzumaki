import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateAccountButton_ResultFragment = { __typename?: 'Account', id: string, name: string };

export type AccountUpdateButton_UpdateAccountMutationVariables = Types.Exact<{
  input: Types.UpdateAccountInput;
}>;


export type AccountUpdateButton_UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } | { __typename?: 'UpdateAccountSuccessResult', result: { __typename?: 'Account', id: string, name: string } } };

export const UpdateAccountButton_ResultFragmentDoc = gql`
    fragment UpdateAccountButton_Result on Account {
  id
  name
}
    `;
export const AccountUpdateButton_UpdateAccountDocument = gql`
    mutation AccountUpdateButton_UpdateAccount($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    ... on UpdateAccountSuccessResult {
      result {
        ...UpdateAccountButton_Result
      }
    }
  }
}
    ${UpdateAccountButton_ResultFragmentDoc}`;

export function useAccountUpdateButton_UpdateAccountMutation() {
  return Urql.useMutation<AccountUpdateButton_UpdateAccountMutation, AccountUpdateButton_UpdateAccountMutationVariables>(AccountUpdateButton_UpdateAccountDocument);
};