import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import {
  ProjectBoardStatusEntity,
  ProjectBoardConfigEntity,
  ProjectMemberInvitationTokenEntity,
  ProjectMemberInvitationEntity,
  ProjectMemberEntity,
  StoryEntity,
  UserEntity,
  AccountEntity,
  ProjectEntity,
} from 'core-domain';
import { GraphqlServerContext } from '../context';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
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
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type CreateStorySuccessResult = {
  __typename?: 'CreateStorySuccessResult';
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
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type EstimateStorySuccessResult = {
  __typename?: 'EstimateStorySuccessResult';
  result: Story;
};

export type InvalidArgumentsResult = {
  __typename?: 'InvalidArgumentsResult';
  issues: Array<ValidationIssue>;
};

export type InviteProjectMemberInput = {
  id: Scalars['ID'];
  projectId: Scalars['ID'];
  role: ProjectMemberRole;
  userEmail: Scalars['String'];
};

export type InviteProjectMemberMutationResult =
  | InvalidArgumentsResult
  | InviteProjectMemberSuccessResult
  | UnauthorizedResult;

export type InviteProjectMemberSuccessResult = {
  __typename?: 'InviteProjectMemberSuccessResult';
  result?: Maybe<ProjectMemberInvitation>;
};

export type JoinProjectMemberAlreadyJoinedResult = {
  __typename?: 'JoinProjectMemberAlreadyJoinedResult';
  result: ProjectMember;
};

export type JoinProjectMemberInput = {
  confirmationToken: Scalars['String'];
  id: Scalars['ID'];
};

export type JoinProjectMemberMutationResult =
  | InvalidArgumentsResult
  | JoinProjectMemberAlreadyJoinedResult
  | JoinProjectMemberSuccessResult
  | JoinProjectMemberTokenIsAlreadyUsedResult
  | JoinProjectMemberTokenIsExpiredResult
  | UnauthorizedResult;

export type JoinProjectMemberSuccessResult = {
  __typename?: 'JoinProjectMemberSuccessResult';
  result: ProjectMember;
};

export type JoinProjectMemberTokenIsAlreadyUsedResult = {
  __typename?: 'JoinProjectMemberTokenIsAlreadyUsedResult';
  result: ProjectMemberInvitation;
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
  isDeleted: Scalars['Boolean'];
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
  completedAt?: Maybe<Scalars['DateTime']>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
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
  requesterId: Scalars['ID'];
  state: StoryState;
  title: Scalars['String'];
};

export type UpdateStoryMutationResult =
  | InvalidArgumentsResult
  | UnauthorizedResult
  | UpdateStorySuccessResult;

export type UpdateStoryStateInput = {
  id: Scalars['ID'];
  state: StoryState;
};

export type UpdateStoryStateMutationResult =
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<AccountEntity>;
  AccountConnection: ResolverTypeWrapper<
    Omit<AccountConnection, 'edges'> & {
      edges?: Maybe<Array<Maybe<ResolversTypes['AccountEdge']>>>;
    }
  >;
  AccountEdge: ResolverTypeWrapper<
    Omit<AccountEdge, 'node'> & { node?: Maybe<ResolversTypes['Account']> }
  >;
  Anonymous: ResolverTypeWrapper<Anonymous>;
  AnonymousConnection: ResolverTypeWrapper<AnonymousConnection>;
  AnonymousEdge: ResolverTypeWrapper<AnonymousEdge>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Connection:
    | ResolversTypes['AccountConnection']
    | ResolversTypes['AnonymousConnection']
    | ResolversTypes['ProjectConnection']
    | ResolversTypes['ProjectMemberConnection']
    | ResolversTypes['ProjectMemberInvitationConnection']
    | ResolversTypes['ProjectMemberInvitationTokenConnection']
    | ResolversTypes['StoryConnection']
    | ResolversTypes['UserConnection'];
  CreateAccountInput: CreateAccountInput;
  CreateAccountMutationResult:
    | ResolversTypes['CreateAccountSuccessResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult'];
  CreateAccountSuccessResult: ResolverTypeWrapper<
    Omit<CreateAccountSuccessResult, 'result'> & {
      result: ResolversTypes['Account'];
    }
  >;
  CreateProjectInput: CreateProjectInput;
  CreateProjectMutationResult:
    | ResolversTypes['CreateProjectSuccessResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult'];
  CreateProjectSuccessResult: ResolverTypeWrapper<
    Omit<CreateProjectSuccessResult, 'result'> & {
      result: ResolversTypes['Project'];
    }
  >;
  CreateStoryInput: CreateStoryInput;
  CreateStoryMutationResult:
    | ResolversTypes['CreateStorySuccessResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult'];
  CreateStorySuccessResult: ResolverTypeWrapper<
    Omit<CreateStorySuccessResult, 'result'> & {
      result: ResolversTypes['Story'];
    }
  >;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DayOfWeek: DayOfWeek;
  DestroyStoryInput: DestroyStoryInput;
  DestroyStoryMutationResult:
    | ResolversTypes['DestroyStorySuccessResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult'];
  DestroyStorySuccessResult: ResolverTypeWrapper<
    Omit<DestroyStorySuccessResult, 'result'> & {
      result: ResolversTypes['Story'];
    }
  >;
  Edge:
    | ResolversTypes['AccountEdge']
    | ResolversTypes['AnonymousEdge']
    | ResolversTypes['ProjectEdge']
    | ResolversTypes['ProjectMemberEdge']
    | ResolversTypes['ProjectMemberInvitationEdge']
    | ResolversTypes['ProjectMemberInvitationTokenEdge']
    | ResolversTypes['StoryEdge']
    | ResolversTypes['UserEdge'];
  EstimateStoryInput: EstimateStoryInput;
  EstimateStoryMutationResult:
    | ResolversTypes['EstimateStorySuccessResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult'];
  EstimateStorySuccessResult: ResolverTypeWrapper<
    Omit<EstimateStorySuccessResult, 'result'> & {
      result: ResolversTypes['Story'];
    }
  >;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InvalidArgumentsResult: ResolverTypeWrapper<InvalidArgumentsResult>;
  InviteProjectMemberInput: InviteProjectMemberInput;
  InviteProjectMemberMutationResult:
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['InviteProjectMemberSuccessResult']
    | ResolversTypes['UnauthorizedResult'];
  InviteProjectMemberSuccessResult: ResolverTypeWrapper<
    Omit<InviteProjectMemberSuccessResult, 'result'> & {
      result?: Maybe<ResolversTypes['ProjectMemberInvitation']>;
    }
  >;
  JoinProjectMemberAlreadyJoinedResult: ResolverTypeWrapper<
    Omit<JoinProjectMemberAlreadyJoinedResult, 'result'> & {
      result: ResolversTypes['ProjectMember'];
    }
  >;
  JoinProjectMemberInput: JoinProjectMemberInput;
  JoinProjectMemberMutationResult:
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['JoinProjectMemberAlreadyJoinedResult']
    | ResolversTypes['JoinProjectMemberSuccessResult']
    | ResolversTypes['JoinProjectMemberTokenIsAlreadyUsedResult']
    | ResolversTypes['JoinProjectMemberTokenIsExpiredResult']
    | ResolversTypes['UnauthorizedResult'];
  JoinProjectMemberSuccessResult: ResolverTypeWrapper<
    Omit<JoinProjectMemberSuccessResult, 'result'> & {
      result: ResolversTypes['ProjectMember'];
    }
  >;
  JoinProjectMemberTokenIsAlreadyUsedResult: ResolverTypeWrapper<
    Omit<JoinProjectMemberTokenIsAlreadyUsedResult, 'result'> & {
      result: ResolversTypes['ProjectMemberInvitation'];
    }
  >;
  JoinProjectMemberTokenIsExpiredResult: ResolverTypeWrapper<JoinProjectMemberTokenIsExpiredResult>;
  MoveStoriesInput: MoveStoriesInput;
  MoveStoriesMutationResult:
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['MoveStoriesSuccessResult']
    | ResolversTypes['UnauthorizedResult'];
  MoveStoriesStoryDestination: MoveStoriesStoryDestination;
  MoveStoriesSuccessResult: ResolverTypeWrapper<
    Omit<MoveStoriesSuccessResult, 'result'> & {
      result: Array<ResolversTypes['Story']>;
    }
  >;
  Mutation: ResolverTypeWrapper<{}>;
  Node:
    | ResolversTypes['Account']
    | ResolversTypes['Anonymous']
    | ResolversTypes['Project']
    | ResolversTypes['ProjectBoardConfig']
    | ResolversTypes['ProjectBoardStatus']
    | ResolversTypes['ProjectMember']
    | ResolversTypes['ProjectMemberInvitation']
    | ResolversTypes['ProjectMemberInvitationToken']
    | ResolversTypes['Story']
    | ResolversTypes['User'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PagedConnection: never;
  PagedPageInfo: ResolverTypeWrapper<PagedPageInfo>;
  Project: ResolverTypeWrapper<ProjectEntity>;
  ProjectBoardConfig: ResolverTypeWrapper<ProjectBoardConfigEntity>;
  ProjectBoardStatus: ResolverTypeWrapper<ProjectBoardStatusEntity>;
  ProjectConnection: ResolverTypeWrapper<
    Omit<ProjectConnection, 'edges'> & {
      edges?: Maybe<Array<Maybe<ResolversTypes['ProjectEdge']>>>;
    }
  >;
  ProjectEdge: ResolverTypeWrapper<
    Omit<ProjectEdge, 'node'> & { node?: Maybe<ResolversTypes['Project']> }
  >;
  ProjectMember: ResolverTypeWrapper<ProjectMemberEntity>;
  ProjectMemberConnection: ResolverTypeWrapper<
    Omit<ProjectMemberConnection, 'edges'> & {
      edges?: Maybe<Array<Maybe<ResolversTypes['ProjectMemberEdge']>>>;
    }
  >;
  ProjectMemberEdge: ResolverTypeWrapper<
    Omit<ProjectMemberEdge, 'node'> & {
      node?: Maybe<ResolversTypes['ProjectMember']>;
    }
  >;
  ProjectMemberInvitation: ResolverTypeWrapper<ProjectMemberInvitationEntity>;
  ProjectMemberInvitationConnection: ResolverTypeWrapper<
    Omit<ProjectMemberInvitationConnection, 'edges'> & {
      edges?: Maybe<
        Array<Maybe<ResolversTypes['ProjectMemberInvitationEdge']>>
      >;
    }
  >;
  ProjectMemberInvitationEdge: ResolverTypeWrapper<
    Omit<ProjectMemberInvitationEdge, 'node'> & {
      node?: Maybe<ResolversTypes['ProjectMemberInvitation']>;
    }
  >;
  ProjectMemberInvitationToken: ResolverTypeWrapper<ProjectMemberInvitationTokenEntity>;
  ProjectMemberInvitationTokenConnection: ResolverTypeWrapper<
    Omit<ProjectMemberInvitationTokenConnection, 'edges'> & {
      edges?: Maybe<
        Array<Maybe<ResolversTypes['ProjectMemberInvitationTokenEdge']>>
      >;
    }
  >;
  ProjectMemberInvitationTokenEdge: ResolverTypeWrapper<
    Omit<ProjectMemberInvitationTokenEdge, 'node'> & {
      node?: Maybe<ResolversTypes['ProjectMemberInvitationToken']>;
    }
  >;
  ProjectMemberRole: ProjectMemberRole;
  ProjectPrivacy: ProjectPrivacy;
  Query: ResolverTypeWrapper<{}>;
  Story: ResolverTypeWrapper<StoryEntity>;
  StoryConnection: ResolverTypeWrapper<
    Omit<StoryConnection, 'edges'> & {
      edges?: Maybe<Array<Maybe<ResolversTypes['StoryEdge']>>>;
    }
  >;
  StoryEdge: ResolverTypeWrapper<
    Omit<StoryEdge, 'node'> & { node?: Maybe<ResolversTypes['Story']> }
  >;
  StoryKind: StoryKind;
  StoryPosition: StoryPosition;
  StoryState: StoryState;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  UnauthorizedResult: ResolverTypeWrapper<UnauthorizedResult>;
  UpdateAccountInput: UpdateAccountInput;
  UpdateAccountMutationResult:
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult']
    | ResolversTypes['UpdateAccountSuccessResult'];
  UpdateAccountSuccessResult: ResolverTypeWrapper<
    Omit<UpdateAccountSuccessResult, 'result'> & {
      result: ResolversTypes['Account'];
    }
  >;
  UpdateStoryInput: UpdateStoryInput;
  UpdateStoryMutationResult:
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult']
    | ResolversTypes['UpdateStorySuccessResult'];
  UpdateStoryStateInput: UpdateStoryStateInput;
  UpdateStoryStateMutationResult:
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult']
    | ResolversTypes['UpdateStoryStateSuccessResult'];
  UpdateStoryStateSuccessResult: ResolverTypeWrapper<
    Omit<UpdateStoryStateSuccessResult, 'effectedStories' | 'result'> & {
      effectedStories: Array<ResolversTypes['Story']>;
      result: ResolversTypes['Story'];
    }
  >;
  UpdateStorySuccessResult: ResolverTypeWrapper<
    Omit<UpdateStorySuccessResult, 'effectedStories' | 'result'> & {
      effectedStories: Array<ResolversTypes['Story']>;
      result: ResolversTypes['Story'];
    }
  >;
  User: ResolverTypeWrapper<UserEntity>;
  UserConnection: ResolverTypeWrapper<
    Omit<UserConnection, 'edges'> & {
      edges?: Maybe<Array<Maybe<ResolversTypes['UserEdge']>>>;
    }
  >;
  UserEdge: ResolverTypeWrapper<
    Omit<UserEdge, 'node'> & { node?: Maybe<ResolversTypes['User']> }
  >;
  ValidationIssue: ResolverTypeWrapper<ValidationIssue>;
  Viewer: ResolverTypeWrapper<UserEntity>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: AccountEntity;
  AccountConnection: Omit<AccountConnection, 'edges'> & {
    edges?: Maybe<Array<Maybe<ResolversParentTypes['AccountEdge']>>>;
  };
  AccountEdge: Omit<AccountEdge, 'node'> & {
    node?: Maybe<ResolversParentTypes['Account']>;
  };
  Anonymous: Anonymous;
  AnonymousConnection: AnonymousConnection;
  AnonymousEdge: AnonymousEdge;
  Boolean: Scalars['Boolean'];
  Connection:
    | ResolversParentTypes['AccountConnection']
    | ResolversParentTypes['AnonymousConnection']
    | ResolversParentTypes['ProjectConnection']
    | ResolversParentTypes['ProjectMemberConnection']
    | ResolversParentTypes['ProjectMemberInvitationConnection']
    | ResolversParentTypes['ProjectMemberInvitationTokenConnection']
    | ResolversParentTypes['StoryConnection']
    | ResolversParentTypes['UserConnection'];
  CreateAccountInput: CreateAccountInput;
  CreateAccountMutationResult:
    | ResolversParentTypes['CreateAccountSuccessResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult'];
  CreateAccountSuccessResult: Omit<CreateAccountSuccessResult, 'result'> & {
    result: ResolversParentTypes['Account'];
  };
  CreateProjectInput: CreateProjectInput;
  CreateProjectMutationResult:
    | ResolversParentTypes['CreateProjectSuccessResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult'];
  CreateProjectSuccessResult: Omit<CreateProjectSuccessResult, 'result'> & {
    result: ResolversParentTypes['Project'];
  };
  CreateStoryInput: CreateStoryInput;
  CreateStoryMutationResult:
    | ResolversParentTypes['CreateStorySuccessResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult'];
  CreateStorySuccessResult: Omit<CreateStorySuccessResult, 'result'> & {
    result: ResolversParentTypes['Story'];
  };
  DateTime: Scalars['DateTime'];
  DestroyStoryInput: DestroyStoryInput;
  DestroyStoryMutationResult:
    | ResolversParentTypes['DestroyStorySuccessResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult'];
  DestroyStorySuccessResult: Omit<DestroyStorySuccessResult, 'result'> & {
    result: ResolversParentTypes['Story'];
  };
  Edge:
    | ResolversParentTypes['AccountEdge']
    | ResolversParentTypes['AnonymousEdge']
    | ResolversParentTypes['ProjectEdge']
    | ResolversParentTypes['ProjectMemberEdge']
    | ResolversParentTypes['ProjectMemberInvitationEdge']
    | ResolversParentTypes['ProjectMemberInvitationTokenEdge']
    | ResolversParentTypes['StoryEdge']
    | ResolversParentTypes['UserEdge'];
  EstimateStoryInput: EstimateStoryInput;
  EstimateStoryMutationResult:
    | ResolversParentTypes['EstimateStorySuccessResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult'];
  EstimateStorySuccessResult: Omit<EstimateStorySuccessResult, 'result'> & {
    result: ResolversParentTypes['Story'];
  };
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InvalidArgumentsResult: InvalidArgumentsResult;
  InviteProjectMemberInput: InviteProjectMemberInput;
  InviteProjectMemberMutationResult:
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['InviteProjectMemberSuccessResult']
    | ResolversParentTypes['UnauthorizedResult'];
  InviteProjectMemberSuccessResult: Omit<
    InviteProjectMemberSuccessResult,
    'result'
  > & { result?: Maybe<ResolversParentTypes['ProjectMemberInvitation']> };
  JoinProjectMemberAlreadyJoinedResult: Omit<
    JoinProjectMemberAlreadyJoinedResult,
    'result'
  > & { result: ResolversParentTypes['ProjectMember'] };
  JoinProjectMemberInput: JoinProjectMemberInput;
  JoinProjectMemberMutationResult:
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['JoinProjectMemberAlreadyJoinedResult']
    | ResolversParentTypes['JoinProjectMemberSuccessResult']
    | ResolversParentTypes['JoinProjectMemberTokenIsAlreadyUsedResult']
    | ResolversParentTypes['JoinProjectMemberTokenIsExpiredResult']
    | ResolversParentTypes['UnauthorizedResult'];
  JoinProjectMemberSuccessResult: Omit<
    JoinProjectMemberSuccessResult,
    'result'
  > & { result: ResolversParentTypes['ProjectMember'] };
  JoinProjectMemberTokenIsAlreadyUsedResult: Omit<
    JoinProjectMemberTokenIsAlreadyUsedResult,
    'result'
  > & { result: ResolversParentTypes['ProjectMemberInvitation'] };
  JoinProjectMemberTokenIsExpiredResult: JoinProjectMemberTokenIsExpiredResult;
  MoveStoriesInput: MoveStoriesInput;
  MoveStoriesMutationResult:
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['MoveStoriesSuccessResult']
    | ResolversParentTypes['UnauthorizedResult'];
  MoveStoriesStoryDestination: MoveStoriesStoryDestination;
  MoveStoriesSuccessResult: Omit<MoveStoriesSuccessResult, 'result'> & {
    result: Array<ResolversParentTypes['Story']>;
  };
  Mutation: {};
  Node:
    | ResolversParentTypes['Account']
    | ResolversParentTypes['Anonymous']
    | ResolversParentTypes['Project']
    | ResolversParentTypes['ProjectBoardConfig']
    | ResolversParentTypes['ProjectBoardStatus']
    | ResolversParentTypes['ProjectMember']
    | ResolversParentTypes['ProjectMemberInvitation']
    | ResolversParentTypes['ProjectMemberInvitationToken']
    | ResolversParentTypes['Story']
    | ResolversParentTypes['User'];
  PageInfo: PageInfo;
  PagedConnection: never;
  PagedPageInfo: PagedPageInfo;
  Project: ProjectEntity;
  ProjectBoardConfig: ProjectBoardConfigEntity;
  ProjectBoardStatus: ProjectBoardStatusEntity;
  ProjectConnection: Omit<ProjectConnection, 'edges'> & {
    edges?: Maybe<Array<Maybe<ResolversParentTypes['ProjectEdge']>>>;
  };
  ProjectEdge: Omit<ProjectEdge, 'node'> & {
    node?: Maybe<ResolversParentTypes['Project']>;
  };
  ProjectMember: ProjectMemberEntity;
  ProjectMemberConnection: Omit<ProjectMemberConnection, 'edges'> & {
    edges?: Maybe<Array<Maybe<ResolversParentTypes['ProjectMemberEdge']>>>;
  };
  ProjectMemberEdge: Omit<ProjectMemberEdge, 'node'> & {
    node?: Maybe<ResolversParentTypes['ProjectMember']>;
  };
  ProjectMemberInvitation: ProjectMemberInvitationEntity;
  ProjectMemberInvitationConnection: Omit<
    ProjectMemberInvitationConnection,
    'edges'
  > & {
    edges?: Maybe<
      Array<Maybe<ResolversParentTypes['ProjectMemberInvitationEdge']>>
    >;
  };
  ProjectMemberInvitationEdge: Omit<ProjectMemberInvitationEdge, 'node'> & {
    node?: Maybe<ResolversParentTypes['ProjectMemberInvitation']>;
  };
  ProjectMemberInvitationToken: ProjectMemberInvitationTokenEntity;
  ProjectMemberInvitationTokenConnection: Omit<
    ProjectMemberInvitationTokenConnection,
    'edges'
  > & {
    edges?: Maybe<
      Array<Maybe<ResolversParentTypes['ProjectMemberInvitationTokenEdge']>>
    >;
  };
  ProjectMemberInvitationTokenEdge: Omit<
    ProjectMemberInvitationTokenEdge,
    'node'
  > & { node?: Maybe<ResolversParentTypes['ProjectMemberInvitationToken']> };
  Query: {};
  Story: StoryEntity;
  StoryConnection: Omit<StoryConnection, 'edges'> & {
    edges?: Maybe<Array<Maybe<ResolversParentTypes['StoryEdge']>>>;
  };
  StoryEdge: Omit<StoryEdge, 'node'> & {
    node?: Maybe<ResolversParentTypes['Story']>;
  };
  String: Scalars['String'];
  Subscription: {};
  UnauthorizedResult: UnauthorizedResult;
  UpdateAccountInput: UpdateAccountInput;
  UpdateAccountMutationResult:
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult']
    | ResolversParentTypes['UpdateAccountSuccessResult'];
  UpdateAccountSuccessResult: Omit<UpdateAccountSuccessResult, 'result'> & {
    result: ResolversParentTypes['Account'];
  };
  UpdateStoryInput: UpdateStoryInput;
  UpdateStoryMutationResult:
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult']
    | ResolversParentTypes['UpdateStorySuccessResult'];
  UpdateStoryStateInput: UpdateStoryStateInput;
  UpdateStoryStateMutationResult:
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult']
    | ResolversParentTypes['UpdateStoryStateSuccessResult'];
  UpdateStoryStateSuccessResult: Omit<
    UpdateStoryStateSuccessResult,
    'effectedStories' | 'result'
  > & {
    effectedStories: Array<ResolversParentTypes['Story']>;
    result: ResolversParentTypes['Story'];
  };
  UpdateStorySuccessResult: Omit<
    UpdateStorySuccessResult,
    'effectedStories' | 'result'
  > & {
    effectedStories: Array<ResolversParentTypes['Story']>;
    result: ResolversParentTypes['Story'];
  };
  User: UserEntity;
  UserConnection: Omit<UserConnection, 'edges'> & {
    edges?: Maybe<Array<Maybe<ResolversParentTypes['UserEdge']>>>;
  };
  UserEdge: Omit<UserEdge, 'node'> & {
    node?: Maybe<ResolversParentTypes['User']>;
  };
  ValidationIssue: ValidationIssue;
  Viewer: UserEntity;
};

export type AccountResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isDeleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<
    ResolversTypes['ProjectConnection'],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountConnectionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['AccountConnection'] = ResolversParentTypes['AccountConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['AccountEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes['PageInfo']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountEdgeResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['AccountEdge'] = ResolversParentTypes['AccountEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnonymousResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Anonymous'] = ResolversParentTypes['Anonymous']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnonymousConnectionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['AnonymousConnection'] = ResolversParentTypes['AnonymousConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['AnonymousEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes['PageInfo']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnonymousEdgeResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['AnonymousEdge'] = ResolversParentTypes['AnonymousEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Anonymous']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']
> = {
  __resolveType: TypeResolveFn<
    | 'AccountConnection'
    | 'AnonymousConnection'
    | 'ProjectConnection'
    | 'ProjectMemberConnection'
    | 'ProjectMemberInvitationConnection'
    | 'ProjectMemberInvitationTokenConnection'
    | 'StoryConnection'
    | 'UserConnection',
    ParentType,
    ContextType
  >;
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Edge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes['PageInfo']>,
    ParentType,
    ContextType
  >;
};

export type CreateAccountMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['CreateAccountMutationResult'] = ResolversParentTypes['CreateAccountMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'CreateAccountSuccessResult'
    | 'InvalidArgumentsResult'
    | 'UnauthorizedResult',
    ParentType,
    ContextType
  >;
};

export type CreateAccountSuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['CreateAccountSuccessResult'] = ResolversParentTypes['CreateAccountSuccessResult']
> = {
  result?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateProjectMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['CreateProjectMutationResult'] = ResolversParentTypes['CreateProjectMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'CreateProjectSuccessResult'
    | 'InvalidArgumentsResult'
    | 'UnauthorizedResult',
    ParentType,
    ContextType
  >;
};

export type CreateProjectSuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['CreateProjectSuccessResult'] = ResolversParentTypes['CreateProjectSuccessResult']
> = {
  result?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateStoryMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['CreateStoryMutationResult'] = ResolversParentTypes['CreateStoryMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'CreateStorySuccessResult'
    | 'InvalidArgumentsResult'
    | 'UnauthorizedResult',
    ParentType,
    ContextType
  >;
};

export type CreateStorySuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['CreateStorySuccessResult'] = ResolversParentTypes['CreateStorySuccessResult']
> = {
  result?: Resolver<ResolversTypes['Story'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DestroyStoryMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['DestroyStoryMutationResult'] = ResolversParentTypes['DestroyStoryMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'DestroyStorySuccessResult'
    | 'InvalidArgumentsResult'
    | 'UnauthorizedResult',
    ParentType,
    ContextType
  >;
};

export type DestroyStorySuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['DestroyStorySuccessResult'] = ResolversParentTypes['DestroyStorySuccessResult']
> = {
  result?: Resolver<ResolversTypes['Story'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EdgeResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']
> = {
  __resolveType: TypeResolveFn<
    | 'AccountEdge'
    | 'AnonymousEdge'
    | 'ProjectEdge'
    | 'ProjectMemberEdge'
    | 'ProjectMemberInvitationEdge'
    | 'ProjectMemberInvitationTokenEdge'
    | 'StoryEdge'
    | 'UserEdge',
    ParentType,
    ContextType
  >;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType>;
};

export type EstimateStoryMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['EstimateStoryMutationResult'] = ResolversParentTypes['EstimateStoryMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'EstimateStorySuccessResult'
    | 'InvalidArgumentsResult'
    | 'UnauthorizedResult',
    ParentType,
    ContextType
  >;
};

export type EstimateStorySuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['EstimateStorySuccessResult'] = ResolversParentTypes['EstimateStorySuccessResult']
> = {
  result?: Resolver<ResolversTypes['Story'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvalidArgumentsResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['InvalidArgumentsResult'] = ResolversParentTypes['InvalidArgumentsResult']
> = {
  issues?: Resolver<
    Array<ResolversTypes['ValidationIssue']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InviteProjectMemberMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['InviteProjectMemberMutationResult'] = ResolversParentTypes['InviteProjectMemberMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'InvalidArgumentsResult'
    | 'InviteProjectMemberSuccessResult'
    | 'UnauthorizedResult',
    ParentType,
    ContextType
  >;
};

export type InviteProjectMemberSuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['InviteProjectMemberSuccessResult'] = ResolversParentTypes['InviteProjectMemberSuccessResult']
> = {
  result?: Resolver<
    Maybe<ResolversTypes['ProjectMemberInvitation']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JoinProjectMemberAlreadyJoinedResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['JoinProjectMemberAlreadyJoinedResult'] = ResolversParentTypes['JoinProjectMemberAlreadyJoinedResult']
> = {
  result?: Resolver<ResolversTypes['ProjectMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JoinProjectMemberMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['JoinProjectMemberMutationResult'] = ResolversParentTypes['JoinProjectMemberMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'InvalidArgumentsResult'
    | 'JoinProjectMemberAlreadyJoinedResult'
    | 'JoinProjectMemberSuccessResult'
    | 'JoinProjectMemberTokenIsAlreadyUsedResult'
    | 'JoinProjectMemberTokenIsExpiredResult'
    | 'UnauthorizedResult',
    ParentType,
    ContextType
  >;
};

export type JoinProjectMemberSuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['JoinProjectMemberSuccessResult'] = ResolversParentTypes['JoinProjectMemberSuccessResult']
> = {
  result?: Resolver<ResolversTypes['ProjectMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JoinProjectMemberTokenIsAlreadyUsedResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['JoinProjectMemberTokenIsAlreadyUsedResult'] = ResolversParentTypes['JoinProjectMemberTokenIsAlreadyUsedResult']
> = {
  result?: Resolver<
    ResolversTypes['ProjectMemberInvitation'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JoinProjectMemberTokenIsExpiredResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['JoinProjectMemberTokenIsExpiredResult'] = ResolversParentTypes['JoinProjectMemberTokenIsExpiredResult']
> = {
  expiredAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MoveStoriesMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['MoveStoriesMutationResult'] = ResolversParentTypes['MoveStoriesMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'InvalidArgumentsResult'
    | 'MoveStoriesSuccessResult'
    | 'UnauthorizedResult',
    ParentType,
    ContextType
  >;
};

export type MoveStoriesSuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['MoveStoriesSuccessResult'] = ResolversParentTypes['MoveStoriesSuccessResult']
> = {
  result?: Resolver<Array<ResolversTypes['Story']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createAccount?: Resolver<
    ResolversTypes['CreateAccountMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateAccountArgs, 'input'>
  >;
  createProject?: Resolver<
    ResolversTypes['CreateProjectMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateProjectArgs, 'input'>
  >;
  createStory?: Resolver<
    ResolversTypes['CreateStoryMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateStoryArgs, 'input'>
  >;
  destroyStory?: Resolver<
    ResolversTypes['DestroyStoryMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationDestroyStoryArgs, 'input'>
  >;
  estimateStory?: Resolver<
    ResolversTypes['EstimateStoryMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationEstimateStoryArgs, 'input'>
  >;
  inviteProjectMember?: Resolver<
    ResolversTypes['InviteProjectMemberMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationInviteProjectMemberArgs, 'input'>
  >;
  joinProjectMember?: Resolver<
    ResolversTypes['JoinProjectMemberMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationJoinProjectMemberArgs, 'input'>
  >;
  moveStories?: Resolver<
    ResolversTypes['MoveStoriesMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationMoveStoriesArgs, 'input'>
  >;
  updateAccount?: Resolver<
    ResolversTypes['UpdateAccountMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateAccountArgs, 'input'>
  >;
  updateStory?: Resolver<
    ResolversTypes['UpdateStoryMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateStoryArgs, 'input'>
  >;
  updateStoryState?: Resolver<
    ResolversTypes['UpdateStoryStateMutationResult'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateStoryStateArgs, 'input'>
  >;
};

export type NodeResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']
> = {
  __resolveType: TypeResolveFn<
    | 'Account'
    | 'Anonymous'
    | 'Project'
    | 'ProjectBoardConfig'
    | 'ProjectBoardStatus'
    | 'ProjectMember'
    | 'ProjectMemberInvitation'
    | 'ProjectMemberInvitationToken'
    | 'Story'
    | 'User',
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  endCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  startCursor?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PagedConnectionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['PagedConnection'] = ResolversParentTypes['PagedConnection']
> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  nodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Node']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes['PagedPageInfo']>,
    ParentType,
    ContextType
  >;
};

export type PagedPageInfoResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['PagedPageInfo'] = ResolversParentTypes['PagedPageInfo']
> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  totalPagesCount?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']
> = {
  accountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  boardConfig?: Resolver<
    ResolversTypes['ProjectBoardConfig'],
    ParentType,
    ContextType
  >;
  boardStatus?: Resolver<
    ResolversTypes['ProjectBoardStatus'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invitations?: Resolver<
    ResolversTypes['ProjectMemberInvitationConnection'],
    ParentType,
    ContextType
  >;
  isDeleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  members?: Resolver<
    ResolversTypes['ProjectMemberConnection'],
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privacy?: Resolver<ResolversTypes['ProjectPrivacy'], ParentType, ContextType>;
  stories?: Resolver<
    ResolversTypes['StoryConnection'],
    ParentType,
    ContextType,
    Partial<ProjectStoriesArgs>
  >;
  story?: Resolver<
    Maybe<ResolversTypes['Story']>,
    ParentType,
    ContextType,
    RequireFields<ProjectStoryArgs, 'id'>
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectBoardConfigResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectBoardConfig'] = ResolversParentTypes['ProjectBoardConfig']
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  initialVelocity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  iterationLength?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  startIterationOn?: Resolver<
    ResolversTypes['DayOfWeek'],
    ParentType,
    ContextType
  >;
  startIterationWeekNumber?: Resolver<
    ResolversTypes['Int'],
    ParentType,
    ContextType
  >;
  startOn?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectBoardStatusResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectBoardStatus'] = ResolversParentTypes['ProjectBoardStatus']
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  velocity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectConnectionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectConnection'] = ResolversParentTypes['ProjectConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ProjectEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes['PageInfo']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectEdgeResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectEdge'] = ResolversParentTypes['ProjectEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMemberResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectMember'] = ResolversParentTypes['ProjectMember']
> = {
  avatarImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['ProjectMemberRole'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMemberConnectionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectMemberConnection'] = ResolversParentTypes['ProjectMemberConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ProjectMemberEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes['PageInfo']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMemberEdgeResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectMemberEdge'] = ResolversParentTypes['ProjectMemberEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<
    Maybe<ResolversTypes['ProjectMember']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMemberInvitationResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectMemberInvitation'] = ResolversParentTypes['ProjectMemberInvitation']
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isJoined?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  projectName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['ProjectMemberRole'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMemberInvitationConnectionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectMemberInvitationConnection'] = ResolversParentTypes['ProjectMemberInvitationConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ProjectMemberInvitationEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes['PageInfo']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMemberInvitationEdgeResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectMemberInvitationEdge'] = ResolversParentTypes['ProjectMemberInvitationEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<
    Maybe<ResolversTypes['ProjectMemberInvitation']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMemberInvitationTokenResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectMemberInvitationToken'] = ResolversParentTypes['ProjectMemberInvitationToken']
> = {
  confirmationToken?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expiredAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invitation?: Resolver<
    ResolversTypes['ProjectMemberInvitation'],
    ParentType,
    ContextType
  >;
  isExpired?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMemberInvitationTokenConnectionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectMemberInvitationTokenConnection'] = ResolversParentTypes['ProjectMemberInvitationTokenConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ProjectMemberInvitationTokenEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes['PageInfo']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectMemberInvitationTokenEdgeResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ProjectMemberInvitationTokenEdge'] = ResolversParentTypes['ProjectMemberInvitationTokenEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<
    Maybe<ResolversTypes['ProjectMemberInvitationToken']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  anonymous?: Resolver<
    Maybe<ResolversTypes['Anonymous']>,
    ParentType,
    ContextType
  >;
  node?: Resolver<
    Maybe<ResolversTypes['Node']>,
    ParentType,
    ContextType,
    RequireFields<QueryNodeArgs, 'id'>
  >;
  viewer?: Resolver<Maybe<ResolversTypes['Viewer']>, ParentType, ContextType>;
};

export type StoryResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Story'] = ResolversParentTypes['Story']
> = {
  completedAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isCompleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isDeleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isUnEstimated?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['StoryKind'], ParentType, ContextType>;
  owners?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  position?: Resolver<ResolversTypes['StoryPosition'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  releaseDate?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  requester?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  requesterId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['StoryState'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryConnectionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['StoryConnection'] = ResolversParentTypes['StoryConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['StoryEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes['PageInfo']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryEdgeResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['StoryEdge'] = ResolversParentTypes['StoryEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Story']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']
> = {
  subscribeStoryUpdate?: SubscriptionResolver<
    Maybe<ResolversTypes['Story']>,
    'subscribeStoryUpdate',
    ParentType,
    ContextType,
    RequireFields<SubscriptionSubscribeStoryUpdateArgs, 'projectId'>
  >;
};

export type UnauthorizedResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['UnauthorizedResult'] = ResolversParentTypes['UnauthorizedResult']
> = {
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateAccountMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['UpdateAccountMutationResult'] = ResolversParentTypes['UpdateAccountMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'InvalidArgumentsResult'
    | 'UnauthorizedResult'
    | 'UpdateAccountSuccessResult',
    ParentType,
    ContextType
  >;
};

export type UpdateAccountSuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['UpdateAccountSuccessResult'] = ResolversParentTypes['UpdateAccountSuccessResult']
> = {
  result?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateStoryMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['UpdateStoryMutationResult'] = ResolversParentTypes['UpdateStoryMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'InvalidArgumentsResult'
    | 'UnauthorizedResult'
    | 'UpdateStorySuccessResult',
    ParentType,
    ContextType
  >;
};

export type UpdateStoryStateMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['UpdateStoryStateMutationResult'] = ResolversParentTypes['UpdateStoryStateMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'InvalidArgumentsResult'
    | 'UnauthorizedResult'
    | 'UpdateStoryStateSuccessResult',
    ParentType,
    ContextType
  >;
};

export type UpdateStoryStateSuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['UpdateStoryStateSuccessResult'] = ResolversParentTypes['UpdateStoryStateSuccessResult']
> = {
  effectedStories?: Resolver<
    Array<ResolversTypes['Story']>,
    ParentType,
    ContextType
  >;
  result?: Resolver<ResolversTypes['Story'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateStorySuccessResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['UpdateStorySuccessResult'] = ResolversParentTypes['UpdateStorySuccessResult']
> = {
  effectedStories?: Resolver<
    Array<ResolversTypes['Story']>,
    ParentType,
    ContextType
  >;
  result?: Resolver<ResolversTypes['Story'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']
> = {
  edges?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['UserEdge']>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes['PageInfo']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']
> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationIssueResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['ValidationIssue'] = ResolversParentTypes['ValidationIssue']
> = {
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ViewerResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['Viewer'] = ResolversParentTypes['Viewer']
> = {
  accounts?: Resolver<
    ResolversTypes['AccountConnection'],
    ParentType,
    ContextType,
    Partial<ViewerAccountsArgs>
  >;
  avatarImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invitationToken?: Resolver<
    Maybe<ResolversTypes['ProjectMemberInvitationToken']>,
    ParentType,
    ContextType,
    RequireFields<ViewerInvitationTokenArgs, 'confirmationToken'>
  >;
  project?: Resolver<
    Maybe<ResolversTypes['Project']>,
    ParentType,
    ContextType,
    RequireFields<ViewerProjectArgs, 'id'>
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphqlServerContext> = {
  Account?: AccountResolvers<ContextType>;
  AccountConnection?: AccountConnectionResolvers<ContextType>;
  AccountEdge?: AccountEdgeResolvers<ContextType>;
  Anonymous?: AnonymousResolvers<ContextType>;
  AnonymousConnection?: AnonymousConnectionResolvers<ContextType>;
  AnonymousEdge?: AnonymousEdgeResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  CreateAccountMutationResult?: CreateAccountMutationResultResolvers<ContextType>;
  CreateAccountSuccessResult?: CreateAccountSuccessResultResolvers<ContextType>;
  CreateProjectMutationResult?: CreateProjectMutationResultResolvers<ContextType>;
  CreateProjectSuccessResult?: CreateProjectSuccessResultResolvers<ContextType>;
  CreateStoryMutationResult?: CreateStoryMutationResultResolvers<ContextType>;
  CreateStorySuccessResult?: CreateStorySuccessResultResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DestroyStoryMutationResult?: DestroyStoryMutationResultResolvers<ContextType>;
  DestroyStorySuccessResult?: DestroyStorySuccessResultResolvers<ContextType>;
  Edge?: EdgeResolvers<ContextType>;
  EstimateStoryMutationResult?: EstimateStoryMutationResultResolvers<ContextType>;
  EstimateStorySuccessResult?: EstimateStorySuccessResultResolvers<ContextType>;
  InvalidArgumentsResult?: InvalidArgumentsResultResolvers<ContextType>;
  InviteProjectMemberMutationResult?: InviteProjectMemberMutationResultResolvers<ContextType>;
  InviteProjectMemberSuccessResult?: InviteProjectMemberSuccessResultResolvers<ContextType>;
  JoinProjectMemberAlreadyJoinedResult?: JoinProjectMemberAlreadyJoinedResultResolvers<ContextType>;
  JoinProjectMemberMutationResult?: JoinProjectMemberMutationResultResolvers<ContextType>;
  JoinProjectMemberSuccessResult?: JoinProjectMemberSuccessResultResolvers<ContextType>;
  JoinProjectMemberTokenIsAlreadyUsedResult?: JoinProjectMemberTokenIsAlreadyUsedResultResolvers<ContextType>;
  JoinProjectMemberTokenIsExpiredResult?: JoinProjectMemberTokenIsExpiredResultResolvers<ContextType>;
  MoveStoriesMutationResult?: MoveStoriesMutationResultResolvers<ContextType>;
  MoveStoriesSuccessResult?: MoveStoriesSuccessResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PagedConnection?: PagedConnectionResolvers<ContextType>;
  PagedPageInfo?: PagedPageInfoResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectBoardConfig?: ProjectBoardConfigResolvers<ContextType>;
  ProjectBoardStatus?: ProjectBoardStatusResolvers<ContextType>;
  ProjectConnection?: ProjectConnectionResolvers<ContextType>;
  ProjectEdge?: ProjectEdgeResolvers<ContextType>;
  ProjectMember?: ProjectMemberResolvers<ContextType>;
  ProjectMemberConnection?: ProjectMemberConnectionResolvers<ContextType>;
  ProjectMemberEdge?: ProjectMemberEdgeResolvers<ContextType>;
  ProjectMemberInvitation?: ProjectMemberInvitationResolvers<ContextType>;
  ProjectMemberInvitationConnection?: ProjectMemberInvitationConnectionResolvers<ContextType>;
  ProjectMemberInvitationEdge?: ProjectMemberInvitationEdgeResolvers<ContextType>;
  ProjectMemberInvitationToken?: ProjectMemberInvitationTokenResolvers<ContextType>;
  ProjectMemberInvitationTokenConnection?: ProjectMemberInvitationTokenConnectionResolvers<ContextType>;
  ProjectMemberInvitationTokenEdge?: ProjectMemberInvitationTokenEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Story?: StoryResolvers<ContextType>;
  StoryConnection?: StoryConnectionResolvers<ContextType>;
  StoryEdge?: StoryEdgeResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  UnauthorizedResult?: UnauthorizedResultResolvers<ContextType>;
  UpdateAccountMutationResult?: UpdateAccountMutationResultResolvers<ContextType>;
  UpdateAccountSuccessResult?: UpdateAccountSuccessResultResolvers<ContextType>;
  UpdateStoryMutationResult?: UpdateStoryMutationResultResolvers<ContextType>;
  UpdateStoryStateMutationResult?: UpdateStoryStateMutationResultResolvers<ContextType>;
  UpdateStoryStateSuccessResult?: UpdateStoryStateSuccessResultResolvers<ContextType>;
  UpdateStorySuccessResult?: UpdateStorySuccessResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  ValidationIssue?: ValidationIssueResolvers<ContextType>;
  Viewer?: ViewerResolvers<ContextType>;
};
