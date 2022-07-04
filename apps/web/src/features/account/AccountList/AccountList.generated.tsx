import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AccountListResultFragment = { __typename?: 'Account', id: string, name: string };

export type AccountListQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AccountListQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, accounts: { __typename?: 'AccountConnection', edges?: Array<{ __typename?: 'AccountEdge', cursor?: string | null, node?: { __typename?: 'Account', id: string, name: string } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } | null } } | null };

export const AccountListResultFragmentDoc = gql`
    fragment AccountListResult on Account {
  id
  name
}
    `;
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