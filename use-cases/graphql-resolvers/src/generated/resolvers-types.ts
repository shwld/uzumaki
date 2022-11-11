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
  NullableID: string | null;
};

export type Account = Node & {
  readonly __typename?: 'Account';
  readonly createdAt: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly isDeleted: Scalars['Boolean'];
  readonly name: Scalars['String'];
  readonly projects: ProjectConnection;
  readonly updatedAt: Scalars['DateTime'];
};

export type AccountConnection = Connection & {
  readonly __typename?: 'AccountConnection';
  readonly edges?: Maybe<ReadonlyArray<Maybe<AccountEdge>>>;
  readonly pageInfo?: Maybe<PageInfo>;
};

export type AccountEdge = Edge & {
  readonly __typename?: 'AccountEdge';
  readonly cursor?: Maybe<Scalars['String']>;
  readonly node?: Maybe<Account>;
};

export type Anonymous = Node & {
  readonly __typename?: 'Anonymous';
  readonly id: Scalars['ID'];
};

export type AnonymousConnection = Connection & {
  readonly __typename?: 'AnonymousConnection';
  readonly edges?: Maybe<ReadonlyArray<Maybe<AnonymousEdge>>>;
  readonly pageInfo?: Maybe<PageInfo>;
};

export type AnonymousEdge = Edge & {
  readonly __typename?: 'AnonymousEdge';
  readonly cursor?: Maybe<Scalars['String']>;
  readonly node?: Maybe<Anonymous>;
};

export type Connection = {
  readonly edges?: Maybe<ReadonlyArray<Maybe<Edge>>>;
  readonly pageInfo?: Maybe<PageInfo>;
};

export type CreateAccountInput = {
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
};

export type CreateAccountMutationResult =
  | CreateAccountSuccessResult
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type CreateAccountSuccessResult = {
  readonly __typename?: 'CreateAccountSuccessResult';
  readonly result: Account;
};

export type CreateProjectInput = {
  readonly accountId: Scalars['ID'];
  readonly description?: InputMaybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly initialVelocity: Scalars['Int'];
  readonly name: Scalars['String'];
  readonly privacy: ProjectPrivacy;
};

export type CreateProjectMutationResult =
  | CreateProjectSuccessResult
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type CreateProjectSuccessResult = {
  readonly __typename?: 'CreateProjectSuccessResult';
  readonly result: Project;
};

export type CreateStoryInput = {
  readonly description: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly kind: StoryKind;
  readonly points?: InputMaybe<Scalars['Int']>;
  readonly position: StoryPosition;
  readonly priority: Scalars['Int'];
  readonly projectId: Scalars['ID'];
  readonly releaseDate?: InputMaybe<Scalars['DateTime']>;
  readonly requesterId: Scalars['ID'];
  readonly state: StoryState;
  readonly title: Scalars['String'];
};

export type CreateStoryMutationResult =
  | CreateStorySuccessResult
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type CreateStorySuccessResult = {
  readonly __typename?: 'CreateStorySuccessResult';
  readonly result: Story;
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
  readonly id: Scalars['ID'];
};

export type DestroyStoryMutationResult =
  | DestroyStorySuccessResult
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type DestroyStorySuccessResult = {
  readonly __typename?: 'DestroyStorySuccessResult';
  readonly result: Story;
};

export type Edge = {
  readonly cursor?: Maybe<Scalars['String']>;
  readonly node?: Maybe<Node>;
};

export type EstimateStoryInput = {
  readonly id: Scalars['ID'];
  readonly points?: InputMaybe<Scalars['Int']>;
};

export type EstimateStoryMutationResult =
  | EstimateStorySuccessResult
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult;

export type EstimateStorySuccessResult = {
  readonly __typename?: 'EstimateStorySuccessResult';
  readonly result: Story;
};

export type InternalErrorResult = {
  readonly __typename?: 'InternalErrorResult';
  readonly errorMessage: Scalars['String'];
};

export type InvalidArgumentsResult = {
  readonly __typename?: 'InvalidArgumentsResult';
  readonly errorMessage: Scalars['String'];
  readonly issues: ReadonlyArray<ValidationIssue>;
};

export type InviteProjectMemberInput = {
  readonly id: Scalars['ID'];
  readonly projectId: Scalars['ID'];
  readonly role: ProjectMemberRole;
  readonly userEmail: Scalars['String'];
};

export type InviteProjectMemberMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | InviteProjectMemberSuccessResult
  | UnauthorizedResult;

export type InviteProjectMemberSuccessResult = {
  readonly __typename?: 'InviteProjectMemberSuccessResult';
  readonly result?: Maybe<ProjectMemberInvitation>;
};

export type JoinProjectMemberAlreadyJoinedResult = {
  readonly __typename?: 'JoinProjectMemberAlreadyJoinedResult';
  readonly result: Scalars['Boolean'];
};

export type JoinProjectMemberInput = {
  readonly confirmationToken: Scalars['String'];
  readonly memberId: Scalars['ID'];
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
  readonly __typename?: 'JoinProjectMemberSuccessResult';
  readonly result: Scalars['Boolean'];
};

export type JoinProjectMemberTokenIsAlreadyUsedResult = {
  readonly __typename?: 'JoinProjectMemberTokenIsAlreadyUsedResult';
  readonly result: Scalars['Boolean'];
};

export type JoinProjectMemberTokenIsExpiredResult = {
  readonly __typename?: 'JoinProjectMemberTokenIsExpiredResult';
  readonly expiredAt: Scalars['DateTime'];
};

export type MoveStoriesInput = {
  readonly projectId: Scalars['ID'];
  readonly stories: ReadonlyArray<MoveStoriesStoryDestination>;
};

export type MoveStoriesMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | MoveStoriesSuccessResult
  | UnauthorizedResult;

export type MoveStoriesStoryDestination = {
  readonly id: Scalars['ID'];
  readonly position: StoryPosition;
  readonly priority: Scalars['Int'];
};

export type MoveStoriesSuccessResult = {
  readonly __typename?: 'MoveStoriesSuccessResult';
  readonly result: ReadonlyArray<Story>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly createAccount: CreateAccountMutationResult;
  readonly createProject: CreateProjectMutationResult;
  readonly createStory: CreateStoryMutationResult;
  readonly destroyStory: DestroyStoryMutationResult;
  readonly estimateStory: EstimateStoryMutationResult;
  readonly inviteProjectMember: InviteProjectMemberMutationResult;
  readonly joinProjectMember: JoinProjectMemberMutationResult;
  readonly moveStories: MoveStoriesMutationResult;
  readonly updateAccount: UpdateAccountMutationResult;
  readonly updateStory: UpdateStoryMutationResult;
  readonly updateStoryState: UpdateStoryStateMutationResult;
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
  readonly id: Scalars['ID'];
};

export type PageInfo = {
  readonly __typename?: 'PageInfo';
  readonly endCursor?: Maybe<Scalars['String']>;
  readonly hasNextPage: Scalars['Boolean'];
  readonly hasPreviousPage?: Maybe<Scalars['Boolean']>;
  readonly startCursor?: Maybe<Scalars['String']>;
};

export type PagedConnection = {
  readonly nodes?: Maybe<ReadonlyArray<Maybe<Node>>>;
  readonly pageInfo?: Maybe<PagedPageInfo>;
};

export type PagedPageInfo = {
  readonly __typename?: 'PagedPageInfo';
  readonly hasNextPage: Scalars['Boolean'];
  readonly hasPreviousPage?: Maybe<Scalars['Boolean']>;
  readonly totalPagesCount?: Maybe<Scalars['Int']>;
};

export type Project = Node & {
  readonly __typename?: 'Project';
  readonly accountId: Scalars['ID'];
  readonly boardConfig: ProjectBoardConfig;
  readonly boardStatus: ProjectBoardStatus;
  readonly createdAt: Scalars['DateTime'];
  readonly description: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly invitations: ProjectMemberInvitationConnection;
  readonly isDeleted: Scalars['Boolean'];
  readonly members: ProjectMemberConnection;
  readonly name: Scalars['String'];
  readonly privacy: ProjectPrivacy;
  readonly stories: StoryConnection;
  readonly story?: Maybe<Story>;
  readonly updatedAt: Scalars['DateTime'];
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
  readonly __typename?: 'ProjectBoardConfig';
  readonly createdAt: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly initialVelocity: Scalars['Int'];
  readonly iterationLength: Scalars['Int'];
  readonly startIterationOn: DayOfWeek;
  readonly startIterationWeekNumber: Scalars['Int'];
  readonly startOn?: Maybe<Scalars['DateTime']>;
  readonly updatedAt: Scalars['DateTime'];
};

export type ProjectBoardStatus = Node & {
  readonly __typename?: 'ProjectBoardStatus';
  readonly createdAt: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly updatedAt: Scalars['DateTime'];
  readonly velocity: Scalars['Int'];
};

export type ProjectConnection = Connection & {
  readonly __typename?: 'ProjectConnection';
  readonly edges?: Maybe<ReadonlyArray<Maybe<ProjectEdge>>>;
  readonly pageInfo?: Maybe<PageInfo>;
};

export type ProjectEdge = Edge & {
  readonly __typename?: 'ProjectEdge';
  readonly cursor?: Maybe<Scalars['String']>;
  readonly node?: Maybe<Project>;
};

export type ProjectMember = Node & {
  readonly __typename?: 'ProjectMember';
  readonly avatarImageUrl: Scalars['String'];
  readonly createdAt: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly isMe: Scalars['Boolean'];
  readonly name: Scalars['String'];
  readonly role: ProjectMemberRole;
  readonly updatedAt: Scalars['DateTime'];
};

export type ProjectMemberConnection = Connection & {
  readonly __typename?: 'ProjectMemberConnection';
  readonly edges?: Maybe<ReadonlyArray<Maybe<ProjectMemberEdge>>>;
  readonly pageInfo?: Maybe<PageInfo>;
};

export type ProjectMemberEdge = Edge & {
  readonly __typename?: 'ProjectMemberEdge';
  readonly cursor?: Maybe<Scalars['String']>;
  readonly node?: Maybe<ProjectMember>;
};

export type ProjectMemberInvitation = Node & {
  readonly __typename?: 'ProjectMemberInvitation';
  readonly createdAt: Scalars['DateTime'];
  readonly email: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly isJoined: Scalars['Boolean'];
  readonly projectName: Scalars['String'];
  readonly role: ProjectMemberRole;
  readonly updatedAt: Scalars['DateTime'];
};

export type ProjectMemberInvitationConnection = Connection & {
  readonly __typename?: 'ProjectMemberInvitationConnection';
  readonly edges?: Maybe<ReadonlyArray<Maybe<ProjectMemberInvitationEdge>>>;
  readonly pageInfo?: Maybe<PageInfo>;
};

export type ProjectMemberInvitationEdge = Edge & {
  readonly __typename?: 'ProjectMemberInvitationEdge';
  readonly cursor?: Maybe<Scalars['String']>;
  readonly node?: Maybe<ProjectMemberInvitation>;
};

export type ProjectMemberInvitationToken = Node & {
  readonly __typename?: 'ProjectMemberInvitationToken';
  readonly confirmationToken: Scalars['String'];
  readonly createdAt: Scalars['DateTime'];
  readonly expiredAt: Scalars['DateTime'];
  readonly id: Scalars['ID'];
  readonly invitation: ProjectMemberInvitation;
  readonly isExpired: Scalars['Boolean'];
  readonly updatedAt: Scalars['DateTime'];
};

export type ProjectMemberInvitationTokenConnection = Connection & {
  readonly __typename?: 'ProjectMemberInvitationTokenConnection';
  readonly edges?: Maybe<
    ReadonlyArray<Maybe<ProjectMemberInvitationTokenEdge>>
  >;
  readonly pageInfo?: Maybe<PageInfo>;
};

export type ProjectMemberInvitationTokenEdge = Edge & {
  readonly __typename?: 'ProjectMemberInvitationTokenEdge';
  readonly cursor?: Maybe<Scalars['String']>;
  readonly node?: Maybe<ProjectMemberInvitationToken>;
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
  readonly __typename?: 'Query';
  readonly anonymous?: Maybe<Anonymous>;
  readonly node?: Maybe<Node>;
  readonly viewer?: Maybe<Viewer>;
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type Story = Node & {
  readonly __typename?: 'Story';
  readonly canEstimate: Scalars['Boolean'];
  readonly completedAt?: Maybe<Scalars['DateTime']>;
  readonly createdAt: Scalars['DateTime'];
  readonly description: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly isCompleted: Scalars['Boolean'];
  readonly isDeleted: Scalars['Boolean'];
  readonly isUnEstimated: Scalars['Boolean'];
  readonly kind: StoryKind;
  readonly owners: ReadonlyArray<User>;
  readonly points?: Maybe<Scalars['Int']>;
  readonly position: StoryPosition;
  readonly priority: Scalars['Int'];
  readonly project?: Maybe<Project>;
  readonly projectId: Scalars['ID'];
  readonly releaseDate?: Maybe<Scalars['DateTime']>;
  readonly requester?: Maybe<User>;
  readonly requesterId: Scalars['ID'];
  readonly state: StoryState;
  readonly title: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
};

export type StoryConnection = Connection & {
  readonly __typename?: 'StoryConnection';
  readonly edges?: Maybe<ReadonlyArray<Maybe<StoryEdge>>>;
  readonly pageInfo?: Maybe<PageInfo>;
};

export type StoryEdge = Edge & {
  readonly __typename?: 'StoryEdge';
  readonly cursor?: Maybe<Scalars['String']>;
  readonly node?: Maybe<Story>;
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
  readonly __typename?: 'Subscription';
  readonly subscribeStoryUpdate?: Maybe<Story>;
};

export type SubscriptionSubscribeStoryUpdateArgs = {
  projectId: Scalars['ID'];
};

export type UnauthorizedResult = {
  readonly __typename?: 'UnauthorizedResult';
  readonly errorMessage: Scalars['String'];
};

export type UpdateAccountInput = {
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
};

export type UpdateAccountMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult
  | UpdateAccountSuccessResult;

export type UpdateAccountSuccessResult = {
  readonly __typename?: 'UpdateAccountSuccessResult';
  readonly result: Account;
};

export type UpdateStoryInput = {
  readonly description: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly kind: StoryKind;
  readonly points?: InputMaybe<Scalars['Int']>;
  readonly releaseDate?: InputMaybe<Scalars['DateTime']>;
  readonly requesterId?: InputMaybe<Scalars['NullableID']>;
  readonly state: StoryState;
  readonly title: Scalars['String'];
};

export type UpdateStoryMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult
  | UpdateStorySuccessResult;

export type UpdateStoryStateInput = {
  readonly id: Scalars['ID'];
  readonly state: StoryState;
};

export type UpdateStoryStateMutationResult =
  | InternalErrorResult
  | InvalidArgumentsResult
  | UnauthorizedResult
  | UpdateStoryStateSuccessResult;

export type UpdateStoryStateSuccessResult = {
  readonly __typename?: 'UpdateStoryStateSuccessResult';
  readonly effectedStories: ReadonlyArray<Story>;
  readonly result: Story;
};

export type UpdateStorySuccessResult = {
  readonly __typename?: 'UpdateStorySuccessResult';
  readonly effectedStories: ReadonlyArray<Story>;
  readonly result: Story;
};

export type User = Node & {
  readonly __typename?: 'User';
  readonly id: Scalars['ID'];
  readonly name: Scalars['String'];
};

export type UserConnection = Connection & {
  readonly __typename?: 'UserConnection';
  readonly edges?: Maybe<ReadonlyArray<Maybe<UserEdge>>>;
  readonly pageInfo?: Maybe<PageInfo>;
};

export type UserEdge = Edge & {
  readonly __typename?: 'UserEdge';
  readonly cursor?: Maybe<Scalars['String']>;
  readonly node?: Maybe<User>;
};

export type ValidationIssue = {
  readonly __typename?: 'ValidationIssue';
  readonly field?: Maybe<Scalars['String']>;
  readonly message?: Maybe<Scalars['String']>;
};

export type Viewer = {
  readonly __typename?: 'Viewer';
  readonly accounts: AccountConnection;
  readonly avatarImageUrl: Scalars['String'];
  readonly createdAt: Scalars['DateTime'];
  readonly email: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly invitationToken?: Maybe<ProjectMemberInvitationToken>;
  readonly project?: Maybe<Project>;
  readonly updatedAt: Scalars['DateTime'];
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
      edges?: Maybe<ReadonlyArray<Maybe<ResolversTypes['AccountEdge']>>>;
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
    | ResolversTypes['InternalErrorResult']
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
    | ResolversTypes['InternalErrorResult']
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
    | ResolversTypes['InternalErrorResult']
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
    | ResolversTypes['InternalErrorResult']
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
    | ResolversTypes['InternalErrorResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult'];
  EstimateStorySuccessResult: ResolverTypeWrapper<
    Omit<EstimateStorySuccessResult, 'result'> & {
      result: ResolversTypes['Story'];
    }
  >;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InternalErrorResult: ResolverTypeWrapper<InternalErrorResult>;
  InvalidArgumentsResult: ResolverTypeWrapper<InvalidArgumentsResult>;
  InviteProjectMemberInput: InviteProjectMemberInput;
  InviteProjectMemberMutationResult:
    | ResolversTypes['InternalErrorResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['InviteProjectMemberSuccessResult']
    | ResolversTypes['UnauthorizedResult'];
  InviteProjectMemberSuccessResult: ResolverTypeWrapper<
    Omit<InviteProjectMemberSuccessResult, 'result'> & {
      result?: Maybe<ResolversTypes['ProjectMemberInvitation']>;
    }
  >;
  JoinProjectMemberAlreadyJoinedResult: ResolverTypeWrapper<JoinProjectMemberAlreadyJoinedResult>;
  JoinProjectMemberInput: JoinProjectMemberInput;
  JoinProjectMemberMutationResult:
    | ResolversTypes['InternalErrorResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['JoinProjectMemberAlreadyJoinedResult']
    | ResolversTypes['JoinProjectMemberSuccessResult']
    | ResolversTypes['JoinProjectMemberTokenIsAlreadyUsedResult']
    | ResolversTypes['JoinProjectMemberTokenIsExpiredResult']
    | ResolversTypes['UnauthorizedResult'];
  JoinProjectMemberSuccessResult: ResolverTypeWrapper<JoinProjectMemberSuccessResult>;
  JoinProjectMemberTokenIsAlreadyUsedResult: ResolverTypeWrapper<JoinProjectMemberTokenIsAlreadyUsedResult>;
  JoinProjectMemberTokenIsExpiredResult: ResolverTypeWrapper<JoinProjectMemberTokenIsExpiredResult>;
  MoveStoriesInput: MoveStoriesInput;
  MoveStoriesMutationResult:
    | ResolversTypes['InternalErrorResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['MoveStoriesSuccessResult']
    | ResolversTypes['UnauthorizedResult'];
  MoveStoriesStoryDestination: MoveStoriesStoryDestination;
  MoveStoriesSuccessResult: ResolverTypeWrapper<
    Omit<MoveStoriesSuccessResult, 'result'> & {
      result: ReadonlyArray<ResolversTypes['Story']>;
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
  NullableID: ResolverTypeWrapper<Scalars['NullableID']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PagedConnection: never;
  PagedPageInfo: ResolverTypeWrapper<PagedPageInfo>;
  Project: ResolverTypeWrapper<ProjectEntity>;
  ProjectBoardConfig: ResolverTypeWrapper<ProjectBoardConfigEntity>;
  ProjectBoardStatus: ResolverTypeWrapper<ProjectBoardStatusEntity>;
  ProjectConnection: ResolverTypeWrapper<
    Omit<ProjectConnection, 'edges'> & {
      edges?: Maybe<ReadonlyArray<Maybe<ResolversTypes['ProjectEdge']>>>;
    }
  >;
  ProjectEdge: ResolverTypeWrapper<
    Omit<ProjectEdge, 'node'> & { node?: Maybe<ResolversTypes['Project']> }
  >;
  ProjectMember: ResolverTypeWrapper<ProjectMemberEntity>;
  ProjectMemberConnection: ResolverTypeWrapper<
    Omit<ProjectMemberConnection, 'edges'> & {
      edges?: Maybe<ReadonlyArray<Maybe<ResolversTypes['ProjectMemberEdge']>>>;
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
        ReadonlyArray<Maybe<ResolversTypes['ProjectMemberInvitationEdge']>>
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
        ReadonlyArray<Maybe<ResolversTypes['ProjectMemberInvitationTokenEdge']>>
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
      edges?: Maybe<ReadonlyArray<Maybe<ResolversTypes['StoryEdge']>>>;
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
    | ResolversTypes['InternalErrorResult']
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
    | ResolversTypes['InternalErrorResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult']
    | ResolversTypes['UpdateStorySuccessResult'];
  UpdateStoryStateInput: UpdateStoryStateInput;
  UpdateStoryStateMutationResult:
    | ResolversTypes['InternalErrorResult']
    | ResolversTypes['InvalidArgumentsResult']
    | ResolversTypes['UnauthorizedResult']
    | ResolversTypes['UpdateStoryStateSuccessResult'];
  UpdateStoryStateSuccessResult: ResolverTypeWrapper<
    Omit<UpdateStoryStateSuccessResult, 'effectedStories' | 'result'> & {
      effectedStories: ReadonlyArray<ResolversTypes['Story']>;
      result: ResolversTypes['Story'];
    }
  >;
  UpdateStorySuccessResult: ResolverTypeWrapper<
    Omit<UpdateStorySuccessResult, 'effectedStories' | 'result'> & {
      effectedStories: ReadonlyArray<ResolversTypes['Story']>;
      result: ResolversTypes['Story'];
    }
  >;
  User: ResolverTypeWrapper<UserEntity>;
  UserConnection: ResolverTypeWrapper<
    Omit<UserConnection, 'edges'> & {
      edges?: Maybe<ReadonlyArray<Maybe<ResolversTypes['UserEdge']>>>;
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
    edges?: Maybe<ReadonlyArray<Maybe<ResolversParentTypes['AccountEdge']>>>;
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
    | ResolversParentTypes['InternalErrorResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult'];
  CreateAccountSuccessResult: Omit<CreateAccountSuccessResult, 'result'> & {
    result: ResolversParentTypes['Account'];
  };
  CreateProjectInput: CreateProjectInput;
  CreateProjectMutationResult:
    | ResolversParentTypes['CreateProjectSuccessResult']
    | ResolversParentTypes['InternalErrorResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult'];
  CreateProjectSuccessResult: Omit<CreateProjectSuccessResult, 'result'> & {
    result: ResolversParentTypes['Project'];
  };
  CreateStoryInput: CreateStoryInput;
  CreateStoryMutationResult:
    | ResolversParentTypes['CreateStorySuccessResult']
    | ResolversParentTypes['InternalErrorResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult'];
  CreateStorySuccessResult: Omit<CreateStorySuccessResult, 'result'> & {
    result: ResolversParentTypes['Story'];
  };
  DateTime: Scalars['DateTime'];
  DestroyStoryInput: DestroyStoryInput;
  DestroyStoryMutationResult:
    | ResolversParentTypes['DestroyStorySuccessResult']
    | ResolversParentTypes['InternalErrorResult']
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
    | ResolversParentTypes['InternalErrorResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult'];
  EstimateStorySuccessResult: Omit<EstimateStorySuccessResult, 'result'> & {
    result: ResolversParentTypes['Story'];
  };
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InternalErrorResult: InternalErrorResult;
  InvalidArgumentsResult: InvalidArgumentsResult;
  InviteProjectMemberInput: InviteProjectMemberInput;
  InviteProjectMemberMutationResult:
    | ResolversParentTypes['InternalErrorResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['InviteProjectMemberSuccessResult']
    | ResolversParentTypes['UnauthorizedResult'];
  InviteProjectMemberSuccessResult: Omit<
    InviteProjectMemberSuccessResult,
    'result'
  > & { result?: Maybe<ResolversParentTypes['ProjectMemberInvitation']> };
  JoinProjectMemberAlreadyJoinedResult: JoinProjectMemberAlreadyJoinedResult;
  JoinProjectMemberInput: JoinProjectMemberInput;
  JoinProjectMemberMutationResult:
    | ResolversParentTypes['InternalErrorResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['JoinProjectMemberAlreadyJoinedResult']
    | ResolversParentTypes['JoinProjectMemberSuccessResult']
    | ResolversParentTypes['JoinProjectMemberTokenIsAlreadyUsedResult']
    | ResolversParentTypes['JoinProjectMemberTokenIsExpiredResult']
    | ResolversParentTypes['UnauthorizedResult'];
  JoinProjectMemberSuccessResult: JoinProjectMemberSuccessResult;
  JoinProjectMemberTokenIsAlreadyUsedResult: JoinProjectMemberTokenIsAlreadyUsedResult;
  JoinProjectMemberTokenIsExpiredResult: JoinProjectMemberTokenIsExpiredResult;
  MoveStoriesInput: MoveStoriesInput;
  MoveStoriesMutationResult:
    | ResolversParentTypes['InternalErrorResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['MoveStoriesSuccessResult']
    | ResolversParentTypes['UnauthorizedResult'];
  MoveStoriesStoryDestination: MoveStoriesStoryDestination;
  MoveStoriesSuccessResult: Omit<MoveStoriesSuccessResult, 'result'> & {
    result: ReadonlyArray<ResolversParentTypes['Story']>;
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
  NullableID: Scalars['NullableID'];
  PageInfo: PageInfo;
  PagedConnection: never;
  PagedPageInfo: PagedPageInfo;
  Project: ProjectEntity;
  ProjectBoardConfig: ProjectBoardConfigEntity;
  ProjectBoardStatus: ProjectBoardStatusEntity;
  ProjectConnection: Omit<ProjectConnection, 'edges'> & {
    edges?: Maybe<ReadonlyArray<Maybe<ResolversParentTypes['ProjectEdge']>>>;
  };
  ProjectEdge: Omit<ProjectEdge, 'node'> & {
    node?: Maybe<ResolversParentTypes['Project']>;
  };
  ProjectMember: ProjectMemberEntity;
  ProjectMemberConnection: Omit<ProjectMemberConnection, 'edges'> & {
    edges?: Maybe<
      ReadonlyArray<Maybe<ResolversParentTypes['ProjectMemberEdge']>>
    >;
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
      ReadonlyArray<Maybe<ResolversParentTypes['ProjectMemberInvitationEdge']>>
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
      ReadonlyArray<
        Maybe<ResolversParentTypes['ProjectMemberInvitationTokenEdge']>
      >
    >;
  };
  ProjectMemberInvitationTokenEdge: Omit<
    ProjectMemberInvitationTokenEdge,
    'node'
  > & { node?: Maybe<ResolversParentTypes['ProjectMemberInvitationToken']> };
  Query: {};
  Story: StoryEntity;
  StoryConnection: Omit<StoryConnection, 'edges'> & {
    edges?: Maybe<ReadonlyArray<Maybe<ResolversParentTypes['StoryEdge']>>>;
  };
  StoryEdge: Omit<StoryEdge, 'node'> & {
    node?: Maybe<ResolversParentTypes['Story']>;
  };
  String: Scalars['String'];
  Subscription: {};
  UnauthorizedResult: UnauthorizedResult;
  UpdateAccountInput: UpdateAccountInput;
  UpdateAccountMutationResult:
    | ResolversParentTypes['InternalErrorResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult']
    | ResolversParentTypes['UpdateAccountSuccessResult'];
  UpdateAccountSuccessResult: Omit<UpdateAccountSuccessResult, 'result'> & {
    result: ResolversParentTypes['Account'];
  };
  UpdateStoryInput: UpdateStoryInput;
  UpdateStoryMutationResult:
    | ResolversParentTypes['InternalErrorResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult']
    | ResolversParentTypes['UpdateStorySuccessResult'];
  UpdateStoryStateInput: UpdateStoryStateInput;
  UpdateStoryStateMutationResult:
    | ResolversParentTypes['InternalErrorResult']
    | ResolversParentTypes['InvalidArgumentsResult']
    | ResolversParentTypes['UnauthorizedResult']
    | ResolversParentTypes['UpdateStoryStateSuccessResult'];
  UpdateStoryStateSuccessResult: Omit<
    UpdateStoryStateSuccessResult,
    'effectedStories' | 'result'
  > & {
    effectedStories: ReadonlyArray<ResolversParentTypes['Story']>;
    result: ResolversParentTypes['Story'];
  };
  UpdateStorySuccessResult: Omit<
    UpdateStorySuccessResult,
    'effectedStories' | 'result'
  > & {
    effectedStories: ReadonlyArray<ResolversParentTypes['Story']>;
    result: ResolversParentTypes['Story'];
  };
  User: UserEntity;
  UserConnection: Omit<UserConnection, 'edges'> & {
    edges?: Maybe<ReadonlyArray<Maybe<ResolversParentTypes['UserEdge']>>>;
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
    Maybe<ReadonlyArray<Maybe<ResolversTypes['AccountEdge']>>>,
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
    Maybe<ReadonlyArray<Maybe<ResolversTypes['AnonymousEdge']>>>,
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
    Maybe<ReadonlyArray<Maybe<ResolversTypes['Edge']>>>,
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
    | 'InternalErrorResult'
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
    | 'InternalErrorResult'
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
    | 'InternalErrorResult'
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
    | 'InternalErrorResult'
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
    | 'InternalErrorResult'
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

export type InternalErrorResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['InternalErrorResult'] = ResolversParentTypes['InternalErrorResult']
> = {
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InvalidArgumentsResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['InvalidArgumentsResult'] = ResolversParentTypes['InvalidArgumentsResult']
> = {
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issues?: Resolver<
    ReadonlyArray<ResolversTypes['ValidationIssue']>,
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
    | 'InternalErrorResult'
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
  result?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JoinProjectMemberMutationResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['JoinProjectMemberMutationResult'] = ResolversParentTypes['JoinProjectMemberMutationResult']
> = {
  __resolveType: TypeResolveFn<
    | 'InternalErrorResult'
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
  result?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JoinProjectMemberTokenIsAlreadyUsedResultResolvers<
  ContextType = GraphqlServerContext,
  ParentType extends ResolversParentTypes['JoinProjectMemberTokenIsAlreadyUsedResult'] = ResolversParentTypes['JoinProjectMemberTokenIsAlreadyUsedResult']
> = {
  result?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
    | 'InternalErrorResult'
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
  result?: Resolver<
    ReadonlyArray<ResolversTypes['Story']>,
    ParentType,
    ContextType
  >;
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

export interface NullableIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['NullableID'], any> {
  name: 'NullableID';
}

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
    Maybe<ReadonlyArray<Maybe<ResolversTypes['Node']>>>,
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
    Maybe<ReadonlyArray<Maybe<ResolversTypes['ProjectEdge']>>>,
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
    Maybe<ReadonlyArray<Maybe<ResolversTypes['ProjectMemberEdge']>>>,
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
    Maybe<ReadonlyArray<Maybe<ResolversTypes['ProjectMemberInvitationEdge']>>>,
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
    Maybe<
      ReadonlyArray<Maybe<ResolversTypes['ProjectMemberInvitationTokenEdge']>>
    >,
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
  canEstimate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
  owners?: Resolver<
    ReadonlyArray<ResolversTypes['User']>,
    ParentType,
    ContextType
  >;
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
    Maybe<ReadonlyArray<Maybe<ResolversTypes['StoryEdge']>>>,
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
    | 'InternalErrorResult'
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
    | 'InternalErrorResult'
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
    | 'InternalErrorResult'
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
    ReadonlyArray<ResolversTypes['Story']>,
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
    ReadonlyArray<ResolversTypes['Story']>,
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
    Maybe<ReadonlyArray<Maybe<ResolversTypes['UserEdge']>>>,
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
  InternalErrorResult?: InternalErrorResultResolvers<ContextType>;
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
  NullableID?: GraphQLScalarType;
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
