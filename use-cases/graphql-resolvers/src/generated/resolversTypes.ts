import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { StoryEntity, UserEntity, AccountEntity, ProjectEntity } from 'core-domain';
import { GraphqlServerContext } from '../context';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: CreateAccountMutationResult;
  createProject: CreateProjectMutationResult;
  createStory: CreateStoryMutationResult;
  destroyStory: DestroyStoryMutationResult;
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
  name: Scalars['String'];
  privacy: ProjectPrivacy;
  updatedAt: Scalars['DateTime'];
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
  state: StoryState;
  title: Scalars['String'];
};

export type UpdateStoryMutationResult = InvalidArgumentsResult | UnauthorizedResult | UpdateStorySuccessResult;

export type UpdateStorySuccessResult = {
  __typename?: 'UpdateStorySuccessResult';
  result: Story;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
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



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Account: ResolverTypeWrapper<AccountEntity>;
  AccountConnection: ResolverTypeWrapper<Omit<AccountConnection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversTypes['AccountEdge']>>> }>;
  AccountEdge: ResolverTypeWrapper<Omit<AccountEdge, 'node'> & { node?: Maybe<ResolversTypes['Account']> }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Connection: ResolversTypes['AccountConnection'] | ResolversTypes['ProjectConnection'] | ResolversTypes['StoryConnection'];
  CreateAccountInput: CreateAccountInput;
  CreateAccountMutationResult: ResolversTypes['CreateAccountSuccessResult'] | ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'];
  CreateAccountSuccessResult: ResolverTypeWrapper<Omit<CreateAccountSuccessResult, 'result'> & { result: ResolversTypes['Account'] }>;
  CreateProjectInput: CreateProjectInput;
  CreateProjectMutationResult: ResolversTypes['CreateProjectSuccessResult'] | ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'];
  CreateProjectSuccessResult: ResolverTypeWrapper<Omit<CreateProjectSuccessResult, 'result'> & { result: ResolversTypes['Project'] }>;
  CreateStoryInput: CreateStoryInput;
  CreateStoryMutationResult: ResolversTypes['CreateStorySuccessResult'] | ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'];
  CreateStorySuccessResult: ResolverTypeWrapper<Omit<CreateStorySuccessResult, 'result'> & { result: ResolversTypes['Story'] }>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  DestroyStoryInput: DestroyStoryInput;
  DestroyStoryMutationResult: ResolversTypes['DestroyStorySuccessResult'] | ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'];
  DestroyStorySuccessResult: ResolverTypeWrapper<Omit<DestroyStorySuccessResult, 'result'> & { result: ResolversTypes['Story'] }>;
  Edge: ResolversTypes['AccountEdge'] | ResolversTypes['ProjectEdge'] | ResolversTypes['StoryEdge'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InvalidArgumentsResult: ResolverTypeWrapper<InvalidArgumentsResult>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Account'] | ResolversTypes['Project'] | ResolversTypes['Story'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PagedConnection: never;
  PagedPageInfo: ResolverTypeWrapper<PagedPageInfo>;
  Project: ResolverTypeWrapper<ProjectEntity>;
  ProjectConnection: ResolverTypeWrapper<Omit<ProjectConnection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversTypes['ProjectEdge']>>> }>;
  ProjectEdge: ResolverTypeWrapper<Omit<ProjectEdge, 'node'> & { node?: Maybe<ResolversTypes['Project']> }>;
  ProjectPrivacy: ProjectPrivacy;
  Query: ResolverTypeWrapper<{}>;
  Story: ResolverTypeWrapper<StoryEntity>;
  StoryConnection: ResolverTypeWrapper<Omit<StoryConnection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversTypes['StoryEdge']>>> }>;
  StoryEdge: ResolverTypeWrapper<Omit<StoryEdge, 'node'> & { node?: Maybe<ResolversTypes['Story']> }>;
  StoryKind: StoryKind;
  StoryPosition: StoryPosition;
  StoryState: StoryState;
  String: ResolverTypeWrapper<Scalars['String']>;
  UnauthorizedResult: ResolverTypeWrapper<UnauthorizedResult>;
  UpdateAccountInput: UpdateAccountInput;
  UpdateAccountMutationResult: ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'] | ResolversTypes['UpdateAccountSuccessResult'];
  UpdateAccountSuccessResult: ResolverTypeWrapper<Omit<UpdateAccountSuccessResult, 'result'> & { result: ResolversTypes['Account'] }>;
  UpdateStoryInput: UpdateStoryInput;
  UpdateStoryMutationResult: ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'] | ResolversTypes['UpdateStorySuccessResult'];
  UpdateStorySuccessResult: ResolverTypeWrapper<Omit<UpdateStorySuccessResult, 'result'> & { result: ResolversTypes['Story'] }>;
  User: ResolverTypeWrapper<UserEntity>;
  ValidationIssue: ResolverTypeWrapper<ValidationIssue>;
  Viewer: ResolverTypeWrapper<UserEntity>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: AccountEntity;
  AccountConnection: Omit<AccountConnection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversParentTypes['AccountEdge']>>> };
  AccountEdge: Omit<AccountEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Account']> };
  Boolean: Scalars['Boolean'];
  Connection: ResolversParentTypes['AccountConnection'] | ResolversParentTypes['ProjectConnection'] | ResolversParentTypes['StoryConnection'];
  CreateAccountInput: CreateAccountInput;
  CreateAccountMutationResult: ResolversParentTypes['CreateAccountSuccessResult'] | ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'];
  CreateAccountSuccessResult: Omit<CreateAccountSuccessResult, 'result'> & { result: ResolversParentTypes['Account'] };
  CreateProjectInput: CreateProjectInput;
  CreateProjectMutationResult: ResolversParentTypes['CreateProjectSuccessResult'] | ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'];
  CreateProjectSuccessResult: Omit<CreateProjectSuccessResult, 'result'> & { result: ResolversParentTypes['Project'] };
  CreateStoryInput: CreateStoryInput;
  CreateStoryMutationResult: ResolversParentTypes['CreateStorySuccessResult'] | ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'];
  CreateStorySuccessResult: Omit<CreateStorySuccessResult, 'result'> & { result: ResolversParentTypes['Story'] };
  DateTime: Scalars['DateTime'];
  DestroyStoryInput: DestroyStoryInput;
  DestroyStoryMutationResult: ResolversParentTypes['DestroyStorySuccessResult'] | ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'];
  DestroyStorySuccessResult: Omit<DestroyStorySuccessResult, 'result'> & { result: ResolversParentTypes['Story'] };
  Edge: ResolversParentTypes['AccountEdge'] | ResolversParentTypes['ProjectEdge'] | ResolversParentTypes['StoryEdge'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InvalidArgumentsResult: InvalidArgumentsResult;
  Mutation: {};
  Node: ResolversParentTypes['Account'] | ResolversParentTypes['Project'] | ResolversParentTypes['Story'];
  PageInfo: PageInfo;
  PagedConnection: never;
  PagedPageInfo: PagedPageInfo;
  Project: ProjectEntity;
  ProjectConnection: Omit<ProjectConnection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversParentTypes['ProjectEdge']>>> };
  ProjectEdge: Omit<ProjectEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Project']> };
  Query: {};
  Story: StoryEntity;
  StoryConnection: Omit<StoryConnection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversParentTypes['StoryEdge']>>> };
  StoryEdge: Omit<StoryEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Story']> };
  String: Scalars['String'];
  UnauthorizedResult: UnauthorizedResult;
  UpdateAccountInput: UpdateAccountInput;
  UpdateAccountMutationResult: ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'] | ResolversParentTypes['UpdateAccountSuccessResult'];
  UpdateAccountSuccessResult: Omit<UpdateAccountSuccessResult, 'result'> & { result: ResolversParentTypes['Account'] };
  UpdateStoryInput: UpdateStoryInput;
  UpdateStoryMutationResult: ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'] | ResolversParentTypes['UpdateStorySuccessResult'];
  UpdateStorySuccessResult: Omit<UpdateStorySuccessResult, 'result'> & { result: ResolversParentTypes['Story'] };
  User: UserEntity;
  ValidationIssue: ValidationIssue;
  Viewer: UserEntity;
};

export type AccountResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects?: Resolver<ResolversTypes['ProjectConnection'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountConnectionResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['AccountConnection'] = ResolversParentTypes['AccountConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['AccountEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountEdgeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['AccountEdge'] = ResolversParentTypes['AccountEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Account']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = {
  __resolveType: TypeResolveFn<'AccountConnection' | 'ProjectConnection' | 'StoryConnection', ParentType, ContextType>;
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Edge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
};

export type CreateAccountMutationResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['CreateAccountMutationResult'] = ResolversParentTypes['CreateAccountMutationResult']> = {
  __resolveType: TypeResolveFn<'CreateAccountSuccessResult' | 'InvalidArgumentsResult' | 'UnauthorizedResult', ParentType, ContextType>;
};

export type CreateAccountSuccessResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['CreateAccountSuccessResult'] = ResolversParentTypes['CreateAccountSuccessResult']> = {
  result?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateProjectMutationResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['CreateProjectMutationResult'] = ResolversParentTypes['CreateProjectMutationResult']> = {
  __resolveType: TypeResolveFn<'CreateProjectSuccessResult' | 'InvalidArgumentsResult' | 'UnauthorizedResult', ParentType, ContextType>;
};

export type CreateProjectSuccessResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['CreateProjectSuccessResult'] = ResolversParentTypes['CreateProjectSuccessResult']> = {
  result?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateStoryMutationResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['CreateStoryMutationResult'] = ResolversParentTypes['CreateStoryMutationResult']> = {
  __resolveType: TypeResolveFn<'CreateStorySuccessResult' | 'InvalidArgumentsResult' | 'UnauthorizedResult', ParentType, ContextType>;
};

export type CreateStorySuccessResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['CreateStorySuccessResult'] = ResolversParentTypes['CreateStorySuccessResult']> = {
  result?: Resolver<ResolversTypes['Story'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DestroyStoryMutationResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['DestroyStoryMutationResult'] = ResolversParentTypes['DestroyStoryMutationResult']> = {
  __resolveType: TypeResolveFn<'DestroyStorySuccessResult' | 'InvalidArgumentsResult' | 'UnauthorizedResult', ParentType, ContextType>;
};

export type DestroyStorySuccessResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['DestroyStorySuccessResult'] = ResolversParentTypes['DestroyStorySuccessResult']> = {
  result?: Resolver<ResolversTypes['Story'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EdgeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = {
  __resolveType: TypeResolveFn<'AccountEdge' | 'ProjectEdge' | 'StoryEdge', ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType>;
};

export type InvalidArgumentsResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['InvalidArgumentsResult'] = ResolversParentTypes['InvalidArgumentsResult']> = {
  issues?: Resolver<Array<ResolversTypes['ValidationIssue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<ResolversTypes['CreateAccountMutationResult'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'input'>>;
  createProject?: Resolver<ResolversTypes['CreateProjectMutationResult'], ParentType, ContextType, RequireFields<MutationCreateProjectArgs, 'input'>>;
  createStory?: Resolver<ResolversTypes['CreateStoryMutationResult'], ParentType, ContextType, RequireFields<MutationCreateStoryArgs, 'input'>>;
  destroyStory?: Resolver<ResolversTypes['DestroyStoryMutationResult'], ParentType, ContextType, RequireFields<MutationDestroyStoryArgs, 'input'>>;
  updateAccount?: Resolver<ResolversTypes['UpdateAccountMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'input'>>;
  updateStory?: Resolver<ResolversTypes['UpdateStoryMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateStoryArgs, 'input'>>;
};

export type NodeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Account' | 'Project' | 'Story', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PagedConnectionResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['PagedConnection'] = ResolversParentTypes['PagedConnection']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Node']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PagedPageInfo']>, ParentType, ContextType>;
};

export type PagedPageInfoResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['PagedPageInfo'] = ResolversParentTypes['PagedPageInfo']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalPagesCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  accountId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currentVelocity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  privacy?: Resolver<ResolversTypes['ProjectPrivacy'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectConnectionResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['ProjectConnection'] = ResolversParentTypes['ProjectConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['ProjectEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectEdgeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['ProjectEdge'] = ResolversParentTypes['ProjectEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  viewer?: Resolver<Maybe<ResolversTypes['Viewer']>, ParentType, ContextType>;
};

export type StoryResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Story'] = ResolversParentTypes['Story']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kind?: Resolver<ResolversTypes['StoryKind'], ParentType, ContextType>;
  owners?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  points?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  position?: Resolver<ResolversTypes['StoryPosition'], ParentType, ContextType>;
  priority?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  projectId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  releaseDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  requester?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  requesterId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  state?: Resolver<ResolversTypes['StoryState'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryConnectionResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['StoryConnection'] = ResolversParentTypes['StoryConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['StoryEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StoryEdgeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['StoryEdge'] = ResolversParentTypes['StoryEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Story']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnauthorizedResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['UnauthorizedResult'] = ResolversParentTypes['UnauthorizedResult']> = {
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateAccountMutationResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['UpdateAccountMutationResult'] = ResolversParentTypes['UpdateAccountMutationResult']> = {
  __resolveType: TypeResolveFn<'InvalidArgumentsResult' | 'UnauthorizedResult' | 'UpdateAccountSuccessResult', ParentType, ContextType>;
};

export type UpdateAccountSuccessResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['UpdateAccountSuccessResult'] = ResolversParentTypes['UpdateAccountSuccessResult']> = {
  result?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateStoryMutationResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['UpdateStoryMutationResult'] = ResolversParentTypes['UpdateStoryMutationResult']> = {
  __resolveType: TypeResolveFn<'InvalidArgumentsResult' | 'UnauthorizedResult' | 'UpdateStorySuccessResult', ParentType, ContextType>;
};

export type UpdateStorySuccessResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['UpdateStorySuccessResult'] = ResolversParentTypes['UpdateStorySuccessResult']> = {
  result?: Resolver<ResolversTypes['Story'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationIssueResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['ValidationIssue'] = ResolversParentTypes['ValidationIssue']> = {
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ViewerResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Viewer'] = ResolversParentTypes['Viewer']> = {
  accounts?: Resolver<ResolversTypes['AccountConnection'], ParentType, ContextType, Partial<ViewerAccountsArgs>>;
  avatarImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<ViewerProjectArgs, 'id'>>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphqlServerContext> = {
  Account?: AccountResolvers<ContextType>;
  AccountConnection?: AccountConnectionResolvers<ContextType>;
  AccountEdge?: AccountEdgeResolvers<ContextType>;
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
  InvalidArgumentsResult?: InvalidArgumentsResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PagedConnection?: PagedConnectionResolvers<ContextType>;
  PagedPageInfo?: PagedPageInfoResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  ProjectConnection?: ProjectConnectionResolvers<ContextType>;
  ProjectEdge?: ProjectEdgeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Story?: StoryResolvers<ContextType>;
  StoryConnection?: StoryConnectionResolvers<ContextType>;
  StoryEdge?: StoryEdgeResolvers<ContextType>;
  UnauthorizedResult?: UnauthorizedResultResolvers<ContextType>;
  UpdateAccountMutationResult?: UpdateAccountMutationResultResolvers<ContextType>;
  UpdateAccountSuccessResult?: UpdateAccountSuccessResultResolvers<ContextType>;
  UpdateStoryMutationResult?: UpdateStoryMutationResultResolvers<ContextType>;
  UpdateStorySuccessResult?: UpdateStorySuccessResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidationIssue?: ValidationIssueResolvers<ContextType>;
  Viewer?: ViewerResolvers<ContextType>;
};

