import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  sample?: Maybe<Scalars['String']>;
};

export type SampleQueryVariables = Exact<{ [key: string]: never; }>;


export type SampleQuery = { __typename?: 'Query', sample?: string | null };


export const Sample = gql`
    query sample {
  sample
}
    `;

export const SampleDocument = gql`
    query sample {
  sample
}
    `;

export function useSampleQuery(options?: Omit<Urql.UseQueryArgs<SampleQueryVariables>, 'query'>) {
  return Urql.useQuery<SampleQuery>({ query: SampleDocument, ...options });
};