import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type DateString = string;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: DateString;
  NullableID: string | null;
  Upload: any;
};

export type Account = Node & {
  __typename?: 'Account';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isDeleted?: Maybe<Scalars['Boolean']>;
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

export type CreateAccountMutationResult =
  | CreateAccountSuccessResult
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type CreateAccountSuccessResult = {
  __typename?: 'CreateAccountSuccessResult';
  result: Account;
};

export type CreateProjectInput = {
  accountId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  initialVelocity: Scalars['Int'];
  name: Scalars['String'];
  privacy: ProjectPrivacy;
};

export type CreateProjectMutationResult =
  | CreateProjectSuccessResult
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult;

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
  requesterId: Scalars['ID'];
  state: StoryState;
  title: Scalars['String'];
};

export type CreateStoryMutationResult =
  | CreateStorySuccessResult
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type CreateStorySuccessResult = {
  __typename?: 'CreateStorySuccessResult';
  effectedStories: Array<Story>;
  result: Story;
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY',
}

export type DestroyStoryInput = {
  id: Scalars['ID'];
};

export type DestroyStoryMutationResult =
  | DestroyStorySuccessResult
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type DestroyStorySuccessResult = {
  __typename?: 'DestroyStorySuccessResult';
  result: Story;
};

export type Edge = {
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Node>;
};

export type EstimateStoryInput = {
  id: Scalars['ID'];
  points?: InputMaybe<Scalars['Int']>;
};

export type EstimateStoryMutationResult =
  | EstimateStorySuccessResult
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type EstimateStorySuccessResult = {
  __typename?: 'EstimateStorySuccessResult';
  result: Story;
};

export type InternalErrorResult = {
  __typename?: 'InternalErrorResult';
  errorMessage: Scalars['String'];
};

export type InvalidArgumentsResult = {
  __typename?: 'InvalidArgumentsResult';
  errorMessage: Scalars['String'];
  issues: Array<ValidationIssue>;
};

export type InviteProjectMemberInput = {
  id: Scalars['ID'];
  projectId: Scalars['ID'];
  role: ProjectMemberRole;
  userEmail: Scalars['String'];
};

export type InviteProjectMemberMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | InviteProjectMemberSuccessResult
  | UnauthorizedResult;

export type InviteProjectMemberSuccessResult = {
  __typename?: 'InviteProjectMemberSuccessResult';
  result?: Maybe<ProjectMemberInvitation>;
};

export type JoinProjectMemberAlreadyJoinedResult = {
  __typename?: 'JoinProjectMemberAlreadyJoinedResult';
  result: Scalars['Boolean'];
};

export type JoinProjectMemberInput = {
  confirmationToken: Scalars['String'];
  memberId: Scalars['ID'];
};

export type JoinProjectMemberMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | JoinProjectMemberAlreadyJoinedResult
  | JoinProjectMemberSuccessResult
  | JoinProjectMemberTokenIsAlreadyUsedResult
  | JoinProjectMemberTokenIsExpiredResult
  | UnauthorizedResult;

export type JoinProjectMemberSuccessResult = {
  __typename?: 'JoinProjectMemberSuccessResult';
  result: Scalars['Boolean'];
};

export type JoinProjectMemberTokenIsAlreadyUsedResult = {
  __typename?: 'JoinProjectMemberTokenIsAlreadyUsedResult';
  result: Scalars['Boolean'];
};

export type JoinProjectMemberTokenIsExpiredResult = {
  __typename?: 'JoinProjectMemberTokenIsExpiredResult';
  expiredAt: Scalars['DateTime'];
};

export type MoveStoriesInput = {
  projectId: Scalars['ID'];
  stories: Array<MoveStoriesStoryDestination>;
};

export type MoveStoriesMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | MoveStoriesSuccessResult
  | UnauthorizedResult;

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
  estimateStory: EstimateStoryMutationResult;
  inviteProjectMember: InviteProjectMemberMutationResult;
  joinProjectMember: JoinProjectMemberMutationResult;
  moveStories: MoveStoriesMutationResult;
  updateAccount: UpdateAccountMutationResult;
  updateStory: UpdateStoryMutationResult;
  updateStoryState: UpdateStoryStateMutationResult;
  updateUserProfile: UpdateUserProfileMutationResult;
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

export type MutationEstimateStoryArgs = {
  input: EstimateStoryInput;
};

export type MutationInviteProjectMemberArgs = {
  input: InviteProjectMemberInput;
};

export type MutationJoinProjectMemberArgs = {
  input: JoinProjectMemberInput;
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

export type MutationUpdateStoryStateArgs = {
  input: UpdateStoryStateInput;
};

export type MutationUpdateUserProfileArgs = {
  input: UpdateUserProfileInput;
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
  boardConfig: ProjectBoardConfig;
  boardStatus: ProjectBoardStatus;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  invitations: ProjectMemberInvitationConnection;
  isDeleted?: Maybe<Scalars['Boolean']>;
  members: ProjectMemberConnection;
  name: Scalars['String'];
  privacy: ProjectPrivacy;
  stories: StoryConnection;
  story?: Maybe<Story>;
  updatedAt: Scalars['DateTime'];
};

export type ProjectStoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<StoryPosition>;
};

export type ProjectStoryArgs = {
  id: Scalars['ID'];
};

export type ProjectBoardConfig = Node & {
  __typename?: 'ProjectBoardConfig';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  initialVelocity: Scalars['Int'];
  iterationLength: Scalars['Int'];
  startIterationOn: DayOfWeek;
  startIterationWeekNumber: Scalars['Int'];
  startOn?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type ProjectBoardStatus = Node & {
  __typename?: 'ProjectBoardStatus';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  velocity: Scalars['Int'];
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

export type ProjectMember = Node & {
  __typename?: 'ProjectMember';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isMe: Scalars['Boolean'];
  profile: UserProfile;
  role: ProjectMemberRole;
  updatedAt: Scalars['DateTime'];
};

export type ProjectMemberConnection = Connection & {
  __typename?: 'ProjectMemberConnection';
  edges?: Maybe<Array<Maybe<ProjectMemberEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ProjectMemberEdge = Edge & {
  __typename?: 'ProjectMemberEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<ProjectMember>;
};

export type ProjectMemberInvitation = Node & {
  __typename?: 'ProjectMemberInvitation';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  isJoined: Scalars['Boolean'];
  projectName: Scalars['String'];
  role: ProjectMemberRole;
  updatedAt: Scalars['DateTime'];
};

export type ProjectMemberInvitationConnection = Connection & {
  __typename?: 'ProjectMemberInvitationConnection';
  edges?: Maybe<Array<Maybe<ProjectMemberInvitationEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ProjectMemberInvitationEdge = Edge & {
  __typename?: 'ProjectMemberInvitationEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<ProjectMemberInvitation>;
};

export type ProjectMemberInvitationToken = Node & {
  __typename?: 'ProjectMemberInvitationToken';
  confirmationToken: Scalars['String'];
  createdAt: Scalars['DateTime'];
  expiredAt: Scalars['DateTime'];
  id: Scalars['ID'];
  invitation: ProjectMemberInvitation;
  isExpired: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type ProjectMemberInvitationTokenConnection = Connection & {
  __typename?: 'ProjectMemberInvitationTokenConnection';
  edges?: Maybe<Array<Maybe<ProjectMemberInvitationTokenEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ProjectMemberInvitationTokenEdge = Edge & {
  __typename?: 'ProjectMemberInvitationTokenEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<ProjectMemberInvitationToken>;
};

export enum ProjectMemberRole {
  Member = 'MEMBER',
  Owner = 'OWNER',
  Viewer = 'VIEWER',
}

export enum ProjectPrivacy {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
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
  canEstimate: Scalars['Boolean'];
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  isDeleted?: Maybe<Scalars['Boolean']>;
  isProcessing: Scalars['Boolean'];
  isUnEstimated: Scalars['Boolean'];
  kind: StoryKind;
  owners: Array<ProjectMember>;
  points?: Maybe<Scalars['Int']>;
  position: StoryPosition;
  priority: Scalars['Int'];
  project?: Maybe<Project>;
  projectId: Scalars['ID'];
  releaseDate?: Maybe<Scalars['DateTime']>;
  requester?: Maybe<ProjectMember>;
  requesterId: Scalars['ID'];
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
  Release = 'RELEASE',
}

export enum StoryPosition {
  Backlog = 'BACKLOG',
  Current = 'CURRENT',
  Done = 'DONE',
  Icebox = 'ICEBOX',
}

export enum StoryState {
  Accepted = 'ACCEPTED',
  Delivered = 'DELIVERED',
  Finished = 'FINISHED',
  Rejected = 'REJECTED',
  Started = 'STARTED',
  Unstarted = 'UNSTARTED',
}

export type Subscription = {
  __typename?: 'Subscription';
  subscribeStoryUpdate?: Maybe<Story>;
};

export type SubscriptionSubscribeStoryUpdateArgs = {
  projectId: Scalars['ID'];
};

export type UnauthorizedResult = {
  __typename?: 'UnauthorizedResult';
  errorMessage: Scalars['String'];
};

export type UpdateAccountInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateAccountMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult
  | UpdateAccountSuccessResult;

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
  requesterId?: InputMaybe<Scalars['NullableID']>;
  state: StoryState;
  title: Scalars['String'];
};

export type UpdateStoryMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult
  | UpdateStorySuccessResult;

export type UpdateStoryStateInput = {
  id: Scalars['ID'];
  state: StoryState;
};

export type UpdateStoryStateMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult
  | UpdateStoryStateSuccessResult;

export type UpdateStoryStateSuccessResult = {
  __typename?: 'UpdateStoryStateSuccessResult';
  effectedStories: Array<Story>;
  result: Story;
};

export type UpdateStorySuccessResult = {
  __typename?: 'UpdateStorySuccessResult';
  effectedStories: Array<Story>;
  result: Story;
};

export type UpdateUserProfileInput = {
  avatarImage?: InputMaybe<Scalars['Upload']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserProfileMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult
  | UpdateUserProfileSuccessResult;

export type UpdateUserProfileSuccessResult = {
  __typename?: 'UpdateUserProfileSuccessResult';
  result: UserProfile;
};

export type UserProfile = Node & {
  __typename?: 'UserProfile';
  avatarImageUrl: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UserProfileConnection = Connection & {
  __typename?: 'UserProfileConnection';
  edges?: Maybe<Array<Maybe<UserProfileEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type UserProfileEdge = Edge & {
  __typename?: 'UserProfileEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<UserProfile>;
};

export type ValidationIssue = {
  __typename?: 'ValidationIssue';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Viewer = {
  __typename?: 'Viewer';
  accounts: AccountConnection;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  invitationToken?: Maybe<ProjectMemberInvitationToken>;
  profile: UserProfile;
  project?: Maybe<Project>;
  updatedAt: Scalars['DateTime'];
};

export type ViewerAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type ViewerInvitationTokenArgs = {
  confirmationToken: Scalars['String'];
};

export type ViewerProjectArgs = {
  id: Scalars['ID'];
};

export const AccountList_Result = gql`
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
export const UpdateAccountButton_Result = gql`
  fragment UpdateAccountButton_Result on Account {
    id
    name
  }
`;
export const ProjectBoard_Story = gql`
  fragment ProjectBoard_Story on Story {
    id
    kind
    title
    state
    position
    priority
    points
    isDeleted
    isUnEstimated
    isCompleted
    isProcessing
    canEstimate
    completedAt
    projectId
    releaseDate
  }
`;
export const ProjectBoard_Project = gql`
  fragment ProjectBoard_Project on Project {
    id
    boardConfig {
      id
      startOn
      startIterationWeekNumber
      iterationLength
    }
    boardStatus {
      id
      velocity
    }
  }
`;
export const StoryCreateForm_Item = gql`
  fragment StoryCreateForm_Item on Story {
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
    isCompleted
    isProcessing
    isDeleted
    canEstimate
  }
`;
export const StoryItem_Item = gql`
  fragment StoryItem_Item on Story {
    id
    state
    points
    isUnEstimated
    isCompleted
    isProcessing
    canEstimate
  }
`;
export const StoryStateUpdateButton_Story = gql`
  fragment StoryStateUpdateButton_Story on Story {
    id
    state
    position
    priority
    isCompleted
    isProcessing
    completedAt
  }
`;
export const StoryUpdateForm_Item = gql`
  fragment StoryUpdateForm_Item on Story {
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
    isCompleted
    isProcessing
    isDeleted
    canEstimate
  }
`;
export const ProjectCreateButton_Result = gql`
  fragment ProjectCreateButton_Result on Project {
    id
    name
    description
    privacy
    createdAt
    accountId
  }
`;
export const ProjectInvitationConfirmation_Member = gql`
  fragment ProjectInvitationConfirmation_Member on ProjectMember {
    id
    role
    profile {
      name
      avatarImageUrl
    }
  }
`;
export const ProjectMemberList_ProjectMember = gql`
  fragment ProjectMemberList_ProjectMember on ProjectMember {
    id
    role
    profile {
      name
      avatarImageUrl
    }
  }
`;
export const ProjectMemberList_ProjectMemberInvitation = gql`
  fragment ProjectMemberList_ProjectMemberInvitation on ProjectMemberInvitation {
    id
    role
    email
  }
`;
export const ProjectMemberSelect_Member = gql`
  fragment ProjectMemberSelect_Member on ProjectMember {
    id
    role
    isMe
    profile {
      name
    }
  }
`;
export const ProfileForm_UpdateResult = gql`
  fragment ProfileForm_UpdateResult on UserProfile {
    id
    name
    avatarImageUrl
  }
`;
export const AppLayout_User = gql`
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
export const AccountCreateButton_CreateAccount = gql`
  mutation AccountCreateButton_CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ... on CreateAccountSuccessResult {
        result {
          ...AccountList_Result
        }
      }
    }
  }
  ${AccountList_Result}
`;
export const AccountList = gql`
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
  ${AccountList_Result}
`;
export const AccountUpdateButton_UpdateAccount = gql`
  mutation AccountUpdateButton_UpdateAccount($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      ... on UpdateAccountSuccessResult {
        result {
          ...UpdateAccountButton_Result
        }
      }
    }
  }
  ${UpdateAccountButton_Result}
`;
export const ProjectBoard_Status = gql`
  query ProjectBoard_Status($projectId: ID!) {
    viewer {
      id
      project(id: $projectId) {
        ...ProjectBoard_Project
      }
    }
  }
  ${ProjectBoard_Project}
`;
export const ProjectBoard_Stories = gql`
  query ProjectBoard_Stories(
    $projectId: ID!
    $position: StoryPosition
    $cursor: String
  ) {
    viewer {
      id
      project(id: $projectId) {
        id
        stories(position: $position, first: 50, after: $cursor) {
          edges {
            node {
              ...ProjectBoard_Story
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
  ${ProjectBoard_Story}
`;
export const ProjectBoard_MoveStories = gql`
  mutation ProjectBoard_MoveStories($input: MoveStoriesInput!) {
    moveStories(input: $input) {
      ... on MoveStoriesSuccessResult {
        result {
          id
          position
          priority
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
`;
export const ProjectBoard_Subsc = gql`
  subscription ProjectBoard_Subsc($projectId: ID!) {
    subscribeStoryUpdate(projectId: $projectId) {
      id
    }
  }
`;
export const StoryCreateForm_CreateStory = gql`
  mutation StoryCreateForm_CreateStory($input: CreateStoryInput!) {
    createStory(input: $input) {
      ... on CreateStorySuccessResult {
        result {
          ...StoryCreateForm_Item
        }
        effectedStories {
          id
          priority
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
  ${StoryCreateForm_Item}
`;
export const StoryItem_EstimateStory = gql`
  mutation StoryItem_EstimateStory($input: EstimateStoryInput!) {
    estimateStory(input: $input) {
      ... on EstimateStorySuccessResult {
        result {
          ...StoryItem_Item
        }
      }
    }
  }
  ${StoryItem_Item}
`;
export const StoryStateUpdateButton_UpdateStoryState = gql`
  mutation StoryStateUpdateButton_UpdateStoryState(
    $input: UpdateStoryStateInput!
  ) {
    updateStoryState(input: $input) {
      ... on UpdateStoryStateSuccessResult {
        result {
          ...StoryStateUpdateButton_Story
        }
        effectedStories {
          ...StoryStateUpdateButton_Story
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
  ${StoryStateUpdateButton_Story}
`;
export const StoryUpdateForm = gql`
  query StoryUpdateForm($projectId: ID!, $id: ID!) {
    viewer {
      id
      project(id: $projectId) {
        id
        story(id: $id) {
          ...StoryUpdateForm_Item
        }
      }
    }
  }
  ${StoryUpdateForm_Item}
`;
export const StoryUpdateForm_UpdateStory = gql`
  mutation StoryUpdateForm_UpdateStory($input: UpdateStoryInput!) {
    updateStory(input: $input) {
      ... on UpdateStorySuccessResult {
        result {
          ...StoryUpdateForm_Item
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
  ${StoryUpdateForm_Item}
`;
export const StoryUpdateForm_DestroyStory = gql`
  mutation StoryUpdateForm_DestroyStory($input: DestroyStoryInput!) {
    destroyStory(input: $input) {
      ... on DestroyStorySuccessResult {
        result {
          ...StoryUpdateForm_Item
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
  ${StoryUpdateForm_Item}
`;
export const ProjectCreateButton_CreateProject = gql`
  mutation ProjectCreateButton_CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      ... on CreateProjectSuccessResult {
        result {
          ...ProjectCreateButton_Result
        }
      }
    }
  }
  ${ProjectCreateButton_Result}
`;
export const ProjectInvitationConfirmation = gql`
  query ProjectInvitationConfirmation(
    $projectId: ID!
    $confirmationToken: String!
  ) {
    viewer {
      id
      project(id: $projectId) {
        id
      }
      invitationToken(confirmationToken: $confirmationToken) {
        id
        expiredAt
        isExpired
        invitation {
          projectName
        }
      }
    }
  }
`;
export const ProjectInvitationConfirmation_JoinProjectMember = gql`
  mutation ProjectInvitationConfirmation_JoinProjectMember(
    $input: JoinProjectMemberInput!
  ) {
    joinProjectMember(input: $input) {
      ... on JoinProjectMemberSuccessResult {
        result
      }
      ... on JoinProjectMemberTokenIsAlreadyUsedResult {
        result
      }
      ... on JoinProjectMemberTokenIsExpiredResult {
        expiredAt
      }
      ... on JoinProjectMemberAlreadyJoinedResult {
        result
      }
      ... on InvalidArgumentsResult {
        issues {
          field
          message
        }
      }
    }
  }
`;
export const ProjectMemberList = gql`
  query ProjectMemberList($projectId: ID!) {
    viewer {
      id
      project(id: $projectId) {
        id
        members {
          edges {
            node {
              ...ProjectMemberList_ProjectMember
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
        invitations {
          edges {
            node {
              ...ProjectMemberList_ProjectMemberInvitation
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
  ${ProjectMemberList_ProjectMember}
  ${ProjectMemberList_ProjectMemberInvitation}
`;
export const ProjectMemberInviteButton_Invite = gql`
  mutation ProjectMemberInviteButton_Invite($input: InviteProjectMemberInput!) {
    inviteProjectMember(input: $input) {
      ... on InviteProjectMemberSuccessResult {
        result {
          id
        }
      }
    }
  }
`;
export const ProjectMemberSelect = gql`
  query ProjectMemberSelect($projectId: ID!) {
    viewer {
      id
      project(id: $projectId) {
        id
        members {
          edges {
            node {
              ...ProjectMemberSelect_Member
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
  ${ProjectMemberSelect_Member}
`;
export const ProfileForm_UserProfile = gql`
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
export const ProfileForm_UpdateUserProfile = gql`
  mutation ProfileForm_UpdateUserProfile($input: UpdateUserProfileInput!) {
    updateUserProfile(input: $input) {
      ... on UpdateUserProfileSuccessResult {
        result {
          ...ProfileForm_UpdateResult
        }
      }
    }
  }
  ${ProfileForm_UpdateResult}
`;
