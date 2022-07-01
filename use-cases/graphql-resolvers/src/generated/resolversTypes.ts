import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserEntity, TodoEntity } from 'core-domain';
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
  title: Scalars['String'];
};

export type CreateAccountMutationResult = CreateAccountSuccessResult | InvalidArgumentsResult | UnauthorizedResult;

export type CreateAccountSuccessResult = {
  __typename?: 'CreateAccountSuccessResult';
  result: Account;
};

export type CreateTodoInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateTodoMutationResult = CreateTodoSuccessResult | InvalidArgumentsResult | UnauthorizedResult;

export type CreateTodoSuccessResult = {
  __typename?: 'CreateTodoSuccessResult';
  result: Todo;
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
  createTodo: CreateTodoMutationResult;
  updateTodoTitle: UpdateTodoTitleMutationResult;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationUpdateTodoTitleArgs = {
  input: UpdateTodoTitleInput;
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

export type Todo = Node & {
  __typename?: 'Todo';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TodoConnection = Connection & {
  __typename?: 'TodoConnection';
  edges?: Maybe<Array<Maybe<TodoEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type TodoEdge = Edge & {
  __typename?: 'TodoEdge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Todo>;
};

export type UnauthorizedResult = {
  __typename?: 'UnauthorizedResult';
  errorMessage: Scalars['String'];
};

export type UpdateTodoTitleInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type UpdateTodoTitleMutationResult = InvalidArgumentsResult | UnauthorizedResult | UpdateTodoTitleSuccessResult;

export type UpdateTodoTitleSuccessResult = {
  __typename?: 'UpdateTodoTitleSuccessResult';
  result: Todo;
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
  avatarImageUrl: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  todos: TodoConnection;
  updatedAt: Scalars['DateTime'];
};


export type ViewerTodosArgs = {
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
  Connection: ResolversTypes['AccountConnection'] | ResolversTypes['TodoConnection'];
  CreateAccountInput: CreateAccountInput;
  CreateAccountMutationResult: ResolversTypes['CreateAccountSuccessResult'] | ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'];
  CreateAccountSuccessResult: ResolverTypeWrapper<CreateAccountSuccessResult>;
  CreateTodoInput: CreateTodoInput;
  CreateTodoMutationResult: ResolversTypes['CreateTodoSuccessResult'] | ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'];
  CreateTodoSuccessResult: ResolverTypeWrapper<Omit<CreateTodoSuccessResult, 'result'> & { result: ResolversTypes['Todo'] }>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Edge: ResolversTypes['AccountEdge'] | ResolversTypes['TodoEdge'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InvalidArgumentsResult: ResolverTypeWrapper<InvalidArgumentsResult>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Account'] | ResolversTypes['Todo'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PagedConnection: never;
  PagedPageInfo: ResolverTypeWrapper<PagedPageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Todo: ResolverTypeWrapper<TodoEntity>;
  TodoConnection: ResolverTypeWrapper<Omit<TodoConnection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversTypes['TodoEdge']>>> }>;
  TodoEdge: ResolverTypeWrapper<Omit<TodoEdge, 'node'> & { node?: Maybe<ResolversTypes['Todo']> }>;
  UnauthorizedResult: ResolverTypeWrapper<UnauthorizedResult>;
  UpdateTodoTitleInput: UpdateTodoTitleInput;
  UpdateTodoTitleMutationResult: ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['UnauthorizedResult'] | ResolversTypes['UpdateTodoTitleSuccessResult'];
  UpdateTodoTitleSuccessResult: ResolverTypeWrapper<Omit<UpdateTodoTitleSuccessResult, 'result'> & { result: ResolversTypes['Todo'] }>;
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
  Connection: ResolversParentTypes['AccountConnection'] | ResolversParentTypes['TodoConnection'];
  CreateAccountInput: CreateAccountInput;
  CreateAccountMutationResult: ResolversParentTypes['CreateAccountSuccessResult'] | ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'];
  CreateAccountSuccessResult: CreateAccountSuccessResult;
  CreateTodoInput: CreateTodoInput;
  CreateTodoMutationResult: ResolversParentTypes['CreateTodoSuccessResult'] | ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'];
  CreateTodoSuccessResult: Omit<CreateTodoSuccessResult, 'result'> & { result: ResolversParentTypes['Todo'] };
  DateTime: Scalars['DateTime'];
  Edge: ResolversParentTypes['AccountEdge'] | ResolversParentTypes['TodoEdge'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InvalidArgumentsResult: InvalidArgumentsResult;
  Mutation: {};
  Node: ResolversParentTypes['Account'] | ResolversParentTypes['Todo'];
  PageInfo: PageInfo;
  PagedConnection: never;
  PagedPageInfo: PagedPageInfo;
  Query: {};
  String: Scalars['String'];
  Todo: TodoEntity;
  TodoConnection: Omit<TodoConnection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversParentTypes['TodoEdge']>>> };
  TodoEdge: Omit<TodoEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Todo']> };
  UnauthorizedResult: UnauthorizedResult;
  UpdateTodoTitleInput: UpdateTodoTitleInput;
  UpdateTodoTitleMutationResult: ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['UnauthorizedResult'] | ResolversParentTypes['UpdateTodoTitleSuccessResult'];
  UpdateTodoTitleSuccessResult: Omit<UpdateTodoTitleSuccessResult, 'result'> & { result: ResolversParentTypes['Todo'] };
  User: UserEntity;
  ValidationIssue: ValidationIssue;
  Viewer: UserEntity;
};

export type AccountResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<'AccountConnection' | 'TodoConnection', ParentType, ContextType>;
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

export type CreateTodoMutationResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['CreateTodoMutationResult'] = ResolversParentTypes['CreateTodoMutationResult']> = {
  __resolveType: TypeResolveFn<'CreateTodoSuccessResult' | 'InvalidArgumentsResult' | 'UnauthorizedResult', ParentType, ContextType>;
};

export type CreateTodoSuccessResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['CreateTodoSuccessResult'] = ResolversParentTypes['CreateTodoSuccessResult']> = {
  result?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EdgeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = {
  __resolveType: TypeResolveFn<'AccountEdge' | 'TodoEdge', ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType>;
};

export type InvalidArgumentsResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['InvalidArgumentsResult'] = ResolversParentTypes['InvalidArgumentsResult']> = {
  issues?: Resolver<Array<ResolversTypes['ValidationIssue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createAccount?: Resolver<ResolversTypes['CreateAccountMutationResult'], ParentType, ContextType, RequireFields<MutationCreateAccountArgs, 'input'>>;
  createTodo?: Resolver<ResolversTypes['CreateTodoMutationResult'], ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'input'>>;
  updateTodoTitle?: Resolver<ResolversTypes['UpdateTodoTitleMutationResult'], ParentType, ContextType, RequireFields<MutationUpdateTodoTitleArgs, 'input'>>;
};

export type NodeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Account' | 'Todo', ParentType, ContextType>;
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

export type TodoResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoConnectionResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['TodoConnection'] = ResolversParentTypes['TodoConnection']> = {
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['TodoEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoEdgeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['TodoEdge'] = ResolversParentTypes['TodoEdge']> = {
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnauthorizedResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['UnauthorizedResult'] = ResolversParentTypes['UnauthorizedResult']> = {
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateTodoTitleMutationResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['UpdateTodoTitleMutationResult'] = ResolversParentTypes['UpdateTodoTitleMutationResult']> = {
  __resolveType: TypeResolveFn<'InvalidArgumentsResult' | 'UnauthorizedResult' | 'UpdateTodoTitleSuccessResult', ParentType, ContextType>;
};

export type UpdateTodoTitleSuccessResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['UpdateTodoTitleSuccessResult'] = ResolversParentTypes['UpdateTodoTitleSuccessResult']> = {
  result?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>;
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
  avatarImageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  todos?: Resolver<ResolversTypes['TodoConnection'], ParentType, ContextType, Partial<ViewerTodosArgs>>;
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
  CreateTodoMutationResult?: CreateTodoMutationResultResolvers<ContextType>;
  CreateTodoSuccessResult?: CreateTodoSuccessResultResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Edge?: EdgeResolvers<ContextType>;
  InvalidArgumentsResult?: InvalidArgumentsResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PagedConnection?: PagedConnectionResolvers<ContextType>;
  PagedPageInfo?: PagedPageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  TodoConnection?: TodoConnectionResolvers<ContextType>;
  TodoEdge?: TodoEdgeResolvers<ContextType>;
  UnauthorizedResult?: UnauthorizedResultResolvers<ContextType>;
  UpdateTodoTitleMutationResult?: UpdateTodoTitleMutationResultResolvers<ContextType>;
  UpdateTodoTitleSuccessResult?: UpdateTodoTitleSuccessResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidationIssue?: ValidationIssueResolvers<ContextType>;
  Viewer?: ViewerResolvers<ContextType>;
};

