import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type UpdateAccountFormFragment = { __typename?: 'Account', id: string, name: string };

export type AccountUpdateFormMutationVariables = Types.Exact<{
  input: Types.UpdateAccountInput;
}>;


export type AccountUpdateFormMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } | { __typename?: 'UpdateAccountSuccessResult', result: { __typename?: 'Account', id: string, name: string } } };

export const UpdateAccountFormFragmentDoc = gql`
    fragment UpdateAccountForm on Account {
  id
  name
}
    `;
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