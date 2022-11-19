import gql from 'graphql-tag';
import * as Urql from 'urql';
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: DateString;
  NullableID: string | null;
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

export type Anonymous = Node & {
  __typename?: 'Anonymous';
  id: Scalars['ID'];
};

export type AnonymousConnection = Connection & {
  __typename?: 'AnonymousConnection';
  edges?: Maybe<Array<Maybe<AnonymousEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type AnonymousEdge = Edge & {
  __typename?: 'AnonymousEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Anonymous>;
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
  avatarImageUrl: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isMe: Scalars['Boolean'];
  name: Scalars['String'];
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
  anonymous?: Maybe<Anonymous>;
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
  owners: Array<User>;
  points?: Maybe<Scalars['Int']>;
  position: StoryPosition;
  priority: Scalars['Int'];
  project?: Maybe<Project>;
  projectId: Scalars['ID'];
  releaseDate?: Maybe<Scalars['DateTime']>;
  requester?: Maybe<User>;
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
  invitationToken?: Maybe<ProjectMemberInvitationToken>;
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

export type AccountCreateButton_CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;

export type AccountCreateButton_CreateAccountMutation = {
  __typename?: 'Mutation';
  createAccount:
    | {
        __typename?: 'CreateAccountSuccessResult';
        result: {
          __typename?: 'Account';
          id: string;
          name: string;
          projects: {
            __typename?: 'ProjectConnection';
            edges?: Array<{
              __typename?: 'ProjectEdge';
              cursor?: string | null;
              node?: {
                __typename?: 'Project';
                id: string;
                name: string;
              } | null;
            } | null> | null;
            pageInfo?: {
              __typename?: 'PageInfo';
              hasNextPage: boolean;
              endCursor?: string | null;
            } | null;
          };
        };
      }
    | { __typename?: 'InternalErrorResult' }
    | { __typename?: 'InvalidArgumentsResult' }
    | { __typename?: 'UnauthorizedResult' };
};

export type AccountList_ResultFragment = {
  __typename?: 'Account';
  id: string;
  name: string;
  projects: {
    __typename?: 'ProjectConnection';
    edges?: Array<{
      __typename?: 'ProjectEdge';
      cursor?: string | null;
      node?: { __typename?: 'Project'; id: string; name: string } | null;
    } | null> | null;
    pageInfo?: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      endCursor?: string | null;
    } | null;
  };
};

export type AccountListQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type AccountListQuery = {
  __typename?: 'Query';
  viewer?: {
    __typename?: 'Viewer';
    id: string;
    accounts: {
      __typename?: 'AccountConnection';
      edges?: Array<{
        __typename?: 'AccountEdge';
        cursor?: string | null;
        node?: {
          __typename?: 'Account';
          id: string;
          name: string;
          projects: {
            __typename?: 'ProjectConnection';
            edges?: Array<{
              __typename?: 'ProjectEdge';
              cursor?: string | null;
              node?: {
                __typename?: 'Project';
                id: string;
                name: string;
              } | null;
            } | null> | null;
            pageInfo?: {
              __typename?: 'PageInfo';
              hasNextPage: boolean;
              endCursor?: string | null;
            } | null;
          };
        } | null;
      } | null> | null;
      pageInfo?: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        endCursor?: string | null;
      } | null;
    };
  } | null;
};

export type UpdateAccountButton_ResultFragment = {
  __typename?: 'Account';
  id: string;
  name: string;
};

export type AccountUpdateButton_UpdateAccountMutationVariables = Exact<{
  input: UpdateAccountInput;
}>;

export type AccountUpdateButton_UpdateAccountMutation = {
  __typename?: 'Mutation';
  updateAccount:
    | { __typename?: 'InternalErrorResult' }
    | { __typename?: 'InvalidArgumentsResult' }
    | { __typename?: 'UnauthorizedResult' }
    | {
        __typename?: 'UpdateAccountSuccessResult';
        result: { __typename?: 'Account'; id: string; name: string };
      };
};

export type ProjectBoard_StoryFragment = {
  __typename?: 'Story';
  id: string;
  kind: StoryKind;
  title: string;
  state: StoryState;
  position: StoryPosition;
  priority: number;
  points?: number | null;
  isDeleted?: boolean | null;
  isUnEstimated: boolean;
  isCompleted: boolean;
  isProcessing: boolean;
  canEstimate: boolean;
  completedAt?: DateString | null;
  projectId: string;
  releaseDate?: DateString | null;
};

export type ProjectBoard_ProjectFragment = {
  __typename?: 'Project';
  id: string;
  boardConfig: {
    __typename?: 'ProjectBoardConfig';
    id: string;
    startOn?: DateString | null;
    startIterationWeekNumber: number;
    iterationLength: number;
  };
  boardStatus: {
    __typename?: 'ProjectBoardStatus';
    id: string;
    velocity: number;
  };
};

export type ProjectBoard_StatusQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;

export type ProjectBoard_StatusQuery = {
  __typename?: 'Query';
  viewer?: {
    __typename?: 'Viewer';
    id: string;
    project?: {
      __typename?: 'Project';
      id: string;
      boardConfig: {
        __typename?: 'ProjectBoardConfig';
        id: string;
        startOn?: DateString | null;
        startIterationWeekNumber: number;
        iterationLength: number;
      };
      boardStatus: {
        __typename?: 'ProjectBoardStatus';
        id: string;
        velocity: number;
      };
    } | null;
  } | null;
};

export type ProjectBoard_StoriesQueryVariables = Exact<{
  projectId: Scalars['ID'];
  position?: InputMaybe<StoryPosition>;
  cursor?: InputMaybe<Scalars['String']>;
}>;

export type ProjectBoard_StoriesQuery = {
  __typename?: 'Query';
  viewer?: {
    __typename?: 'Viewer';
    id: string;
    project?: {
      __typename?: 'Project';
      id: string;
      stories: {
        __typename?: 'StoryConnection';
        edges?: Array<{
          __typename?: 'StoryEdge';
          cursor?: string | null;
          node?: {
            __typename?: 'Story';
            id: string;
            kind: StoryKind;
            title: string;
            state: StoryState;
            position: StoryPosition;
            priority: number;
            points?: number | null;
            isDeleted?: boolean | null;
            isUnEstimated: boolean;
            isCompleted: boolean;
            isProcessing: boolean;
            canEstimate: boolean;
            completedAt?: DateString | null;
            projectId: string;
            releaseDate?: DateString | null;
          } | null;
        } | null> | null;
        pageInfo?: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
        } | null;
      };
    } | null;
  } | null;
};

export type ProjectBoard_MoveStoriesMutationVariables = Exact<{
  input: MoveStoriesInput;
}>;

export type ProjectBoard_MoveStoriesMutation = {
  __typename?: 'Mutation';
  moveStories:
    | { __typename?: 'InternalErrorResult' }
    | {
        __typename?: 'InvalidArgumentsResult';
        issues: Array<{
          __typename?: 'ValidationIssue';
          field?: string | null;
          message?: string | null;
        }>;
      }
    | {
        __typename?: 'MoveStoriesSuccessResult';
        result: Array<{
          __typename?: 'Story';
          id: string;
          position: StoryPosition;
          priority: number;
        }>;
      }
    | { __typename?: 'UnauthorizedResult' };
};

export type ProjectBoard_SubscSubscriptionVariables = Exact<{
  projectId: Scalars['ID'];
}>;

export type ProjectBoard_SubscSubscription = {
  __typename?: 'Subscription';
  subscribeStoryUpdate?: { __typename?: 'Story'; id: string } | null;
};

export type StoryCreateForm_ItemFragment = {
  __typename?: 'Story';
  id: string;
  title: string;
  description: string;
  state: StoryState;
  kind: StoryKind;
  points?: number | null;
  requesterId: string;
  projectId: string;
  releaseDate?: DateString | null;
  position: StoryPosition;
  priority: number;
  createdAt: DateString;
  updatedAt: DateString;
  isUnEstimated: boolean;
  isCompleted: boolean;
  isProcessing: boolean;
  isDeleted?: boolean | null;
  canEstimate: boolean;
};

export type StoryCreateForm_CreateStoryMutationVariables = Exact<{
  input: CreateStoryInput;
}>;

export type StoryCreateForm_CreateStoryMutation = {
  __typename?: 'Mutation';
  createStory:
    | {
        __typename?: 'CreateStorySuccessResult';
        result: {
          __typename?: 'Story';
          id: string;
          title: string;
          description: string;
          state: StoryState;
          kind: StoryKind;
          points?: number | null;
          requesterId: string;
          projectId: string;
          releaseDate?: DateString | null;
          position: StoryPosition;
          priority: number;
          createdAt: DateString;
          updatedAt: DateString;
          isUnEstimated: boolean;
          isCompleted: boolean;
          isProcessing: boolean;
          isDeleted?: boolean | null;
          canEstimate: boolean;
        };
        effectedStories: Array<{
          __typename?: 'Story';
          id: string;
          priority: number;
        }>;
      }
    | { __typename?: 'InternalErrorResult' }
    | {
        __typename?: 'InvalidArgumentsResult';
        issues: Array<{
          __typename?: 'ValidationIssue';
          field?: string | null;
          message?: string | null;
        }>;
      }
    | { __typename?: 'UnauthorizedResult' };
};

export type StoryItem_ItemFragment = {
  __typename?: 'Story';
  id: string;
  state: StoryState;
  points?: number | null;
  isUnEstimated: boolean;
  isCompleted: boolean;
  isProcessing: boolean;
  canEstimate: boolean;
};

export type StoryItem_EstimateStoryMutationVariables = Exact<{
  input: EstimateStoryInput;
}>;

export type StoryItem_EstimateStoryMutation = {
  __typename?: 'Mutation';
  estimateStory:
    | {
        __typename?: 'EstimateStorySuccessResult';
        result: {
          __typename?: 'Story';
          id: string;
          state: StoryState;
          points?: number | null;
          isUnEstimated: boolean;
          isCompleted: boolean;
          isProcessing: boolean;
          canEstimate: boolean;
        };
      }
    | { __typename?: 'InternalErrorResult' }
    | { __typename?: 'InvalidArgumentsResult' }
    | { __typename?: 'UnauthorizedResult' };
};

export type StoryStateUpdateButton_StoryFragment = {
  __typename?: 'Story';
  id: string;
  state: StoryState;
  position: StoryPosition;
  priority: number;
  isCompleted: boolean;
  isProcessing: boolean;
  completedAt?: DateString | null;
};

export type StoryStateUpdateButton_UpdateStoryStateMutationVariables = Exact<{
  input: UpdateStoryStateInput;
}>;

export type StoryStateUpdateButton_UpdateStoryStateMutation = {
  __typename?: 'Mutation';
  updateStoryState:
    | { __typename?: 'InternalErrorResult' }
    | {
        __typename?: 'InvalidArgumentsResult';
        issues: Array<{
          __typename?: 'ValidationIssue';
          field?: string | null;
          message?: string | null;
        }>;
      }
    | { __typename?: 'UnauthorizedResult' }
    | {
        __typename?: 'UpdateStoryStateSuccessResult';
        result: {
          __typename?: 'Story';
          id: string;
          state: StoryState;
          position: StoryPosition;
          priority: number;
          isCompleted: boolean;
          isProcessing: boolean;
          completedAt?: DateString | null;
        };
        effectedStories: Array<{
          __typename?: 'Story';
          id: string;
          state: StoryState;
          position: StoryPosition;
          priority: number;
          isCompleted: boolean;
          isProcessing: boolean;
          completedAt?: DateString | null;
        }>;
      };
};

export type StoryUpdateForm_ItemFragment = {
  __typename?: 'Story';
  id: string;
  title: string;
  description: string;
  state: StoryState;
  kind: StoryKind;
  points?: number | null;
  requesterId: string;
  projectId: string;
  releaseDate?: DateString | null;
  position: StoryPosition;
  priority: number;
  createdAt: DateString;
  updatedAt: DateString;
  isUnEstimated: boolean;
  isCompleted: boolean;
  isProcessing: boolean;
  isDeleted?: boolean | null;
  canEstimate: boolean;
};

export type StoryUpdateFormQueryVariables = Exact<{
  projectId: Scalars['ID'];
  id: Scalars['ID'];
}>;

export type StoryUpdateFormQuery = {
  __typename?: 'Query';
  viewer?: {
    __typename?: 'Viewer';
    id: string;
    project?: {
      __typename?: 'Project';
      id: string;
      story?: {
        __typename?: 'Story';
        id: string;
        title: string;
        description: string;
        state: StoryState;
        kind: StoryKind;
        points?: number | null;
        requesterId: string;
        projectId: string;
        releaseDate?: DateString | null;
        position: StoryPosition;
        priority: number;
        createdAt: DateString;
        updatedAt: DateString;
        isUnEstimated: boolean;
        isCompleted: boolean;
        isProcessing: boolean;
        isDeleted?: boolean | null;
        canEstimate: boolean;
      } | null;
    } | null;
  } | null;
};

export type StoryUpdateForm_UpdateStoryMutationVariables = Exact<{
  input: UpdateStoryInput;
}>;

export type StoryUpdateForm_UpdateStoryMutation = {
  __typename?: 'Mutation';
  updateStory:
    | { __typename?: 'InternalErrorResult' }
    | {
        __typename?: 'InvalidArgumentsResult';
        issues: Array<{
          __typename?: 'ValidationIssue';
          field?: string | null;
          message?: string | null;
        }>;
      }
    | { __typename?: 'UnauthorizedResult' }
    | {
        __typename?: 'UpdateStorySuccessResult';
        result: {
          __typename?: 'Story';
          id: string;
          title: string;
          description: string;
          state: StoryState;
          kind: StoryKind;
          points?: number | null;
          requesterId: string;
          projectId: string;
          releaseDate?: DateString | null;
          position: StoryPosition;
          priority: number;
          createdAt: DateString;
          updatedAt: DateString;
          isUnEstimated: boolean;
          isCompleted: boolean;
          isProcessing: boolean;
          isDeleted?: boolean | null;
          canEstimate: boolean;
        };
      };
};

export type StoryUpdateForm_DestroyStoryMutationVariables = Exact<{
  input: DestroyStoryInput;
}>;

export type StoryUpdateForm_DestroyStoryMutation = {
  __typename?: 'Mutation';
  destroyStory:
    | {
        __typename?: 'DestroyStorySuccessResult';
        result: {
          __typename?: 'Story';
          id: string;
          title: string;
          description: string;
          state: StoryState;
          kind: StoryKind;
          points?: number | null;
          requesterId: string;
          projectId: string;
          releaseDate?: DateString | null;
          position: StoryPosition;
          priority: number;
          createdAt: DateString;
          updatedAt: DateString;
          isUnEstimated: boolean;
          isCompleted: boolean;
          isProcessing: boolean;
          isDeleted?: boolean | null;
          canEstimate: boolean;
        };
      }
    | { __typename?: 'InternalErrorResult' }
    | {
        __typename?: 'InvalidArgumentsResult';
        issues: Array<{
          __typename?: 'ValidationIssue';
          field?: string | null;
          message?: string | null;
        }>;
      }
    | { __typename?: 'UnauthorizedResult' };
};

export type ProjectCreateButton_ResultFragment = {
  __typename?: 'Project';
  id: string;
  name: string;
  description: string;
  privacy: ProjectPrivacy;
  createdAt: DateString;
  accountId: string;
};

export type ProjectCreateButton_CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;

export type ProjectCreateButton_CreateProjectMutation = {
  __typename?: 'Mutation';
  createProject:
    | {
        __typename?: 'CreateProjectSuccessResult';
        result: {
          __typename?: 'Project';
          id: string;
          name: string;
          description: string;
          privacy: ProjectPrivacy;
          createdAt: DateString;
          accountId: string;
        };
      }
    | { __typename?: 'InternalErrorResult' }
    | { __typename?: 'InvalidArgumentsResult' }
    | { __typename?: 'UnauthorizedResult' };
};

export type ProjectInvitationConfirmation_MemberFragment = {
  __typename?: 'ProjectMember';
  id: string;
  role: ProjectMemberRole;
  name: string;
  avatarImageUrl: string;
};

export type ProjectInvitationConfirmationQueryVariables = Exact<{
  projectId: Scalars['ID'];
  confirmationToken: Scalars['String'];
}>;

export type ProjectInvitationConfirmationQuery = {
  __typename?: 'Query';
  viewer?: {
    __typename?: 'Viewer';
    id: string;
    project?: { __typename?: 'Project'; id: string } | null;
    invitationToken?: {
      __typename?: 'ProjectMemberInvitationToken';
      id: string;
      expiredAt: DateString;
      isExpired: boolean;
      invitation: {
        __typename?: 'ProjectMemberInvitation';
        projectName: string;
      };
    } | null;
  } | null;
};

export type ProjectInvitationConfirmation_JoinProjectMemberMutationVariables =
  Exact<{
    input: JoinProjectMemberInput;
  }>;

export type ProjectInvitationConfirmation_JoinProjectMemberMutation = {
  __typename?: 'Mutation';
  joinProjectMember:
    | { __typename?: 'InternalErrorResult' }
    | {
        __typename?: 'InvalidArgumentsResult';
        issues: Array<{
          __typename?: 'ValidationIssue';
          field?: string | null;
          message?: string | null;
        }>;
      }
    | { __typename?: 'JoinProjectMemberAlreadyJoinedResult'; result: boolean }
    | { __typename?: 'JoinProjectMemberSuccessResult'; result: boolean }
    | {
        __typename?: 'JoinProjectMemberTokenIsAlreadyUsedResult';
        result: boolean;
      }
    | {
        __typename?: 'JoinProjectMemberTokenIsExpiredResult';
        expiredAt: DateString;
      }
    | { __typename?: 'UnauthorizedResult' };
};

export type ProjectMemberList_ProjectMemberFragment = {
  __typename?: 'ProjectMember';
  id: string;
  role: ProjectMemberRole;
  name: string;
  avatarImageUrl: string;
};

export type ProjectMemberList_ProjectMemberInvitationFragment = {
  __typename?: 'ProjectMemberInvitation';
  id: string;
  role: ProjectMemberRole;
  email: string;
};

export type ProjectMemberListQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;

export type ProjectMemberListQuery = {
  __typename?: 'Query';
  viewer?: {
    __typename?: 'Viewer';
    id: string;
    project?: {
      __typename?: 'Project';
      id: string;
      members: {
        __typename?: 'ProjectMemberConnection';
        edges?: Array<{
          __typename?: 'ProjectMemberEdge';
          cursor?: string | null;
          node?: {
            __typename?: 'ProjectMember';
            id: string;
            role: ProjectMemberRole;
            name: string;
            avatarImageUrl: string;
          } | null;
        } | null> | null;
        pageInfo?: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
        } | null;
      };
      invitations: {
        __typename?: 'ProjectMemberInvitationConnection';
        edges?: Array<{
          __typename?: 'ProjectMemberInvitationEdge';
          cursor?: string | null;
          node?: {
            __typename?: 'ProjectMemberInvitation';
            id: string;
            role: ProjectMemberRole;
            email: string;
          } | null;
        } | null> | null;
        pageInfo?: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
        } | null;
      };
    } | null;
  } | null;
};

export type ProjectMemberInviteButton_InviteMutationVariables = Exact<{
  input: InviteProjectMemberInput;
}>;

export type ProjectMemberInviteButton_InviteMutation = {
  __typename?: 'Mutation';
  inviteProjectMember:
    | { __typename?: 'InternalErrorResult' }
    | { __typename?: 'InvalidArgumentsResult' }
    | {
        __typename?: 'InviteProjectMemberSuccessResult';
        result?: { __typename?: 'ProjectMemberInvitation'; id: string } | null;
      }
    | { __typename?: 'UnauthorizedResult' };
};

export type ProjectMemberSelect_MemberFragment = {
  __typename?: 'ProjectMember';
  id: string;
  role: ProjectMemberRole;
  name: string;
  isMe: boolean;
};

export type ProjectMemberSelectQueryVariables = Exact<{
  projectId: Scalars['ID'];
}>;

export type ProjectMemberSelectQuery = {
  __typename?: 'Query';
  viewer?: {
    __typename?: 'Viewer';
    id: string;
    project?: {
      __typename?: 'Project';
      id: string;
      members: {
        __typename?: 'ProjectMemberConnection';
        edges?: Array<{
          __typename?: 'ProjectMemberEdge';
          cursor?: string | null;
          node?: {
            __typename?: 'ProjectMember';
            id: string;
            role: ProjectMemberRole;
            name: string;
            isMe: boolean;
          } | null;
        } | null> | null;
        pageInfo?: {
          __typename?: 'PageInfo';
          hasNextPage: boolean;
          endCursor?: string | null;
        } | null;
      };
    } | null;
  } | null;
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
    name
    avatarImageUrl
  }
`;
export const ProjectMemberList_ProjectMember = gql`
  fragment ProjectMemberList_ProjectMember on ProjectMember {
    id
    role
    name
    avatarImageUrl
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
    name
    isMe
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
export const UpdateAccountButton_ResultFragmentDoc = gql`
  fragment UpdateAccountButton_Result on Account {
    id
    name
  }
`;
export const ProjectBoard_StoryFragmentDoc = gql`
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
export const ProjectBoard_ProjectFragmentDoc = gql`
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
export const StoryCreateForm_ItemFragmentDoc = gql`
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
export const StoryItem_ItemFragmentDoc = gql`
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
export const StoryStateUpdateButton_StoryFragmentDoc = gql`
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
export const StoryUpdateForm_ItemFragmentDoc = gql`
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
export const ProjectCreateButton_ResultFragmentDoc = gql`
  fragment ProjectCreateButton_Result on Project {
    id
    name
    description
    privacy
    createdAt
    accountId
  }
`;
export const ProjectInvitationConfirmation_MemberFragmentDoc = gql`
  fragment ProjectInvitationConfirmation_Member on ProjectMember {
    id
    role
    name
    avatarImageUrl
  }
`;
export const ProjectMemberList_ProjectMemberFragmentDoc = gql`
  fragment ProjectMemberList_ProjectMember on ProjectMember {
    id
    role
    name
    avatarImageUrl
  }
`;
export const ProjectMemberList_ProjectMemberInvitationFragmentDoc = gql`
  fragment ProjectMemberList_ProjectMemberInvitation on ProjectMemberInvitation {
    id
    role
    email
  }
`;
export const ProjectMemberSelect_MemberFragmentDoc = gql`
  fragment ProjectMemberSelect_Member on ProjectMember {
    id
    role
    name
    isMe
  }
`;
export const AccountCreateButton_CreateAccountDocument = gql`
  mutation AccountCreateButton_CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ... on CreateAccountSuccessResult {
        result {
          ...AccountList_Result
        }
      }
    }
  }
  ${AccountList_ResultFragmentDoc}
`;

export function useAccountCreateButton_CreateAccountMutation() {
  return Urql.useMutation<
    AccountCreateButton_CreateAccountMutation,
    AccountCreateButton_CreateAccountMutationVariables
  >(AccountCreateButton_CreateAccountDocument);
}
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
  ${AccountList_ResultFragmentDoc}
`;

export function useAccountListQuery(
  options?: Omit<Urql.UseQueryArgs<AccountListQueryVariables>, 'query'>
) {
  return Urql.useQuery<AccountListQuery, AccountListQueryVariables>({
    query: AccountListDocument,
    ...options,
  });
}
export const AccountUpdateButton_UpdateAccountDocument = gql`
  mutation AccountUpdateButton_UpdateAccount($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      ... on UpdateAccountSuccessResult {
        result {
          ...UpdateAccountButton_Result
        }
      }
    }
  }
  ${UpdateAccountButton_ResultFragmentDoc}
`;

export function useAccountUpdateButton_UpdateAccountMutation() {
  return Urql.useMutation<
    AccountUpdateButton_UpdateAccountMutation,
    AccountUpdateButton_UpdateAccountMutationVariables
  >(AccountUpdateButton_UpdateAccountDocument);
}
export const ProjectBoard_StatusDocument = gql`
  query ProjectBoard_Status($projectId: ID!) {
    viewer {
      id
      project(id: $projectId) {
        ...ProjectBoard_Project
      }
    }
  }
  ${ProjectBoard_ProjectFragmentDoc}
`;

export function useProjectBoard_StatusQuery(
  options: Omit<Urql.UseQueryArgs<ProjectBoard_StatusQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    ProjectBoard_StatusQuery,
    ProjectBoard_StatusQueryVariables
  >({ query: ProjectBoard_StatusDocument, ...options });
}
export const ProjectBoard_StoriesDocument = gql`
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
  ${ProjectBoard_StoryFragmentDoc}
`;

export function useProjectBoard_StoriesQuery(
  options: Omit<Urql.UseQueryArgs<ProjectBoard_StoriesQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    ProjectBoard_StoriesQuery,
    ProjectBoard_StoriesQueryVariables
  >({ query: ProjectBoard_StoriesDocument, ...options });
}
export const ProjectBoard_MoveStoriesDocument = gql`
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

export function useProjectBoard_MoveStoriesMutation() {
  return Urql.useMutation<
    ProjectBoard_MoveStoriesMutation,
    ProjectBoard_MoveStoriesMutationVariables
  >(ProjectBoard_MoveStoriesDocument);
}
export const ProjectBoard_SubscDocument = gql`
  subscription ProjectBoard_Subsc($projectId: ID!) {
    subscribeStoryUpdate(projectId: $projectId) {
      id
    }
  }
`;

export function useProjectBoard_SubscSubscription<
  TData = ProjectBoard_SubscSubscription
>(
  options: Omit<
    Urql.UseSubscriptionArgs<ProjectBoard_SubscSubscriptionVariables>,
    'query'
  > = {},
  handler?: Urql.SubscriptionHandler<ProjectBoard_SubscSubscription, TData>
) {
  return Urql.useSubscription<
    ProjectBoard_SubscSubscription,
    TData,
    ProjectBoard_SubscSubscriptionVariables
  >({ query: ProjectBoard_SubscDocument, ...options }, handler);
}
export const StoryCreateForm_CreateStoryDocument = gql`
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
  ${StoryCreateForm_ItemFragmentDoc}
`;

export function useStoryCreateForm_CreateStoryMutation() {
  return Urql.useMutation<
    StoryCreateForm_CreateStoryMutation,
    StoryCreateForm_CreateStoryMutationVariables
  >(StoryCreateForm_CreateStoryDocument);
}
export const StoryItem_EstimateStoryDocument = gql`
  mutation StoryItem_EstimateStory($input: EstimateStoryInput!) {
    estimateStory(input: $input) {
      ... on EstimateStorySuccessResult {
        result {
          ...StoryItem_Item
        }
      }
    }
  }
  ${StoryItem_ItemFragmentDoc}
`;

export function useStoryItem_EstimateStoryMutation() {
  return Urql.useMutation<
    StoryItem_EstimateStoryMutation,
    StoryItem_EstimateStoryMutationVariables
  >(StoryItem_EstimateStoryDocument);
}
export const StoryStateUpdateButton_UpdateStoryStateDocument = gql`
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
  ${StoryStateUpdateButton_StoryFragmentDoc}
`;

export function useStoryStateUpdateButton_UpdateStoryStateMutation() {
  return Urql.useMutation<
    StoryStateUpdateButton_UpdateStoryStateMutation,
    StoryStateUpdateButton_UpdateStoryStateMutationVariables
  >(StoryStateUpdateButton_UpdateStoryStateDocument);
}
export const StoryUpdateFormDocument = gql`
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
  ${StoryUpdateForm_ItemFragmentDoc}
`;

export function useStoryUpdateFormQuery(
  options: Omit<Urql.UseQueryArgs<StoryUpdateFormQueryVariables>, 'query'>
) {
  return Urql.useQuery<StoryUpdateFormQuery, StoryUpdateFormQueryVariables>({
    query: StoryUpdateFormDocument,
    ...options,
  });
}
export const StoryUpdateForm_UpdateStoryDocument = gql`
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
  ${StoryUpdateForm_ItemFragmentDoc}
`;

export function useStoryUpdateForm_UpdateStoryMutation() {
  return Urql.useMutation<
    StoryUpdateForm_UpdateStoryMutation,
    StoryUpdateForm_UpdateStoryMutationVariables
  >(StoryUpdateForm_UpdateStoryDocument);
}
export const StoryUpdateForm_DestroyStoryDocument = gql`
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
  ${StoryUpdateForm_ItemFragmentDoc}
`;

export function useStoryUpdateForm_DestroyStoryMutation() {
  return Urql.useMutation<
    StoryUpdateForm_DestroyStoryMutation,
    StoryUpdateForm_DestroyStoryMutationVariables
  >(StoryUpdateForm_DestroyStoryDocument);
}
export const ProjectCreateButton_CreateProjectDocument = gql`
  mutation ProjectCreateButton_CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      ... on CreateProjectSuccessResult {
        result {
          ...ProjectCreateButton_Result
        }
      }
    }
  }
  ${ProjectCreateButton_ResultFragmentDoc}
`;

export function useProjectCreateButton_CreateProjectMutation() {
  return Urql.useMutation<
    ProjectCreateButton_CreateProjectMutation,
    ProjectCreateButton_CreateProjectMutationVariables
  >(ProjectCreateButton_CreateProjectDocument);
}
export const ProjectInvitationConfirmationDocument = gql`
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

export function useProjectInvitationConfirmationQuery(
  options: Omit<
    Urql.UseQueryArgs<ProjectInvitationConfirmationQueryVariables>,
    'query'
  >
) {
  return Urql.useQuery<
    ProjectInvitationConfirmationQuery,
    ProjectInvitationConfirmationQueryVariables
  >({ query: ProjectInvitationConfirmationDocument, ...options });
}
export const ProjectInvitationConfirmation_JoinProjectMemberDocument = gql`
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

export function useProjectInvitationConfirmation_JoinProjectMemberMutation() {
  return Urql.useMutation<
    ProjectInvitationConfirmation_JoinProjectMemberMutation,
    ProjectInvitationConfirmation_JoinProjectMemberMutationVariables
  >(ProjectInvitationConfirmation_JoinProjectMemberDocument);
}
export const ProjectMemberListDocument = gql`
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
  ${ProjectMemberList_ProjectMemberFragmentDoc}
  ${ProjectMemberList_ProjectMemberInvitationFragmentDoc}
`;

export function useProjectMemberListQuery(
  options: Omit<Urql.UseQueryArgs<ProjectMemberListQueryVariables>, 'query'>
) {
  return Urql.useQuery<ProjectMemberListQuery, ProjectMemberListQueryVariables>(
    { query: ProjectMemberListDocument, ...options }
  );
}
export const ProjectMemberInviteButton_InviteDocument = gql`
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

export function useProjectMemberInviteButton_InviteMutation() {
  return Urql.useMutation<
    ProjectMemberInviteButton_InviteMutation,
    ProjectMemberInviteButton_InviteMutationVariables
  >(ProjectMemberInviteButton_InviteDocument);
}
export const ProjectMemberSelectDocument = gql`
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
  ${ProjectMemberSelect_MemberFragmentDoc}
`;

export function useProjectMemberSelectQuery(
  options: Omit<Urql.UseQueryArgs<ProjectMemberSelectQueryVariables>, 'query'>
) {
  return Urql.useQuery<
    ProjectMemberSelectQuery,
    ProjectMemberSelectQueryVariables
  >({ query: ProjectMemberSelectDocument, ...options });
}
