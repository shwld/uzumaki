import * as Types from '../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type DateString = string;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type AppLayout_UserQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type AppLayout_UserQuery = {
  __typename?: 'Query';
  viewer?:
    | {
        __typename?: 'Viewer';
        id: string;
        profile: {
          __typename?: 'UserProfile';
          id: string;
          name: string;
          avatarImageUrl: string;
        };
      }
    | undefined;
};

export const AppLayout_UserDocument = gql`
  query AppLayout_User {
    viewer {
      id
      profile {
        id
        name
        avatarImageUrl
      }
    }
  }
`;

export function useAppLayout_UserQuery(
  options?: Omit<Urql.UseQueryArgs<AppLayout_UserQueryVariables>, 'query'>
) {
  return Urql.useQuery<AppLayout_UserQuery, AppLayout_UserQueryVariables>({
    query: AppLayout_UserDocument,
    ...options,
  });
}
