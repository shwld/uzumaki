import * as Types from '../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SampleQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SampleQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, email: string, picture: string } | null };


export const SampleDocument = gql`
    query sample {
  viewer {
    id
    email
    picture
  }
}
    `;

export function useSampleQuery(options?: Omit<Urql.UseQueryArgs<SampleQueryVariables>, 'query'>) {
  return Urql.useQuery<SampleQuery>({ query: SampleDocument, ...options });
};