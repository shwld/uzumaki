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

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: TodoMutationResult;
};


export type MutationCreateTodoArgs = {
  input: TodoInput;
};

export type Query = {
  __typename?: 'Query';
  sample?: Maybe<Scalars['String']>;
  viewer?: Maybe<Viewer>;
};

export type RecordInvalidResult = {
  __typename?: 'RecordInvalidResult';
  validationErrors: Array<ValidationError>;
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TodoInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type TodoMutationResult = RecordInvalidResult | TodoSuccessResult | UserErrorResult;

export type TodoSuccessResult = {
  __typename?: 'TodoSuccessResult';
  result: Todo;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UserErrorResult = {
  __typename?: 'UserErrorResult';
  errorMessage: Scalars['String'];
};

export type ValidationError = {
  __typename?: 'ValidationError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type Viewer = {
  __typename?: 'Viewer';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  picture: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RecordInvalidResult: ResolverTypeWrapper<RecordInvalidResult>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Todo: ResolverTypeWrapper<TodoEntity>;
  TodoInput: TodoInput;
  TodoMutationResult: ResolversTypes['RecordInvalidResult'] | ResolversTypes['TodoSuccessResult'] | ResolversTypes['UserErrorResult'];
  TodoSuccessResult: ResolverTypeWrapper<Omit<TodoSuccessResult, 'result'> & { result: ResolversTypes['Todo'] }>;
  User: ResolverTypeWrapper<UserEntity>;
  UserErrorResult: ResolverTypeWrapper<UserErrorResult>;
  ValidationError: ResolverTypeWrapper<ValidationError>;
  Viewer: ResolverTypeWrapper<UserEntity>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  RecordInvalidResult: RecordInvalidResult;
  String: Scalars['String'];
  Todo: TodoEntity;
  TodoInput: TodoInput;
  TodoMutationResult: ResolversParentTypes['RecordInvalidResult'] | ResolversParentTypes['TodoSuccessResult'] | ResolversParentTypes['UserErrorResult'];
  TodoSuccessResult: Omit<TodoSuccessResult, 'result'> & { result: ResolversParentTypes['Todo'] };
  User: UserEntity;
  UserErrorResult: UserErrorResult;
  ValidationError: ValidationError;
  Viewer: UserEntity;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTodo?: Resolver<ResolversTypes['TodoMutationResult'], ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'input'>>;
};

export type QueryResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  sample?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  viewer?: Resolver<Maybe<ResolversTypes['Viewer']>, ParentType, ContextType>;
};

export type RecordInvalidResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['RecordInvalidResult'] = ResolversParentTypes['RecordInvalidResult']> = {
  validationErrors?: Resolver<Array<ResolversTypes['ValidationError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoMutationResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['TodoMutationResult'] = ResolversParentTypes['TodoMutationResult']> = {
  __resolveType: TypeResolveFn<'RecordInvalidResult' | 'TodoSuccessResult' | 'UserErrorResult', ParentType, ContextType>;
};

export type TodoSuccessResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['TodoSuccessResult'] = ResolversParentTypes['TodoSuccessResult']> = {
  result?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResultResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['UserErrorResult'] = ResolversParentTypes['UserErrorResult']> = {
  errorMessage?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['ValidationError'] = ResolversParentTypes['ValidationError']> = {
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ViewerResolvers<ContextType = GraphqlServerContext, ParentType extends ResolversParentTypes['Viewer'] = ResolversParentTypes['Viewer']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  picture?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphqlServerContext> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RecordInvalidResult?: RecordInvalidResultResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  TodoMutationResult?: TodoMutationResultResolvers<ContextType>;
  TodoSuccessResult?: TodoSuccessResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserErrorResult?: UserErrorResultResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
  Viewer?: ViewerResolvers<ContextType>;
};

