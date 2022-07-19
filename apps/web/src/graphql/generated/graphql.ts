import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
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
  DateTime: any;
};

export type Account = Node & {
  __typename?: 'Account';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  name: Scalars['String'];
  projects: ProjectConnection;
  updatedAt: Scalars['DateTime'];
};

export type AccountConnection = Connection & {
  __typename?: 'AccountConnection';
  edges?: Maybe<Array<Maybe<AccountEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type AccountEdge = Edge & {
  __typename?: 'AccountEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Account>;
};

export type Connection = {
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CreateAccountInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateAccountMutationResult = CreateAccountSuccessResult | InvalidArgumentsResult | UnauthorizedResult;

export type CreateAccountSuccessResult = {
  __typename?: 'CreateAccountSuccessResult';
  result: Account;
};

export type CreateProjectInput = {
  accountId: Scalars['ID'];
  currentVelocity: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  privacy: ProjectPrivacy;
};

export type CreateProjectMutationResult = CreateProjectSuccessResult | InvalidArgumentsResult | UnauthorizedResult;

export type CreateProjectSuccessResult = {
  __typename?: 'CreateProjectSuccessResult';
  result: Project;
};

export type CreateStoryInput = {
  description: Scalars['String'];
  id: Scalars['ID'];
  kind: StoryKind;
  points?: InputMaybe<Scalars['Int']>;
  position: StoryPosition;
  priority: Scalars['Int'];
  projectId: Scalars['ID'];
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  state: StoryState;
  title: Scalars['String'];
};

export type CreateStoryMutationResult = CreateStorySuccessResult | InvalidArgumentsResult | UnauthorizedResult;

export type CreateStorySuccessResult = {
  __typename?: 'CreateStorySuccessResult';
  result: Story;
};

export type DestroyStoryInput = {
  id: Scalars['ID'];
};

export type DestroyStoryMutationResult = DestroyStorySuccessResult | InvalidArgumentsResult | UnauthorizedResult;

export type DestroyStorySuccessResult = {
  __typename?: 'DestroyStorySuccessResult';
  result: Story;
};

export type Edge = {
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Node>;
};

export type InvalidArgumentsResult = {
  __typename?: 'InvalidArgumentsResult';
  issues: Array<ValidationIssue>;
};

export type MoveStoriesInput = {
  projectId: Scalars['ID'];
  stories: Array<MoveStoriesStoryDestination>;
};

export type MoveStoriesMutationResult = InvalidArgumentsResult | MoveStoriesSuccessResult | UnauthorizedResult;

export type MoveStoriesStoryDestination = {
  id: Scalars['ID'];
  position: StoryPosition;
  priority: Scalars['Int'];
};

export type MoveStoriesSuccessResult = {
  __typename?: 'MoveStoriesSuccessResult';
  result: Array<Story>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountMutationResult;
  createProject: CreateProjectMutationResult;
  createStory: CreateStoryMutationResult;
  destroyStory: DestroyStoryMutationResult;
  moveStories: MoveStoriesMutationResult;
  updateAccount: UpdateAccountMutationResult;
  updateStory: UpdateStoryMutationResult;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateStoryArgs = {
  input: CreateStoryInput;
};


export type MutationDestroyStoryArgs = {
  input: DestroyStoryInput;
};


export type MutationMoveStoriesArgs = {
  input: MoveStoriesInput;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationUpdateStoryArgs = {
  input: UpdateStoryInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['String']>;
};

export type PagedConnection = {
  nodes?: Maybe<Array<Maybe<Node>>>;
  pageInfo?: Maybe<PagedPageInfo>;
};

export type PagedPageInfo = {
  __typename?: 'PagedPageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  totalPagesCount?: Maybe<Scalars['Int']>;
};

export type Project = Node & {
  __typename?: 'Project';
  accountId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  currentVelocity: Scalars['Int'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  members: Array<User>;
  name: Scalars['String'];
  privacy: ProjectPrivacy;
  stories: StoryConnection;
  story?: Maybe<Story>;
  updatedAt: Scalars['DateTime'];
};


export type ProjectStoryArgs = {
  id: Scalars['ID'];
};

export type ProjectConnection = Connection & {
  __typename?: 'ProjectConnection';
  edges?: Maybe<Array<Maybe<ProjectEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ProjectEdge = Edge & {
  __typename?: 'ProjectEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Project>;
};

export enum ProjectPrivacy {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  viewer?: Maybe<Viewer>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type Story = Node & {
  __typename?: 'Story';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isDeleted: Scalars['Boolean'];
  isUnEstimated: Scalars['Boolean'];
  kind: StoryKind;
  owners: Array<User>;
  points?: Maybe<Scalars['Int']>;
  position: StoryPosition;
  priority: Scalars['Int'];
  project?: Maybe<Project>;
  projectId: Scalars['ID'];
  releaseDate?: Maybe<Scalars['DateTime']>;
  requester?: Maybe<User>;
  requesterId?: Maybe<Scalars['ID']>;
  state: StoryState;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type StoryConnection = Connection & {
  __typename?: 'StoryConnection';
  edges?: Maybe<Array<Maybe<StoryEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type StoryEdge = Edge & {
  __typename?: 'StoryEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Story>;
};

export enum StoryKind {
  Bug = 'BUG',
  Chore = 'CHORE',
  Feature = 'FEATURE',
  Release = 'RELEASE'
}

export enum StoryPosition {
  Backlog = 'BACKLOG',
  Current = 'CURRENT',
  Done = 'DONE',
  Icebox = 'ICEBOX'
}

export enum StoryState {
  Accepted = 'ACCEPTED',
  Delivered = 'DELIVERED',
  Finished = 'FINISHED',
  Rejected = 'REJECTED',
  Started = 'STARTED',
  Unstarted = 'UNSTARTED'
}

export type UnauthorizedResult = {
  __typename?: 'UnauthorizedResult';
  errorMessage: Scalars['String'];
};

export type UpdateAccountInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateAccountMutationResult = InvalidArgumentsResult | UnauthorizedResult | UpdateAccountSuccessResult;

export type UpdateAccountSuccessResult = {
  __typename?: 'UpdateAccountSuccessResult';
  result: Account;
};

export type UpdateStoryInput = {
  description: Scalars['String'];
  id: Scalars['ID'];
  kind: StoryKind;
  points?: InputMaybe<Scalars['Int']>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  requesterId?: InputMaybe<Scalars['ID']>;
  state: StoryState;
  title: Scalars['String'];
};

export type UpdateStoryMutationResult = InvalidArgumentsResult | UnauthorizedResult | UpdateStorySuccessResult;

export type UpdateStorySuccessResult = {
  __typename?: 'UpdateStorySuccessResult';
  result: Story;
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UserConnection = Connection & {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type UserEdge = Edge & {
  __typename?: 'UserEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<User>;
};

export type ValidationIssue = {
  __typename?: 'ValidationIssue';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Viewer = {
  __typename?: 'Viewer';
  accounts: AccountConnection;
  avatarImageUrl: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  project?: Maybe<Project>;
  updatedAt: Scalars['DateTime'];
};


export type ViewerAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};


export type ViewerProjectArgs = {
  id: Scalars['ID'];
};

export type AccountCreateButtonMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type AccountCreateButtonMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'CreateAccountSuccessResult', result: { __typename?: 'Account', id: string, name: string, projects: { __typename?: 'ProjectConnection', edges?: Array<{ __typename?: 'ProjectEdge', cursor?: string | undefined, node?: { __typename?: 'Project', id: string, name: string } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } };

export type AccountListResultFragment = { __typename?: 'Account', id: string, name: string, projects: { __typename?: 'ProjectConnection', edges?: Array<{ __typename?: 'ProjectEdge', cursor?: string | undefined, node?: { __typename?: 'Project', id: string, name: string } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } };

export type AccountListQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type AccountListQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, accounts: { __typename?: 'AccountConnection', edges?: Array<{ __typename?: 'AccountEdge', cursor?: string | undefined, node?: { __typename?: 'Account', id: string, name: string, projects: { __typename?: 'ProjectConnection', edges?: Array<{ __typename?: 'ProjectEdge', cursor?: string | undefined, node?: { __typename?: 'Project', id: string, name: string } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } } | undefined };

export type UpdateAccountButtonFragment = { __typename?: 'Account', id: string, name: string };

export type AccountUpdateButtonMutationVariables = Exact<{
  input: UpdateAccountInput;
}>;


export type AccountUpdateButtonMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } | { __typename?: 'UpdateAccountSuccessResult', result: { __typename?: 'Account', id: string, name: string } } };

export type ProjectBoardStoryFragment = { __typename?: 'Story', id: string, kind: StoryKind, title: string, state: StoryState, position: StoryPosition, priority: number, points?: number | undefined, isDeleted: boolean, isUnEstimated: boolean, projectId: string };

export type ProjectBoardQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type ProjectBoardQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, project?: { __typename?: 'Project', id: string, currentVelocity: number, stories: { __typename?: 'StoryConnection', edges?: Array<{ __typename?: 'StoryEdge', cursor?: string | undefined, node?: { __typename?: 'Story', id: string, kind: StoryKind, title: string, state: StoryState, position: StoryPosition, priority: number, points?: number | undefined, isDeleted: boolean, isUnEstimated: boolean, projectId: string } | undefined } | undefined> | undefined, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | undefined } | undefined } } | undefined } | undefined };

export type ProjectBoardMoveStoriesMutationVariables = Exact<{
  input: MoveStoriesInput;
}>;


export type ProjectBoardMoveStoriesMutation = { __typename?: 'Mutation', moveStories: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'MoveStoriesSuccessResult', result: Array<{ __typename?: 'Story', id: string, position: StoryPosition, priority: number }> } | { __typename?: 'UnauthorizedResult' } };

export type StoryCreateFormItemFragment = { __typename?: 'Story', id: string, title: string, description: string, state: StoryState, kind: StoryKind, points?: number | undefined, requesterId?: string | undefined, projectId: string, releaseDate?: any | undefined, position: StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean };

export type StoryCreateFormCreateStoryMutationVariables = Exact<{
  input: CreateStoryInput;
}>;


export type StoryCreateFormCreateStoryMutation = { __typename?: 'Mutation', createStory: { __typename?: 'CreateStorySuccessResult', result: { __typename?: 'Story', id: string, title: string, description: string, state: StoryState, kind: StoryKind, points?: number | undefined, requesterId?: string | undefined, projectId: string, releaseDate?: any | undefined, position: StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean } } | { __typename?: 'InvalidArgumentsResult', issues: Array<{ __typename?: 'ValidationIssue', field?: string | undefined, message?: string | undefined }> } | { __typename?: 'UnauthorizedResult' } };

export type StoryUpdateFormItemFragment = { __typename?: 'Story', id: string, title: string, description: string, state: StoryState, kind: StoryKind, points?: number | undefined, requesterId?: string | undefined, projectId: string, releaseDate?: any | undefined, position: StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean };

export type StoryUpdateFormQueryVariables = Exact<{
  projectId: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type StoryUpdateFormQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, project?: { __typename?: 'Project', id: string, story?: { __typename?: 'Story', id: string, title: string, description: string, state: StoryState, kind: StoryKind, points?: number | undefined, requesterId?: string | undefined, projectId: string, releaseDate?: any | undefined, position: StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean } | undefined } | undefined } | undefined };

export type StoryUpdateFormUpdateStoryMutationVariables = Exact<{
  input: UpdateStoryInput;
}>;


export type StoryUpdateFormUpdateStoryMutation = { __typename?: 'Mutation', updateStory: { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } | { __typename?: 'UpdateStorySuccessResult', result: { __typename?: 'Story', id: string, title: string, description: string, state: StoryState, kind: StoryKind, points?: number | undefined, requesterId?: string | undefined, projectId: string, releaseDate?: any | undefined, position: StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean } } };

export type StoryUpdateFormDestroyStoryMutationVariables = Exact<{
  input: DestroyStoryInput;
}>;


export type StoryUpdateFormDestroyStoryMutation = { __typename?: 'Mutation', destroyStory: { __typename?: 'DestroyStorySuccessResult', result: { __typename?: 'Story', id: string, title: string, description: string, state: StoryState, kind: StoryKind, points?: number | undefined, requesterId?: string | undefined, projectId: string, releaseDate?: any | undefined, position: StoryPosition, priority: number, createdAt: any, updatedAt: any, isUnEstimated: boolean, isDeleted: boolean } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } };

export type ProjectCreateButtonResultFragment = { __typename?: 'Project', id: string, name: string, description: string, privacy: ProjectPrivacy, currentVelocity: number, createdAt: any, accountId: string };

export type ProjectCreateButtonMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type ProjectCreateButtonMutation = { __typename?: 'Mutation', createProject: { __typename?: 'CreateProjectSuccessResult', result: { __typename?: 'Project', id: string, name: string, description: string, privacy: ProjectPrivacy, currentVelocity: number, createdAt: any, accountId: string } } | { __typename?: 'InvalidArgumentsResult' } | { __typename?: 'UnauthorizedResult' } };

export type ProjectMemberSelectMemberFragment = { __typename?: 'User', id: string, name: string };

export type ProjectMemberSelectQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;


export type ProjectMemberSelectQuery = { __typename?: 'Query', viewer?: { __typename?: 'Viewer', id: string, project?: { __typename?: 'Project', id: string, members: Array<{ __typename?: 'User', id: string, name: string }> } | undefined } | undefined };

export const AccountListResult = gql`
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
export const UpdateAccountButton = gql`
    fragment UpdateAccountButton on Account {
  id
  name
}
    `;
export const ProjectBoardStory = gql`
    fragment ProjectBoardStory on Story {
  id
  kind
  title
  state
  position
  priority
  points
  isDeleted
  isUnEstimated
  projectId
}
    `;
export const StoryCreateFormItem = gql`
    fragment StoryCreateFormItem on Story {
  id
  title
  description
  state
  kind
  points
  requesterId
  projectId
  releaseDate
  position
  priority
  createdAt
  updatedAt
  isUnEstimated
  isDeleted
}
    `;
export const StoryUpdateFormItem = gql`
    fragment StoryUpdateFormItem on Story {
  id
  title
  description
  state
  kind
  points
  requesterId
  projectId
  releaseDate
  position
  priority
  createdAt
  updatedAt
  isUnEstimated
  isDeleted
}
    `;
export const ProjectCreateButtonResult = gql`
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
export const ProjectMemberSelectMember = gql`
    fragment ProjectMemberSelectMember on User {
  id
  name
}
    `;
export const AccountCreateButton = gql`
    mutation accountCreateButton($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ... on CreateAccountSuccessResult {
      result {
        ...AccountListResult
      }
    }
  }
}
    ${AccountListResult}`;
export const AccountList = gql`
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
    ${AccountListResult}`;
export const AccountUpdateButton = gql`
    mutation accountUpdateButton($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    ... on UpdateAccountSuccessResult {
      result {
        ...UpdateAccountButton
      }
    }
  }
}
    ${UpdateAccountButton}`;
export const ProjectBoard = gql`
    query ProjectBoard($projectId: ID!) {
  viewer {
    id
    project(id: $projectId) {
      id
      currentVelocity
      stories {
        edges {
          node {
            ...ProjectBoardStory
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
}
    ${ProjectBoardStory}`;
export const ProjectBoardMoveStories = gql`
    mutation ProjectBoardMoveStories($input: MoveStoriesInput!) {
  moveStories(input: $input) {
    ... on MoveStoriesSuccessResult {
      result {
        id
        position
        priority
      }
    }
  }
}
    `;
export const StoryCreateFormCreateStory = gql`
    mutation StoryCreateFormCreateStory($input: CreateStoryInput!) {
  createStory(input: $input) {
    ... on CreateStorySuccessResult {
      result {
        ...StoryCreateFormItem
      }
    }
    ... on InvalidArgumentsResult {
      issues {
        field
        message
      }
    }
  }
}
    ${StoryCreateFormItem}`;
export const StoryUpdateForm = gql`
    query StoryUpdateForm($projectId: ID!, $id: ID!) {
  viewer {
    id
    project(id: $projectId) {
      id
      story(id: $id) {
        ...StoryUpdateFormItem
      }
    }
  }
}
    ${StoryUpdateFormItem}`;
export const StoryUpdateFormUpdateStory = gql`
    mutation StoryUpdateFormUpdateStory($input: UpdateStoryInput!) {
  updateStory(input: $input) {
    ... on UpdateStorySuccessResult {
      result {
        ...StoryUpdateFormItem
      }
    }
  }
}
    ${StoryUpdateFormItem}`;
export const StoryUpdateFormDestroyStory = gql`
    mutation StoryUpdateFormDestroyStory($input: DestroyStoryInput!) {
  destroyStory(input: $input) {
    ... on DestroyStorySuccessResult {
      result {
        ...StoryUpdateFormItem
      }
    }
  }
}
    ${StoryUpdateFormItem}`;
export const ProjectCreateButton = gql`
    mutation projectCreateButton($input: CreateProjectInput!) {
  createProject(input: $input) {
    ... on CreateProjectSuccessResult {
      result {
        ...ProjectCreateButtonResult
      }
    }
  }
}
    ${ProjectCreateButtonResult}`;
export const ProjectMemberSelect = gql`
    query ProjectMemberSelect($projectId: ID!) {
  viewer {
    id
    project(id: $projectId) {
      id
      members {
        ...ProjectMemberSelectMember
      }
    }
  }
}
    ${ProjectMemberSelectMember}`;
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
export const UpdateAccountButtonFragmentDoc = gql`
    fragment UpdateAccountButton on Account {
  id
  name
}
    `;
export const ProjectBoardStoryFragmentDoc = gql`
    fragment ProjectBoardStory on Story {
  id
  kind
  title
  state
  position
  priority
  points
  isDeleted
  isUnEstimated
  projectId
}
    `;
export const StoryCreateFormItemFragmentDoc = gql`
    fragment StoryCreateFormItem on Story {
  id
  title
  description
  state
  kind
  points
  requesterId
  projectId
  releaseDate
  position
  priority
  createdAt
  updatedAt
  isUnEstimated
  isDeleted
}
    `;
export const StoryUpdateFormItemFragmentDoc = gql`
    fragment StoryUpdateFormItem on Story {
  id
  title
  description
  state
  kind
  points
  requesterId
  projectId
  releaseDate
  position
  priority
  createdAt
  updatedAt
  isUnEstimated
  isDeleted
}
    `;
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
export const ProjectMemberSelectMemberFragmentDoc = gql`
    fragment ProjectMemberSelectMember on User {
  id
  name
}
    `;
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
export const AccountUpdateButtonDocument = gql`
    mutation accountUpdateButton($input: UpdateAccountInput!) {
  updateAccount(input: $input) {
    ... on UpdateAccountSuccessResult {
      result {
        ...UpdateAccountButton
      }
    }
  }
}
    ${UpdateAccountButtonFragmentDoc}`;

export function useAccountUpdateButtonMutation() {
  return Urql.useMutation<AccountUpdateButtonMutation, AccountUpdateButtonMutationVariables>(AccountUpdateButtonDocument);
};
export const ProjectBoardDocument = gql`
    query ProjectBoard($projectId: ID!) {
  viewer {
    id
    project(id: $projectId) {
      id
      currentVelocity
      stories {
        edges {
          node {
            ...ProjectBoardStory
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
}
    ${ProjectBoardStoryFragmentDoc}`;

export function useProjectBoardQuery(options: Omit<Urql.UseQueryArgs<ProjectBoardQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectBoardQuery>({ query: ProjectBoardDocument, ...options });
};
export const ProjectBoardMoveStoriesDocument = gql`
    mutation ProjectBoardMoveStories($input: MoveStoriesInput!) {
  moveStories(input: $input) {
    ... on MoveStoriesSuccessResult {
      result {
        id
        position
        priority
      }
    }
  }
}
    `;

export function useProjectBoardMoveStoriesMutation() {
  return Urql.useMutation<ProjectBoardMoveStoriesMutation, ProjectBoardMoveStoriesMutationVariables>(ProjectBoardMoveStoriesDocument);
};
export const StoryCreateFormCreateStoryDocument = gql`
    mutation StoryCreateFormCreateStory($input: CreateStoryInput!) {
  createStory(input: $input) {
    ... on CreateStorySuccessResult {
      result {
        ...StoryCreateFormItem
      }
    }
    ... on InvalidArgumentsResult {
      issues {
        field
        message
      }
    }
  }
}
    ${StoryCreateFormItemFragmentDoc}`;

export function useStoryCreateFormCreateStoryMutation() {
  return Urql.useMutation<StoryCreateFormCreateStoryMutation, StoryCreateFormCreateStoryMutationVariables>(StoryCreateFormCreateStoryDocument);
};
export const StoryUpdateFormDocument = gql`
    query StoryUpdateForm($projectId: ID!, $id: ID!) {
  viewer {
    id
    project(id: $projectId) {
      id
      story(id: $id) {
        ...StoryUpdateFormItem
      }
    }
  }
}
    ${StoryUpdateFormItemFragmentDoc}`;

export function useStoryUpdateFormQuery(options: Omit<Urql.UseQueryArgs<StoryUpdateFormQueryVariables>, 'query'>) {
  return Urql.useQuery<StoryUpdateFormQuery>({ query: StoryUpdateFormDocument, ...options });
};
export const StoryUpdateFormUpdateStoryDocument = gql`
    mutation StoryUpdateFormUpdateStory($input: UpdateStoryInput!) {
  updateStory(input: $input) {
    ... on UpdateStorySuccessResult {
      result {
        ...StoryUpdateFormItem
      }
    }
  }
}
    ${StoryUpdateFormItemFragmentDoc}`;

export function useStoryUpdateFormUpdateStoryMutation() {
  return Urql.useMutation<StoryUpdateFormUpdateStoryMutation, StoryUpdateFormUpdateStoryMutationVariables>(StoryUpdateFormUpdateStoryDocument);
};
export const StoryUpdateFormDestroyStoryDocument = gql`
    mutation StoryUpdateFormDestroyStory($input: DestroyStoryInput!) {
  destroyStory(input: $input) {
    ... on DestroyStorySuccessResult {
      result {
        ...StoryUpdateFormItem
      }
    }
  }
}
    ${StoryUpdateFormItemFragmentDoc}`;

export function useStoryUpdateFormDestroyStoryMutation() {
  return Urql.useMutation<StoryUpdateFormDestroyStoryMutation, StoryUpdateFormDestroyStoryMutationVariables>(StoryUpdateFormDestroyStoryDocument);
};
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
export const ProjectMemberSelectDocument = gql`
    query ProjectMemberSelect($projectId: ID!) {
  viewer {
    id
    project(id: $projectId) {
      id
      members {
        ...ProjectMemberSelectMember
      }
    }
  }
}
    ${ProjectMemberSelectMemberFragmentDoc}`;

export function useProjectMemberSelectQuery(options: Omit<Urql.UseQueryArgs<ProjectMemberSelectQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectMemberSelectQuery>({ query: ProjectMemberSelectDocument, ...options });
};