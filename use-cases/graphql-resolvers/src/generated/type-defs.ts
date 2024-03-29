import gql from 'graphql-tag';
export const typeDefs = gql`
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
  type Account implements Node {
    createdAt: DateTime!
    id: ID!
    isDeleted: Boolean
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
    | InternalErrorResult
    | InvalidArgumentsResult
    | UnauthorizedResult
  type CreateAccountSuccessResult {
    result: Account!
  }
  input CreateProjectInput {
    accountId: ID!
    description: String
    id: ID!
    initialVelocity: Int!
    name: String!
    privacy: ProjectPrivacy!
  }
  union CreateProjectMutationResult =
      CreateProjectSuccessResult
    | InternalErrorResult
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
    requesterId: ID!
    state: StoryState!
    title: String!
  }
  union CreateStoryMutationResult =
      CreateStorySuccessResult
    | InternalErrorResult
    | InvalidArgumentsResult
    | UnauthorizedResult
  type CreateStorySuccessResult {
    effectedStories: [Story!]!
    result: Story!
  }
  scalar DateTime
  enum DayOfWeek {
    FRIDAY
    MONDAY
    SATURDAY
    SUNDAY
    THURSDAY
    TUESDAY
    WEDNESDAY
  }
  input DestroyStoryInput {
    id: ID!
  }
  union DestroyStoryMutationResult =
      DestroyStorySuccessResult
    | InternalErrorResult
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
    | InternalErrorResult
    | InvalidArgumentsResult
    | UnauthorizedResult
  type EstimateStorySuccessResult {
    result: Story!
  }
  type InternalErrorResult {
    errorMessage: String!
  }
  type InvalidArgumentsResult {
    errorMessage: String!
    issues: [ValidationIssue!]!
  }
  input InviteProjectMemberInput {
    id: ID!
    projectId: ID!
    role: ProjectMemberRole!
    userEmail: String!
  }
  union InviteProjectMemberMutationResult =
      InternalErrorResult
    | InvalidArgumentsResult
    | InviteProjectMemberSuccessResult
    | UnauthorizedResult
  type InviteProjectMemberSuccessResult {
    result: ProjectMemberInvitation
  }
  type JoinProjectMemberAlreadyJoinedResult {
    result: Boolean!
  }
  input JoinProjectMemberInput {
    confirmationToken: String!
    memberId: ID!
  }
  union JoinProjectMemberMutationResult =
      InternalErrorResult
    | InvalidArgumentsResult
    | JoinProjectMemberAlreadyJoinedResult
    | JoinProjectMemberSuccessResult
    | JoinProjectMemberTokenIsAlreadyUsedResult
    | JoinProjectMemberTokenIsExpiredResult
    | UnauthorizedResult
  type JoinProjectMemberSuccessResult {
    result: Boolean!
  }
  type JoinProjectMemberTokenIsAlreadyUsedResult {
    result: Boolean!
  }
  type JoinProjectMemberTokenIsExpiredResult {
    expiredAt: DateTime!
  }
  input MoveStoriesInput {
    projectId: ID!
    stories: [MoveStoriesStoryDestination!]!
  }
  union MoveStoriesMutationResult =
      InternalErrorResult
    | InvalidArgumentsResult
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
    inviteProjectMember(
      input: InviteProjectMemberInput!
    ): InviteProjectMemberMutationResult!
    joinProjectMember(
      input: JoinProjectMemberInput!
    ): JoinProjectMemberMutationResult!
    moveStories(input: MoveStoriesInput!): MoveStoriesMutationResult!
    updateAccount(input: UpdateAccountInput!): UpdateAccountMutationResult!
    updateStory(input: UpdateStoryInput!): UpdateStoryMutationResult!
    updateStoryState(
      input: UpdateStoryStateInput!
    ): UpdateStoryStateMutationResult!
    updateUserProfile(
      input: UpdateUserProfileInput!
    ): UpdateUserProfileMutationResult!
  }
  interface Node {
    id: ID!
  }
  scalar NullableID
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
    boardConfig: ProjectBoardConfig!
    boardStatus: ProjectBoardStatus!
    createdAt: DateTime!
    description: String!
    id: ID!
    invitations: ProjectMemberInvitationConnection!
    isDeleted: Boolean
    members: ProjectMemberConnection!
    name: String!
    privacy: ProjectPrivacy!
    stories(
      after: String
      first: Int
      page: Int
      position: StoryPosition
    ): StoryConnection!
    story(id: ID!): Story
    updatedAt: DateTime!
  }
  type ProjectBoardConfig implements Node {
    createdAt: DateTime!
    id: ID!
    initialVelocity: Int!
    iterationLength: Int!
    startIterationOn: DayOfWeek!
    startIterationWeekNumber: Int!
    startOn: DateTime
    updatedAt: DateTime!
  }
  type ProjectBoardStatus implements Node {
    createdAt: DateTime!
    id: ID!
    updatedAt: DateTime!
    velocity: Int!
  }
  type ProjectConnection implements Connection {
    edges: [ProjectEdge]
    pageInfo: PageInfo
  }
  type ProjectEdge implements Edge {
    cursor: String
    node: Project
  }
  type ProjectMember implements Node {
    createdAt: DateTime!
    id: ID!
    isMe: Boolean!
    profile: UserProfile!
    role: ProjectMemberRole!
    updatedAt: DateTime!
  }
  type ProjectMemberConnection implements Connection {
    edges: [ProjectMemberEdge]
    pageInfo: PageInfo
  }
  type ProjectMemberEdge implements Edge {
    cursor: String
    node: ProjectMember
  }
  type ProjectMemberInvitation implements Node {
    createdAt: DateTime!
    email: String!
    id: ID!
    isJoined: Boolean!
    projectName: String!
    role: ProjectMemberRole!
    updatedAt: DateTime!
  }
  type ProjectMemberInvitationConnection implements Connection {
    edges: [ProjectMemberInvitationEdge]
    pageInfo: PageInfo
  }
  type ProjectMemberInvitationEdge implements Edge {
    cursor: String
    node: ProjectMemberInvitation
  }
  type ProjectMemberInvitationToken implements Node {
    confirmationToken: String!
    createdAt: DateTime!
    expiredAt: DateTime!
    id: ID!
    invitation: ProjectMemberInvitation!
    isExpired: Boolean!
    updatedAt: DateTime!
  }
  type ProjectMemberInvitationTokenConnection implements Connection {
    edges: [ProjectMemberInvitationTokenEdge]
    pageInfo: PageInfo
  }
  type ProjectMemberInvitationTokenEdge implements Edge {
    cursor: String
    node: ProjectMemberInvitationToken
  }
  enum ProjectMemberRole {
    MEMBER
    OWNER
    VIEWER
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
    canEstimate: Boolean!
    completedAt: DateTime
    createdAt: DateTime!
    description: String!
    id: ID!
    isCompleted: Boolean!
    isDeleted: Boolean
    isProcessing: Boolean!
    isUnEstimated: Boolean!
    kind: StoryKind!
    owners: [ProjectMember!]!
    points: Int
    position: StoryPosition!
    priority: Int!
    project: Project
    projectId: ID!
    releaseDate: DateTime
    requester: ProjectMember
    requesterId: ID!
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
  type Subscription {
    subscribeStoryUpdate(projectId: ID!): Story
  }
  type UnauthorizedResult {
    errorMessage: String!
  }
  input UpdateAccountInput {
    id: ID!
    name: String!
  }
  union UpdateAccountMutationResult =
      InternalErrorResult
    | InvalidArgumentsResult
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
    requesterId: NullableID
    state: StoryState!
    title: String!
  }
  union UpdateStoryMutationResult =
      InternalErrorResult
    | InvalidArgumentsResult
    | UnauthorizedResult
    | UpdateStorySuccessResult
  input UpdateStoryStateInput {
    id: ID!
    state: StoryState!
  }
  union UpdateStoryStateMutationResult =
      InternalErrorResult
    | InvalidArgumentsResult
    | UnauthorizedResult
    | UpdateStoryStateSuccessResult
  type UpdateStoryStateSuccessResult {
    effectedStories: [Story!]!
    result: Story!
  }
  type UpdateStorySuccessResult {
    effectedStories: [Story!]!
    result: Story!
  }
  input UpdateUserProfileInput {
    avatarImage: Upload
    name: String
  }
  union UpdateUserProfileMutationResult =
      InternalErrorResult
    | InvalidArgumentsResult
    | UnauthorizedResult
    | UpdateUserProfileSuccessResult
  type UpdateUserProfileSuccessResult {
    result: UserProfile!
  }
  scalar Upload
  type UserProfile implements Node {
    avatarImageUrl: String!
    id: ID!
    name: String!
  }
  type UserProfileConnection implements Connection {
    edges: [UserProfileEdge]
    pageInfo: PageInfo
  }
  type UserProfileEdge implements Edge {
    cursor: String
    node: UserProfile
  }
  type ValidationIssue {
    field: String
    message: String
  }
  type Viewer {
    accounts(after: String, first: Int, page: Int): AccountConnection!
    createdAt: DateTime!
    email: String!
    id: ID!
    invitationToken(confirmationToken: String!): ProjectMemberInvitationToken
    profile: UserProfile!
    project(id: ID!): Project
    updatedAt: DateTime!
  }
`;
