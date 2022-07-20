import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AccountList_ResultFragment = { __typename?: 'Account', id: string, name: string, projects: { __typename?: 'ProjectConnection', edges?: Array<{ __typename?: 'ProjectEdge', cursor?: string | undefined, node?: { __typename?: 'Project', id: string, name: string } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } };

export type AccountListQueryVariables = Types.Exact<{
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type AccountListQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, accounts: { __typename?: 'AccountConnection', edges?: Array<{ __typename?: 'AccountEdge', cursor?: string | undefined, node?: { __typename?: 'Account', id: string, name: string, projects: { __typename?: 'ProjectConnection', edges?: Array<{ __typename?: 'ProjectEdge', cursor?: string | undefined, node?: { __typename?: 'Project', id: string, name: string } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } } | undefined };

export const AccountList_ResultFragmentDoc = gql`
    fragment AccountList_Result on Account {
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
    query AccountList($cursor: String) {
  viewer {
    id
    accounts(first: 10, after: $cursor) {
      edges {
        node {
          ...AccountList_Result
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
    ${AccountList_ResultFragmentDoc}`;

export function useAccountListQuery(options?: Omit<Urql.UseQueryArgs<AccountListQueryVariables>, 'query'>) {
  return Urql.useQuery<AccountListQuery>({ query: AccountListDocument, ...options });
};