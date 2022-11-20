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

export type ProfileForm_UpdateUserProfleMutationVariables = Types.Exact<{
  input: Types.UpdateUserProfileInput;
}>;

export type ProfileForm_UpdateUserProfleMutation = {
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
export const ProfileForm_UpdateUserProfleDocument = gql`
  mutation ProfileForm_UpdateUserProfle($input: UpdateUserProfileInput!) {
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

export function useProfileForm_UpdateUserProfleMutation() {
  return Urql.useMutation<
    ProfileForm_UpdateUserProfleMutation,
    ProfileForm_UpdateUserProfleMutationVariables
  >(ProfileForm_UpdateUserProfleDocument);
}
