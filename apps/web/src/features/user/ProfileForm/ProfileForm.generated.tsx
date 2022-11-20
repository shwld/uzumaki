import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type DateString = string;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProfileForm_UpdateResultFragment = {
  __typename?: 'UserProfile';
  id: string;
  name: string;
  avatarImageUrl: string;
};

export type ProfileForm_UserProfileQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ProfileForm_UserProfileQuery = {
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

export type ProfileForm_UpdateUserProfileMutationVariables = Types.Exact<{
  input: Types.UpdateUserProfileInput;
}>;

export type ProfileForm_UpdateUserProfileMutation = {
  __typename?: 'Mutation';
  updateUserProfile:
    | { __typename?: 'InternalErrorResult' }
    | { __typename?: 'InvalidArgumentsResult' }
    | { __typename?: 'UnauthorizedResult' }
    | {
        __typename?: 'UpdateUserProfileSuccessResult';
        result: {
          __typename?: 'UserProfile';
          id: string;
          name: string;
          avatarImageUrl: string;
        };
      };
};

export const ProfileForm_UpdateResultFragmentDoc = gql`
  fragment ProfileForm_UpdateResult on UserProfile {
    id
    name
    avatarImageUrl
  }
`;
export const ProfileForm_UserProfileDocument = gql`
  query ProfileForm_UserProfile {
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

export function useProfileForm_UserProfileQuery(
  options?: Omit<
    Urql.UseQueryArgs<ProfileForm_UserProfileQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    ProfileForm_UserProfileQuery,
    ProfileForm_UserProfileQueryVariables
  >({ query: ProfileForm_UserProfileDocument, ...options });
}
export const ProfileForm_UpdateUserProfileDocument = gql`
  mutation ProfileForm_UpdateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      ... on UpdateUserProfileSuccessResult {
        result {
          ...ProfileForm_UpdateResult
        }
      }
    }
  }
  ${ProfileForm_UpdateResultFragmentDoc}
`;

export function useProfileForm_UpdateUserProfileMutation() {
  return Urql.useMutation<
    ProfileForm_UpdateUserProfileMutation,
    ProfileForm_UpdateUserProfileMutationVariables
  >(ProfileForm_UpdateUserProfileDocument);
}
