import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserEntity, TodoEntity } from 'core-domain';
import { GraphqlServerContext } from '../context';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  updateAccount: UpdateAccountMutationResult;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
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

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  viewer?: Maybe<Viewer>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};

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
  updatedAt: Scalars['DateTime'];
};


export type ViewerAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
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
  Account: ResolverTypeWrapper<Account>;
  AccountConnection: ResolverTypeWrapper<AccountConnection>;
  AccountEdge: ResolverTypeWrapper<AccountEdge>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Connection: ResolversTypes['AccountConnection'];
  CreateAccountInput: CreateAccountInput;
  CreateAccountMutationResult: ResolversTypes['CreateAccountSuccessResult'] | ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'];
  CreateAccountSuccessResult: ResolverTypeWrapper<CreateAccountSuccessResult>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Edge: ResolversTypes['AccountEdge'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InvalidArgumentsResult: ResolverTypeWrapper<InvalidArgumentsResult>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Account'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PagedConnection: never;
  PagedPageInfo: ResolverTypeWrapper<PagedPageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UnauthorizedResult: ResolverTypeWrapper<UnauthorizedResult>;
  UpdateAccountInput: UpdateAccountInput;
  UpdateAccountMutationResult: ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'] | ResolversTypes['UpdateAccountSuccessResult'];
  UpdateAccountSuccessResult: ResolverTypeWrapper<UpdateAccountSuccessResult>;
  User: ResolverTypeWrapper<UserEntity>;
  ValidationIssue: ResolverTypeWrapper<ValidationIssue>;
  Viewer: ResolverTypeWrapper<UserEntity>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Account: Account;
  AccountConnection: AccountConnection;
  AccountEdge: AccountEdge;
  Boolean: Scalars['Boolean'];
  Connection: ResolversParentTypes['AccountConnection'];
  CreateAccountInput: CreateAccountInput;
  CreateAccountMutationResult: ResolversParentTypes['CreateAccountSuccessResult'] | ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'];
  CreateAccountSuccessResult: CreateAccountSuccessResult;
  DateTime: Scalars['DateTime'];
  Edge: ResolversParentTypes['AccountEdge'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InvalidArgumentsResult: InvalidArgumentsResult;
  Mutation: {};
  Node: ResolversParentTypes['Account'];
  PageInfo: PageInfo;
  PagedConnection: never;
  PagedPageInfo: PagedPageInfo;
  Query: {};
  String: Scalars['String'];
  UnauthorizedResult: UnauthorizedResult;
  UpdateAccountInput: UpdateAccountInput;
  UpdateAccountMutationResult: ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'] | ResolversParentTypes['UpdateAccountSuccessResult'];
  UpdateAccountSuccessResult: UpdateAccountSuccessResult;
  User: UserEntity;
  ValidationIssue: ValidationIssue;
  Viewer: UserEntity;
};

export type AccountResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<'AccountConnection', ParentType, ContextType>;
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

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EdgeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = {
  __resolveType: TypeResolveFn<'AccountEdge', ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType>;
};

export type InvalidArgumentsResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['InvalidArgumentsResult'] = ResolversParentTypes['InvalidArgumentsResult']> = {
  issues?: Resolver<Array<ResolversTypes['ValidationIssue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<ResolversTypes['CreateAccountMutationResult'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'input'>>;
  updateAccount?: Resolver<ResolversTypes['UpdateAccountMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateAccountArgs, 'input'>>;
};

export type NodeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Account', ParentType, ContextType>;
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

export type QueryResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  viewer?: Resolver<Maybe<ResolversTypes['Viewer']>, ParentType, ContextType>;
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
  DateTime?: GraphQLScalarType;
  Edge?: EdgeResolvers<ContextType>;
  InvalidArgumentsResult?: InvalidArgumentsResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PagedConnection?: PagedConnectionResolvers<ContextType>;
  PagedPageInfo?: PagedPageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UnauthorizedResult?: UnauthorizedResultResolvers<ContextType>;
  UpdateAccountMutationResult?: UpdateAccountMutationResultResolvers<ContextType>;
  UpdateAccountSuccessResult?: UpdateAccountSuccessResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidationIssue?: ValidationIssueResolvers<ContextType>;
  Viewer?: ViewerResolvers<ContextType>;
};

