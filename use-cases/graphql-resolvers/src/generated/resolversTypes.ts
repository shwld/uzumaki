import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { UserEntity, TodoEntity } from 'core-domain';
import { GraphqlServerContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type Connection = {
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CreateTodoInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
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
  createTodo: TodoMutationResult;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
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

export type TodoMutationResult = InvalidArgumentsResult | TodoSuccessResult | UnauthenticatedResult;

export type TodoSuccessResult = {
  __typename?: 'TodoSuccessResult';
  result: Todo;
};

export type UnauthenticatedResult = {
  __typename?: 'UnauthenticatedResult';
  errorMessage: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  picture: Scalars['String'];
  todos: TodoConnection;
  updatedAt: Scalars['DateTime'];
};


export type ViewerTodosArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Connection: ResolversTypes['TodoConnection'];
  CreateTodoInput: CreateTodoInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Edge: ResolversTypes['TodoEdge'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InvalidArgumentsResult: ResolverTypeWrapper<InvalidArgumentsResult>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Todo'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PagedConnection: never;
  PagedPageInfo: ResolverTypeWrapper<PagedPageInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Todo: ResolverTypeWrapper<TodoEntity>;
  TodoConnection: ResolverTypeWrapper<Omit<TodoConnection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversTypes['TodoEdge']>>> }>;
  TodoEdge: ResolverTypeWrapper<Omit<TodoEdge, 'node'> & { node?: Maybe<ResolversTypes['Todo']> }>;
  TodoMutationResult: ResolversTypes['InvalidArgumentsResult'] | ResolversTypes['TodoSuccessResult'] | ResolversTypes['UnauthenticatedResult'];
  TodoSuccessResult: ResolverTypeWrapper<Omit<TodoSuccessResult, 'result'> & { result: ResolversTypes['Todo'] }>;
  UnauthenticatedResult: ResolverTypeWrapper<UnauthenticatedResult>;
  User: ResolverTypeWrapper<UserEntity>;
  ValidationIssue: ResolverTypeWrapper<ValidationIssue>;
  Viewer: ResolverTypeWrapper<UserEntity>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Connection: ResolversParentTypes['TodoConnection'];
  CreateTodoInput: CreateTodoInput;
  DateTime: Scalars['DateTime'];
  Edge: ResolversParentTypes['TodoEdge'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InvalidArgumentsResult: InvalidArgumentsResult;
  Mutation: {};
  Node: ResolversParentTypes['Todo'];
  PageInfo: PageInfo;
  PagedConnection: never;
  PagedPageInfo: PagedPageInfo;
  Query: {};
  String: Scalars['String'];
  Todo: TodoEntity;
  TodoConnection: Omit<TodoConnection, 'edges'> & { edges?: Maybe<Array<Maybe<ResolversParentTypes['TodoEdge']>>> };
  TodoEdge: Omit<TodoEdge, 'node'> & { node?: Maybe<ResolversParentTypes['Todo']> };
  TodoMutationResult: ResolversParentTypes['InvalidArgumentsResult'] | ResolversParentTypes['TodoSuccessResult'] | ResolversParentTypes['UnauthenticatedResult'];
  TodoSuccessResult: Omit<TodoSuccessResult, 'result'> & { result: ResolversParentTypes['Todo'] };
  UnauthenticatedResult: UnauthenticatedResult;
  User: UserEntity;
  ValidationIssue: ValidationIssue;
  Viewer: UserEntity;
};

export type ConnectionResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = {
  __resolveType: TypeResolveFn<'TodoConnection', ParentType, ContextType>;
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['Edge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EdgeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Edge'] = ResolversParentTypes['Edge']> = {
  __resolveType: TypeResolveFn<'TodoEdge', ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType>;
};

export type InvalidArgumentsResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['InvalidArgumentsResult'] = ResolversParentTypes['InvalidArgumentsResult']> = {
  issues?: Resolver<Array<ResolversTypes['ValidationIssue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTodo?: Resolver<ResolversTypes['TodoMutationResult'], ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'input'>>;
};

export type NodeResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Todo', ParentType, ContextType>;
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

export type TodoMutationResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['TodoMutationResult'] = ResolversParentTypes['TodoMutationResult']> = {
  __resolveType: TypeResolveFn<'InvalidArgumentsResult' | 'TodoSuccessResult' | 'UnauthenticatedResult', ParentType, ContextType>;
};

export type TodoSuccessResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['TodoSuccessResult'] = ResolversParentTypes['TodoSuccessResult']> = {
  result?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnauthenticatedResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['UnauthenticatedResult'] = ResolversParentTypes['UnauthenticatedResult']> = {
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  picture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  todos?: Resolver<ResolversTypes['TodoConnection'], ParentType, ContextType, Partial<ViewerTodosArgs>>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphqlServerContext> = {
  Connection?: ConnectionResolvers<ContextType>;
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
  TodoMutationResult?: TodoMutationResultResolvers<ContextType>;
  TodoSuccessResult?: TodoSuccessResultResolvers<ContextType>;
  UnauthenticatedResult?: UnauthenticatedResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ValidationIssue?: ValidationIssueResolvers<ContextType>;
  Viewer?: ViewerResolvers<ContextType>;
};

