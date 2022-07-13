import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import { AccountListResultFragmentDoc } from '../AccountList/AccountList.generated';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AccountCreateButtonMutationVariables = Types.Exact<{
  input: Types.CreateAccountInput;
}>;


export type AccountCreateButtonMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountSuccessResult', result: { __typename?: 'Account', id: string, name: string, projects: { __typename?: 'ProjectConnection', edges?: Array<{ __typename?: 'ProjectEdge', cursor?: string | undefined, node?: { __typename?: 'Project', id: string, name: string } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } };


export const AccountCreateButtonDocument = gql`
    mutation accountCreateButton($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ... on CreateAccountSuccessResult {
      result {
        ...AccountListResult
      }
    }
  }
}
    ${AccountListResultFragmentDoc}`;

export function useAccountCreateButtonMutation() {
  return Urql.useMutation<AccountCreateButtonMutation, AccountCreateButtonMutationVariables>(AccountCreateButtonDocument);
};