import gql from "graphql-tag"
export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
  }
  type Account implements Node {
    createdAt: DateTime!
    id: ID!
    isDeleted: Boolean!
    name: String!
    projects: ProjectConnection!
    updatedAt: DateTime!
  }
  type AccountConnection implements Connection {
    edges: [AccountEdge]
    pageInfo: PageInfo
  }
  type AccountEdge implements Edge {
    cursor: String
    node: Account
  }
  interface Connection {
    edges: [Edge]
    pageInfo: PageInfo
  }
  input CreateAccountInput {
    id: ID!
    name: String!
  }
  union CreateAccountMutationResult =
      CreateAccountSuccessResult
    | InvalidArgumentsResult
    | UnauthorizedResult
  type CreateAccountSuccessResult {
    result: Account!
  }
  input CreateProjectInput {
    accountId: ID!
    currentVelocity: Int!
    description: String
    id: ID!
    name: String!
    privacy: ProjectPrivacy!
  }
  union CreateProjectMutationResult =
      CreateProjectSuccessResult
    | InvalidArgumentsResult
    | UnauthorizedResult
  type CreateProjectSuccessResult {
    result: Project!
  }
  input CreateStoryInput {
    description: String!
    id: ID!
    kind: StoryKind!
    points: Int
    position: StoryPosition!
    priority: Int!
    projectId: ID!
    releaseDate: DateTime
    requesterId: ID
    state: StoryState!
    title: String!
  }
  union CreateStoryMutationResult =
      CreateStorySuccessResult
    | InvalidArgumentsResult
    | UnauthorizedResult
  type CreateStorySuccessResult {
    result: Story!
  }
  scalar DateTime
  input DestroyStoryInput {
    id: ID!
  }
  union DestroyStoryMutationResult =
      DestroyStorySuccessResult
    | InvalidArgumentsResult
    | UnauthorizedResult
  type DestroyStorySuccessResult {
    result: Story!
  }
  interface Edge {
    cursor: String
    node: Node
  }
  input EstimateStoryInput {
    id: ID!
    points: Int
  }
  union EstimateStoryMutationResult =
      EstimateStorySuccessResult
    | InvalidArgumentsResult
    | UnauthorizedResult
  type EstimateStorySuccessResult {
    result: Story!
  }
  type InvalidArgumentsResult {
    issues: [ValidationIssue!]!
  }
  input MoveStoriesInput {
    projectId: ID!
    stories: [MoveStoriesStoryDestination!]!
  }
  union MoveStoriesMutationResult =
      InvalidArgumentsResult
    | MoveStoriesSuccessResult
    | UnauthorizedResult
  input MoveStoriesStoryDestination {
    id: ID!
    position: StoryPosition!
    priority: Int!
  }
  type MoveStoriesSuccessResult {
    result: [Story!]!
  }
  type Mutation {
    createAccount(input: CreateAccountInput!): CreateAccountMutationResult!
    createProject(input: CreateProjectInput!): CreateProjectMutationResult!
    createStory(input: CreateStoryInput!): CreateStoryMutationResult!
    destroyStory(input: DestroyStoryInput!): DestroyStoryMutationResult!
    estimateStory(input: EstimateStoryInput!): EstimateStoryMutationResult!
    moveStories(input: MoveStoriesInput!): MoveStoriesMutationResult!
    updateAccount(input: UpdateAccountInput!): UpdateAccountMutationResult!
    updateStory(input: UpdateStoryInput!): UpdateStoryMutationResult!
  }
  interface Node {
    id: ID!
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean
    startCursor: String
  }
  interface PagedConnection {
    nodes: [Node]
    pageInfo: PagedPageInfo
  }
  type PagedPageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean
    totalPagesCount: Int
  }
  type Project implements Node {
    accountId: ID!
    createdAt: DateTime!
    currentVelocity: Int!
    description: String!
    id: ID!
    isDeleted: Boolean!
    members: [User!]!
    name: String!
    privacy: ProjectPrivacy!
    stories: StoryConnection!
    story(id: ID!): Story
    updatedAt: DateTime!
  }
  type ProjectConnection implements Connection {
    edges: [ProjectEdge]
    pageInfo: PageInfo
  }
  type ProjectEdge implements Edge {
    cursor: String
    node: Project
  }
  enum ProjectPrivacy {
    PRIVATE
    PUBLIC
  }
  type Query {
    node(id: ID!): Node
    viewer: Viewer
  }
  type Story implements Node {
    createdAt: DateTime!
    description: String!
    id: ID!
    isDeleted: Boolean!
    isUnEstimated: Boolean!
    kind: StoryKind!
    owners: [User!]!
    points: Int
    position: StoryPosition!
    priority: Int!
    project: Project
    projectId: ID!
    releaseDate: DateTime
    requester: User
    requesterId: ID
    state: StoryState!
    title: String!
    updatedAt: DateTime!
  }
  type StoryConnection implements Connection {
    edges: [StoryEdge]
    pageInfo: PageInfo
  }
  type StoryEdge implements Edge {
    cursor: String
    node: Story
  }
  enum StoryKind {
    BUG
    CHORE
    FEATURE
    RELEASE
  }
  enum StoryPosition {
    BACKLOG
    CURRENT
    DONE
    ICEBOX
  }
  enum StoryState {
    ACCEPTED
    DELIVERED
    FINISHED
    REJECTED
    STARTED
    UNSTARTED
  }
  type UnauthorizedResult {
    errorMessage: String!
  }
  input UpdateAccountInput {
    id: ID!
    name: String!
  }
  union UpdateAccountMutationResult =
      InvalidArgumentsResult
    | UnauthorizedResult
    | UpdateAccountSuccessResult
  type UpdateAccountSuccessResult {
    result: Account!
  }
  input UpdateStoryInput {
    description: String!
    id: ID!
    kind: StoryKind!
    points: Int
    releaseDate: DateTime
    requesterId: ID
    state: StoryState!
    title: String!
  }
  union UpdateStoryMutationResult =
      InvalidArgumentsResult
    | UnauthorizedResult
    | UpdateStorySuccessResult
  type UpdateStorySuccessResult {
    result: Story!
  }
  type User implements Node {
    id: ID!
    name: String!
  }
  type UserConnection implements Connection {
    edges: [UserEdge]
    pageInfo: PageInfo
  }
  type UserEdge implements Edge {
    cursor: String
    node: User
  }
  type ValidationIssue {
    field: String
    message: String
  }
  type Viewer {
    accounts(after: String, first: Int, page: Int): AccountConnection!
    avatarImageUrl: String!
    createdAt: DateTime!
    email: String!
    id: ID!
    project(id: ID!): Project
    updatedAt: DateTime!
  }
`
