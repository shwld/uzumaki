import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AccountListResultFragment = { __typename?: 'Account', id: string, name: string, projects: { __typename?: 'ProjectConnection', edges?: Array<{ __typename?: 'ProjectEdge', cursor?: string | null, node?: { __typename?: 'Project', id: string, name: string } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } | null } };

export type AccountListQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AccountListQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, accounts: { __typename?: 'AccountConnection', edges?: Array<{ __typename?: 'AccountEdge', cursor?: string | null, node?: { __typename?: 'Account', id: string, name: string, projects: { __typename?: 'ProjectConnection', edges?: Array<{ __typename?: 'ProjectEdge', cursor?: string | null, node?: { __typename?: 'Project', id: string, name: string } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } | null } } | null } | null> | null, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } | null } } | null };

export const AccountListResultFragmentDoc = gql`
    fragment AccountListResult on Account {
  id
  name
  projects {
    edges {
      node {
        id
        name
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;
export const AccountListDocument = gql`
    query accountList($cursor: String) {
  viewer {
    id
    accounts(first: 10, after: $cursor) {
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