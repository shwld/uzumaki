import * as Types from '../../../graphql/generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ProjectCreateButtonResultFragment = { __typename?: 'Project', id: string, name: string, description: string, privacy: Types.ProjectPrivacy, currentVelocity: number, createdAt: any, accountId: string };

export type ProjectCreateButtonMutationVariables = Types.Exact<{
  input: Types.CreateProjectInput;
}>;


export type ProjectCreateButtonMutation = { __typename?: 'Mutation', createProject: { __typename?: 'CreateProjectSuccessResult', result: { __typename?: 'Project', id: string, name: string, description: string, privacy: Types.ProjectPrivacy, currentVelocity: number, createdAt: any, accountId: string } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } };

export const ProjectCreateButtonResultFragmentDoc = gql`
    fragment ProjectCreateButtonResult on Project {
  id
  name
  description
  privacy
  currentVelocity
  createdAt
  accountId
}
    `;
export const ProjectCreateButtonDocument = gql`
    mutation projectCreateButton($input: CreateProjectInput!) {
  createProject(input: $input) {
    ... on CreateProjectSuccessResult {
      result {
        ...ProjectCreateButtonResult
      }
    }
  }
}
    ${ProjectCreateButtonResultFragmentDoc}`;

export function useProjectCreateButtonMutation() {
  return Urql.useMutation<ProjectCreateButtonMutation, ProjectCreateButtonMutationVariables>(ProjectCreateButtonDocument);
};