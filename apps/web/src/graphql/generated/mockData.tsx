import {
  Account,
  AccountConnection,
  AccountEdge,
  Anonymous,
  AnonymousConnection,
  AnonymousEdge,
  Connection,
  CreateAccountInput,
  CreateAccountSuccessResult,
  CreateProjectInput,
  CreateProjectSuccessResult,
  CreateStoryInput,
  CreateStorySuccessResult,
  DestroyStoryInput,
  DestroyStorySuccessResult,
  Edge,
  EstimateStoryInput,
  EstimateStorySuccessResult,
  InvalidArgumentsResult,
  InviteProjectMemberInput,
  InviteProjectMemberSuccessResult,
  JoinProjectMemberAlreadyJoinedResult,
  JoinProjectMemberInput,
  JoinProjectMemberSuccessResult,
  JoinProjectMemberTokenIsAlreadyUsedResult,
  JoinProjectMemberTokenIsExpiredResult,
  MoveStoriesInput,
  MoveStoriesStoryDestination,
  MoveStoriesSuccessResult,
  Mutation,
  Node,
  PageInfo,
  PagedConnection,
  PagedPageInfo,
  Project,
  ProjectConnection,
  ProjectEdge,
  ProjectMember,
  ProjectMemberConnection,
  ProjectMemberEdge,
  ProjectMemberInvitation,
  ProjectMemberInvitationConnection,
  ProjectMemberInvitationEdge,
  ProjectMemberInvitationToken,
  ProjectMemberInvitationTokenConnection,
  ProjectMemberInvitationTokenEdge,
  Query,
  Story,
  StoryConnection,
  StoryEdge,
  UnauthorizedResult,
  UpdateAccountInput,
  UpdateAccountSuccessResult,
  UpdateStoryInput,
  UpdateStoryStateInput,
  UpdateStoryStateSuccessResult,
  UpdateStorySuccessResult,
  User,
  UserConnection,
  UserEdge,
  ValidationIssue,
  Viewer,
  ProjectMemberRole,
  ProjectPrivacy,
  ProjectStoriesSearchPosition,
  StoryKind,
  StoryPosition,
  StoryState,
} from './graphql';

export const anAccount = (
  overrides?: Partial<Account>,
  _relationshipsToOmit: Array<string> = []
): Account => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'Account'];
  return {
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : 'tempora',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '606b76b9-67f6-4777-9c36-27c03262f9d5',
    isDeleted:
      overrides && overrides.hasOwnProperty('isDeleted')
        ? overrides.isDeleted!
        : true,
    name:
      overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'ut',
    projects:
      overrides && overrides.hasOwnProperty('projects')
        ? overrides.projects!
        : relationshipsToOmit.includes('ProjectConnection')
        ? ({} as ProjectConnection)
        : aProjectConnection({}, relationshipsToOmit),
    updatedAt:
      overrides && overrides.hasOwnProperty('updatedAt')
        ? overrides.updatedAt!
        : 'modi',
  };
};

export const anAccountConnection = (
  overrides?: Partial<AccountConnection>,
  _relationshipsToOmit: Array<string> = []
): AccountConnection => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'AccountConnection'];
  return {
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [
            relationshipsToOmit.includes('AccountEdge')
              ? ({} as AccountEdge)
              : anAccountEdge({}, relationshipsToOmit),
          ],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : relationshipsToOmit.includes('PageInfo')
        ? ({} as PageInfo)
        : aPageInfo({}, relationshipsToOmit),
  };
};

export const anAccountEdge = (
  overrides?: Partial<AccountEdge>,
  _relationshipsToOmit: Array<string> = []
): AccountEdge => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'AccountEdge'];
  return {
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'modi',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : relationshipsToOmit.includes('Account')
        ? ({} as Account)
        : anAccount({}, relationshipsToOmit),
  };
};

export const anAnonymous = (
  overrides?: Partial<Anonymous>,
  _relationshipsToOmit: Array<string> = []
): Anonymous => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'Anonymous'];
  return {
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '7ecafca8-0622-48db-8aab-5e00a260187d',
  };
};

export const anAnonymousConnection = (
  overrides?: Partial<AnonymousConnection>,
  _relationshipsToOmit: Array<string> = []
): AnonymousConnection => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'AnonymousConnection'];
  return {
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [
            relationshipsToOmit.includes('AnonymousEdge')
              ? ({} as AnonymousEdge)
              : anAnonymousEdge({}, relationshipsToOmit),
          ],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : relationshipsToOmit.includes('PageInfo')
        ? ({} as PageInfo)
        : aPageInfo({}, relationshipsToOmit),
  };
};

export const anAnonymousEdge = (
  overrides?: Partial<AnonymousEdge>,
  _relationshipsToOmit: Array<string> = []
): AnonymousEdge => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'AnonymousEdge'];
  return {
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'ipsa',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : relationshipsToOmit.includes('Anonymous')
        ? ({} as Anonymous)
        : anAnonymous({}, relationshipsToOmit),
  };
};

export const aConnection = (
  overrides?: Partial<Connection>,
  _relationshipsToOmit: Array<string> = []
): Connection => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'Connection'];
  return {
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [
            relationshipsToOmit.includes('Edge')
              ? ({} as Edge)
              : anEdge({}, relationshipsToOmit),
          ],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : relationshipsToOmit.includes('PageInfo')
        ? ({} as PageInfo)
        : aPageInfo({}, relationshipsToOmit),
  };
};

export const aCreateAccountInput = (
  overrides?: Partial<CreateAccountInput>,
  _relationshipsToOmit: Array<string> = []
): CreateAccountInput => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'CreateAccountInput'];
  return {
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '47d3b915-0ec3-428d-b7d6-b60f4c92e005',
    name:
      overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'in',
  };
};

export const aCreateAccountSuccessResult = (
  overrides?: Partial<CreateAccountSuccessResult>,
  _relationshipsToOmit: Array<string> = []
): CreateAccountSuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'CreateAccountSuccessResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('Account')
        ? ({} as Account)
        : anAccount({}, relationshipsToOmit),
  };
};

export const aCreateProjectInput = (
  overrides?: Partial<CreateProjectInput>,
  _relationshipsToOmit: Array<string> = []
): CreateProjectInput => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'CreateProjectInput'];
  return {
    accountId:
      overrides && overrides.hasOwnProperty('accountId')
        ? overrides.accountId!
        : 'f11b374b-f0e8-4af8-be31-4177ae5c8172',
    currentVelocity:
      overrides && overrides.hasOwnProperty('currentVelocity')
        ? overrides.currentVelocity!
        : 873,
    description:
      overrides && overrides.hasOwnProperty('description')
        ? overrides.description!
        : 'voluptatem',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : 'd1efcc70-8c44-4688-b856-9f513c1ee14f',
    name:
      overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'qui',
    privacy:
      overrides && overrides.hasOwnProperty('privacy')
        ? overrides.privacy!
        : ProjectPrivacy.Private,
  };
};

export const aCreateProjectSuccessResult = (
  overrides?: Partial<CreateProjectSuccessResult>,
  _relationshipsToOmit: Array<string> = []
): CreateProjectSuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'CreateProjectSuccessResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('Project')
        ? ({} as Project)
        : aProject({}, relationshipsToOmit),
  };
};

export const aCreateStoryInput = (
  overrides?: Partial<CreateStoryInput>,
  _relationshipsToOmit: Array<string> = []
): CreateStoryInput => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'CreateStoryInput'];
  return {
    description:
      overrides && overrides.hasOwnProperty('description')
        ? overrides.description!
        : 'non',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '7b3cacdc-4e8d-4b89-a332-c0a8b5649138',
    kind:
      overrides && overrides.hasOwnProperty('kind')
        ? overrides.kind!
        : StoryKind.Bug,
    points:
      overrides && overrides.hasOwnProperty('points')
        ? overrides.points!
        : 7194,
    position:
      overrides && overrides.hasOwnProperty('position')
        ? overrides.position!
        : StoryPosition.Backlog,
    priority:
      overrides && overrides.hasOwnProperty('priority')
        ? overrides.priority!
        : 2974,
    projectId:
      overrides && overrides.hasOwnProperty('projectId')
        ? overrides.projectId!
        : 'e712dc87-39f8-46a2-959b-4e70b0510600',
    releaseDate:
      overrides && overrides.hasOwnProperty('releaseDate')
        ? overrides.releaseDate!
        : 'ut',
    requesterId:
      overrides && overrides.hasOwnProperty('requesterId')
        ? overrides.requesterId!
        : '0d6ef164-ddfd-42ad-b20e-6752b90f4d91',
    state:
      overrides && overrides.hasOwnProperty('state')
        ? overrides.state!
        : StoryState.Accepted,
    title:
      overrides && overrides.hasOwnProperty('title')
        ? overrides.title!
        : 'dolorem',
  };
};

export const aCreateStorySuccessResult = (
  overrides?: Partial<CreateStorySuccessResult>,
  _relationshipsToOmit: Array<string> = []
): CreateStorySuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'CreateStorySuccessResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('Story')
        ? ({} as Story)
        : aStory({}, relationshipsToOmit),
  };
};

export const aDestroyStoryInput = (
  overrides?: Partial<DestroyStoryInput>,
  _relationshipsToOmit: Array<string> = []
): DestroyStoryInput => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'DestroyStoryInput'];
  return {
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : 'f528d1a2-1e41-448a-a5f7-6905aca34440',
  };
};

export const aDestroyStorySuccessResult = (
  overrides?: Partial<DestroyStorySuccessResult>,
  _relationshipsToOmit: Array<string> = []
): DestroyStorySuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'DestroyStorySuccessResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('Story')
        ? ({} as Story)
        : aStory({}, relationshipsToOmit),
  };
};

export const anEdge = (
  overrides?: Partial<Edge>,
  _relationshipsToOmit: Array<string> = []
): Edge => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'Edge'];
  return {
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'recusandae',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : relationshipsToOmit.includes('Node')
        ? ({} as Node)
        : aNode({}, relationshipsToOmit),
  };
};

export const anEstimateStoryInput = (
  overrides?: Partial<EstimateStoryInput>,
  _relationshipsToOmit: Array<string> = []
): EstimateStoryInput => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'EstimateStoryInput'];
  return {
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '5abbde7d-6870-4116-ba45-a9742722aa62',
    points:
      overrides && overrides.hasOwnProperty('points')
        ? overrides.points!
        : 7982,
  };
};

export const anEstimateStorySuccessResult = (
  overrides?: Partial<EstimateStorySuccessResult>,
  _relationshipsToOmit: Array<string> = []
): EstimateStorySuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'EstimateStorySuccessResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('Story')
        ? ({} as Story)
        : aStory({}, relationshipsToOmit),
  };
};

export const anInvalidArgumentsResult = (
  overrides?: Partial<InvalidArgumentsResult>,
  _relationshipsToOmit: Array<string> = []
): InvalidArgumentsResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'InvalidArgumentsResult',
  ];
  return {
    issues:
      overrides && overrides.hasOwnProperty('issues')
        ? overrides.issues!
        : [
            relationshipsToOmit.includes('ValidationIssue')
              ? ({} as ValidationIssue)
              : aValidationIssue({}, relationshipsToOmit),
          ],
  };
};

export const anInviteProjectMemberInput = (
  overrides?: Partial<InviteProjectMemberInput>,
  _relationshipsToOmit: Array<string> = []
): InviteProjectMemberInput => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'InviteProjectMemberInput',
  ];
  return {
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '79a258b1-3a23-498c-b04c-1984ecdea78f',
    projectId:
      overrides && overrides.hasOwnProperty('projectId')
        ? overrides.projectId!
        : '03301015-f786-4e79-92df-bdfb93c05ea5',
    role:
      overrides && overrides.hasOwnProperty('role')
        ? overrides.role!
        : ProjectMemberRole.Member,
    userEmail:
      overrides && overrides.hasOwnProperty('userEmail')
        ? overrides.userEmail!
        : 'eos',
  };
};

export const anInviteProjectMemberSuccessResult = (
  overrides?: Partial<InviteProjectMemberSuccessResult>,
  _relationshipsToOmit: Array<string> = []
): InviteProjectMemberSuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'InviteProjectMemberSuccessResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('ProjectMemberInvitation')
        ? ({} as ProjectMemberInvitation)
        : aProjectMemberInvitation({}, relationshipsToOmit),
  };
};

export const aJoinProjectMemberAlreadyJoinedResult = (
  overrides?: Partial<JoinProjectMemberAlreadyJoinedResult>,
  _relationshipsToOmit: Array<string> = []
): JoinProjectMemberAlreadyJoinedResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'JoinProjectMemberAlreadyJoinedResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('ProjectMember')
        ? ({} as ProjectMember)
        : aProjectMember({}, relationshipsToOmit),
  };
};

export const aJoinProjectMemberInput = (
  overrides?: Partial<JoinProjectMemberInput>,
  _relationshipsToOmit: Array<string> = []
): JoinProjectMemberInput => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'JoinProjectMemberInput',
  ];
  return {
    confirmationToken:
      overrides && overrides.hasOwnProperty('confirmationToken')
        ? overrides.confirmationToken!
        : 'explicabo',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '9ca6b528-db22-4411-9b70-676aee1e146f',
  };
};

export const aJoinProjectMemberSuccessResult = (
  overrides?: Partial<JoinProjectMemberSuccessResult>,
  _relationshipsToOmit: Array<string> = []
): JoinProjectMemberSuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'JoinProjectMemberSuccessResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('ProjectMember')
        ? ({} as ProjectMember)
        : aProjectMember({}, relationshipsToOmit),
  };
};

export const aJoinProjectMemberTokenIsAlreadyUsedResult = (
  overrides?: Partial<JoinProjectMemberTokenIsAlreadyUsedResult>,
  _relationshipsToOmit: Array<string> = []
): JoinProjectMemberTokenIsAlreadyUsedResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'JoinProjectMemberTokenIsAlreadyUsedResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('ProjectMemberInvitation')
        ? ({} as ProjectMemberInvitation)
        : aProjectMemberInvitation({}, relationshipsToOmit),
  };
};

export const aJoinProjectMemberTokenIsExpiredResult = (
  overrides?: Partial<JoinProjectMemberTokenIsExpiredResult>,
  _relationshipsToOmit: Array<string> = []
): JoinProjectMemberTokenIsExpiredResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'JoinProjectMemberTokenIsExpiredResult',
  ];
  return {
    expiredAt:
      overrides && overrides.hasOwnProperty('expiredAt')
        ? overrides.expiredAt!
        : 'quo',
  };
};

export const aMoveStoriesInput = (
  overrides?: Partial<MoveStoriesInput>,
  _relationshipsToOmit: Array<string> = []
): MoveStoriesInput => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'MoveStoriesInput'];
  return {
    projectId:
      overrides && overrides.hasOwnProperty('projectId')
        ? overrides.projectId!
        : 'e156d789-9017-48bd-bed8-e2c80830f04e',
    stories:
      overrides && overrides.hasOwnProperty('stories')
        ? overrides.stories!
        : [
            relationshipsToOmit.includes('MoveStoriesStoryDestination')
              ? ({} as MoveStoriesStoryDestination)
              : aMoveStoriesStoryDestination({}, relationshipsToOmit),
          ],
  };
};

export const aMoveStoriesStoryDestination = (
  overrides?: Partial<MoveStoriesStoryDestination>,
  _relationshipsToOmit: Array<string> = []
): MoveStoriesStoryDestination => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'MoveStoriesStoryDestination',
  ];
  return {
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '86f679b7-b9b2-44dd-8364-cd151c61d3e3',
    position:
      overrides && overrides.hasOwnProperty('position')
        ? overrides.position!
        : StoryPosition.Backlog,
    priority:
      overrides && overrides.hasOwnProperty('priority')
        ? overrides.priority!
        : 5565,
  };
};

export const aMoveStoriesSuccessResult = (
  overrides?: Partial<MoveStoriesSuccessResult>,
  _relationshipsToOmit: Array<string> = []
): MoveStoriesSuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'MoveStoriesSuccessResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : [
            relationshipsToOmit.includes('Story')
              ? ({} as Story)
              : aStory({}, relationshipsToOmit),
          ],
  };
};

export const aMutation = (
  overrides?: Partial<Mutation>,
  _relationshipsToOmit: Array<string> = []
): Mutation => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'Mutation'];
  return {
    createAccount:
      overrides && overrides.hasOwnProperty('createAccount')
        ? overrides.createAccount!
        : relationshipsToOmit.includes('CreateAccountSuccessResult')
        ? ({} as CreateAccountSuccessResult)
        : aCreateAccountSuccessResult({}, relationshipsToOmit),
    createProject:
      overrides && overrides.hasOwnProperty('createProject')
        ? overrides.createProject!
        : relationshipsToOmit.includes('CreateProjectSuccessResult')
        ? ({} as CreateProjectSuccessResult)
        : aCreateProjectSuccessResult({}, relationshipsToOmit),
    createStory:
      overrides && overrides.hasOwnProperty('createStory')
        ? overrides.createStory!
        : relationshipsToOmit.includes('CreateStorySuccessResult')
        ? ({} as CreateStorySuccessResult)
        : aCreateStorySuccessResult({}, relationshipsToOmit),
    destroyStory:
      overrides && overrides.hasOwnProperty('destroyStory')
        ? overrides.destroyStory!
        : relationshipsToOmit.includes('DestroyStorySuccessResult')
        ? ({} as DestroyStorySuccessResult)
        : aDestroyStorySuccessResult({}, relationshipsToOmit),
    estimateStory:
      overrides && overrides.hasOwnProperty('estimateStory')
        ? overrides.estimateStory!
        : relationshipsToOmit.includes('EstimateStorySuccessResult')
        ? ({} as EstimateStorySuccessResult)
        : anEstimateStorySuccessResult({}, relationshipsToOmit),
    inviteProjectMember:
      overrides && overrides.hasOwnProperty('inviteProjectMember')
        ? overrides.inviteProjectMember!
        : relationshipsToOmit.includes('InvalidArgumentsResult')
        ? ({} as InvalidArgumentsResult)
        : anInvalidArgumentsResult({}, relationshipsToOmit),
    joinProjectMember:
      overrides && overrides.hasOwnProperty('joinProjectMember')
        ? overrides.joinProjectMember!
        : relationshipsToOmit.includes('InvalidArgumentsResult')
        ? ({} as InvalidArgumentsResult)
        : anInvalidArgumentsResult({}, relationshipsToOmit),
    moveStories:
      overrides && overrides.hasOwnProperty('moveStories')
        ? overrides.moveStories!
        : relationshipsToOmit.includes('InvalidArgumentsResult')
        ? ({} as InvalidArgumentsResult)
        : anInvalidArgumentsResult({}, relationshipsToOmit),
    updateAccount:
      overrides && overrides.hasOwnProperty('updateAccount')
        ? overrides.updateAccount!
        : relationshipsToOmit.includes('InvalidArgumentsResult')
        ? ({} as InvalidArgumentsResult)
        : anInvalidArgumentsResult({}, relationshipsToOmit),
    updateStory:
      overrides && overrides.hasOwnProperty('updateStory')
        ? overrides.updateStory!
        : relationshipsToOmit.includes('InvalidArgumentsResult')
        ? ({} as InvalidArgumentsResult)
        : anInvalidArgumentsResult({}, relationshipsToOmit),
    updateStoryState:
      overrides && overrides.hasOwnProperty('updateStoryState')
        ? overrides.updateStoryState!
        : relationshipsToOmit.includes('InvalidArgumentsResult')
        ? ({} as InvalidArgumentsResult)
        : anInvalidArgumentsResult({}, relationshipsToOmit),
  };
};

export const aNode = (
  overrides?: Partial<Node>,
  _relationshipsToOmit: Array<string> = []
): Node => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'Node'];
  return {
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '95bb2f34-6c86-495f-bfdc-f25b025cdba5',
  };
};

export const aPageInfo = (
  overrides?: Partial<PageInfo>,
  _relationshipsToOmit: Array<string> = []
): PageInfo => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'PageInfo'];
  return {
    endCursor:
      overrides && overrides.hasOwnProperty('endCursor')
        ? overrides.endCursor!
        : 'id',
    hasNextPage:
      overrides && overrides.hasOwnProperty('hasNextPage')
        ? overrides.hasNextPage!
        : true,
    hasPreviousPage:
      overrides && overrides.hasOwnProperty('hasPreviousPage')
        ? overrides.hasPreviousPage!
        : false,
    startCursor:
      overrides && overrides.hasOwnProperty('startCursor')
        ? overrides.startCursor!
        : 'eum',
  };
};

export const aPagedConnection = (
  overrides?: Partial<PagedConnection>,
  _relationshipsToOmit: Array<string> = []
): PagedConnection => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'PagedConnection'];
  return {
    nodes:
      overrides && overrides.hasOwnProperty('nodes')
        ? overrides.nodes!
        : [
            relationshipsToOmit.includes('Node')
              ? ({} as Node)
              : aNode({}, relationshipsToOmit),
          ],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : relationshipsToOmit.includes('PagedPageInfo')
        ? ({} as PagedPageInfo)
        : aPagedPageInfo({}, relationshipsToOmit),
  };
};

export const aPagedPageInfo = (
  overrides?: Partial<PagedPageInfo>,
  _relationshipsToOmit: Array<string> = []
): PagedPageInfo => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'PagedPageInfo'];
  return {
    hasNextPage:
      overrides && overrides.hasOwnProperty('hasNextPage')
        ? overrides.hasNextPage!
        : true,
    hasPreviousPage:
      overrides && overrides.hasOwnProperty('hasPreviousPage')
        ? overrides.hasPreviousPage!
        : false,
    totalPagesCount:
      overrides && overrides.hasOwnProperty('totalPagesCount')
        ? overrides.totalPagesCount!
        : 3992,
  };
};

export const aProject = (
  overrides?: Partial<Project>,
  _relationshipsToOmit: Array<string> = []
): Project => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'Project'];
  return {
    accountId:
      overrides && overrides.hasOwnProperty('accountId')
        ? overrides.accountId!
        : '0684b85f-09cd-4a48-9e1a-8cfa122d4344',
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : 'deserunt',
    currentVelocity:
      overrides && overrides.hasOwnProperty('currentVelocity')
        ? overrides.currentVelocity!
        : 2460,
    description:
      overrides && overrides.hasOwnProperty('description')
        ? overrides.description!
        : 'voluptatem',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '3e7d7963-406a-47bd-ad80-0448296895bf',
    invitations:
      overrides && overrides.hasOwnProperty('invitations')
        ? overrides.invitations!
        : relationshipsToOmit.includes('ProjectMemberInvitationConnection')
        ? ({} as ProjectMemberInvitationConnection)
        : aProjectMemberInvitationConnection({}, relationshipsToOmit),
    isDeleted:
      overrides && overrides.hasOwnProperty('isDeleted')
        ? overrides.isDeleted!
        : false,
    members:
      overrides && overrides.hasOwnProperty('members')
        ? overrides.members!
        : relationshipsToOmit.includes('ProjectMemberConnection')
        ? ({} as ProjectMemberConnection)
        : aProjectMemberConnection({}, relationshipsToOmit),
    name:
      overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'et',
    privacy:
      overrides && overrides.hasOwnProperty('privacy')
        ? overrides.privacy!
        : ProjectPrivacy.Private,
    stories:
      overrides && overrides.hasOwnProperty('stories')
        ? overrides.stories!
        : relationshipsToOmit.includes('StoryConnection')
        ? ({} as StoryConnection)
        : aStoryConnection({}, relationshipsToOmit),
    story:
      overrides && overrides.hasOwnProperty('story')
        ? overrides.story!
        : relationshipsToOmit.includes('Story')
        ? ({} as Story)
        : aStory({}, relationshipsToOmit),
    updatedAt:
      overrides && overrides.hasOwnProperty('updatedAt')
        ? overrides.updatedAt!
        : 'ipsum',
  };
};

export const aProjectConnection = (
  overrides?: Partial<ProjectConnection>,
  _relationshipsToOmit: Array<string> = []
): ProjectConnection => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'ProjectConnection'];
  return {
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [
            relationshipsToOmit.includes('ProjectEdge')
              ? ({} as ProjectEdge)
              : aProjectEdge({}, relationshipsToOmit),
          ],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : relationshipsToOmit.includes('PageInfo')
        ? ({} as PageInfo)
        : aPageInfo({}, relationshipsToOmit),
  };
};

export const aProjectEdge = (
  overrides?: Partial<ProjectEdge>,
  _relationshipsToOmit: Array<string> = []
): ProjectEdge => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'ProjectEdge'];
  return {
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'repudiandae',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : relationshipsToOmit.includes('Project')
        ? ({} as Project)
        : aProject({}, relationshipsToOmit),
  };
};

export const aProjectMember = (
  overrides?: Partial<ProjectMember>,
  _relationshipsToOmit: Array<string> = []
): ProjectMember => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'ProjectMember'];
  return {
    avatarImageUrl:
      overrides && overrides.hasOwnProperty('avatarImageUrl')
        ? overrides.avatarImageUrl!
        : 'quas',
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : 'odit',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : 'd9d74e52-e374-4a7a-94e3-ea15097779b8',
    isMe:
      overrides && overrides.hasOwnProperty('isMe') ? overrides.isMe! : false,
    name:
      overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'et',
    role:
      overrides && overrides.hasOwnProperty('role')
        ? overrides.role!
        : ProjectMemberRole.Member,
    updatedAt:
      overrides && overrides.hasOwnProperty('updatedAt')
        ? overrides.updatedAt!
        : 'dicta',
  };
};

export const aProjectMemberConnection = (
  overrides?: Partial<ProjectMemberConnection>,
  _relationshipsToOmit: Array<string> = []
): ProjectMemberConnection => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'ProjectMemberConnection',
  ];
  return {
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [
            relationshipsToOmit.includes('ProjectMemberEdge')
              ? ({} as ProjectMemberEdge)
              : aProjectMemberEdge({}, relationshipsToOmit),
          ],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : relationshipsToOmit.includes('PageInfo')
        ? ({} as PageInfo)
        : aPageInfo({}, relationshipsToOmit),
  };
};

export const aProjectMemberEdge = (
  overrides?: Partial<ProjectMemberEdge>,
  _relationshipsToOmit: Array<string> = []
): ProjectMemberEdge => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'ProjectMemberEdge'];
  return {
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'officiis',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : relationshipsToOmit.includes('ProjectMember')
        ? ({} as ProjectMember)
        : aProjectMember({}, relationshipsToOmit),
  };
};

export const aProjectMemberInvitation = (
  overrides?: Partial<ProjectMemberInvitation>,
  _relationshipsToOmit: Array<string> = []
): ProjectMemberInvitation => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'ProjectMemberInvitation',
  ];
  return {
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : 'molestiae',
    email:
      overrides && overrides.hasOwnProperty('email') ? overrides.email! : 'et',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '5a2629d1-e301-4e42-acb7-35b44d2ca30a',
    isJoined:
      overrides && overrides.hasOwnProperty('isJoined')
        ? overrides.isJoined!
        : true,
    projectName:
      overrides && overrides.hasOwnProperty('projectName')
        ? overrides.projectName!
        : 'porro',
    role:
      overrides && overrides.hasOwnProperty('role')
        ? overrides.role!
        : ProjectMemberRole.Member,
    updatedAt:
      overrides && overrides.hasOwnProperty('updatedAt')
        ? overrides.updatedAt!
        : 'sapiente',
  };
};

export const aProjectMemberInvitationConnection = (
  overrides?: Partial<ProjectMemberInvitationConnection>,
  _relationshipsToOmit: Array<string> = []
): ProjectMemberInvitationConnection => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'ProjectMemberInvitationConnection',
  ];
  return {
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [
            relationshipsToOmit.includes('ProjectMemberInvitationEdge')
              ? ({} as ProjectMemberInvitationEdge)
              : aProjectMemberInvitationEdge({}, relationshipsToOmit),
          ],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : relationshipsToOmit.includes('PageInfo')
        ? ({} as PageInfo)
        : aPageInfo({}, relationshipsToOmit),
  };
};

export const aProjectMemberInvitationEdge = (
  overrides?: Partial<ProjectMemberInvitationEdge>,
  _relationshipsToOmit: Array<string> = []
): ProjectMemberInvitationEdge => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'ProjectMemberInvitationEdge',
  ];
  return {
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'omnis',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : relationshipsToOmit.includes('ProjectMemberInvitation')
        ? ({} as ProjectMemberInvitation)
        : aProjectMemberInvitation({}, relationshipsToOmit),
  };
};

export const aProjectMemberInvitationToken = (
  overrides?: Partial<ProjectMemberInvitationToken>,
  _relationshipsToOmit: Array<string> = []
): ProjectMemberInvitationToken => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'ProjectMemberInvitationToken',
  ];
  return {
    confirmationToken:
      overrides && overrides.hasOwnProperty('confirmationToken')
        ? overrides.confirmationToken!
        : 'saepe',
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : 'eveniet',
    expiredAt:
      overrides && overrides.hasOwnProperty('expiredAt')
        ? overrides.expiredAt!
        : 'maiores',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '2e51a8ae-ba88-41bc-87d5-475d5f57b9b5',
    invitation:
      overrides && overrides.hasOwnProperty('invitation')
        ? overrides.invitation!
        : relationshipsToOmit.includes('ProjectMemberInvitation')
        ? ({} as ProjectMemberInvitation)
        : aProjectMemberInvitation({}, relationshipsToOmit),
    isExpired:
      overrides && overrides.hasOwnProperty('isExpired')
        ? overrides.isExpired!
        : true,
    updatedAt:
      overrides && overrides.hasOwnProperty('updatedAt')
        ? overrides.updatedAt!
        : 'sint',
  };
};

export const aProjectMemberInvitationTokenConnection = (
  overrides?: Partial<ProjectMemberInvitationTokenConnection>,
  _relationshipsToOmit: Array<string> = []
): ProjectMemberInvitationTokenConnection => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'ProjectMemberInvitationTokenConnection',
  ];
  return {
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [
            relationshipsToOmit.includes('ProjectMemberInvitationTokenEdge')
              ? ({} as ProjectMemberInvitationTokenEdge)
              : aProjectMemberInvitationTokenEdge({}, relationshipsToOmit),
          ],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : relationshipsToOmit.includes('PageInfo')
        ? ({} as PageInfo)
        : aPageInfo({}, relationshipsToOmit),
  };
};

export const aProjectMemberInvitationTokenEdge = (
  overrides?: Partial<ProjectMemberInvitationTokenEdge>,
  _relationshipsToOmit: Array<string> = []
): ProjectMemberInvitationTokenEdge => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'ProjectMemberInvitationTokenEdge',
  ];
  return {
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'ut',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : relationshipsToOmit.includes('ProjectMemberInvitationToken')
        ? ({} as ProjectMemberInvitationToken)
        : aProjectMemberInvitationToken({}, relationshipsToOmit),
  };
};

export const aQuery = (
  overrides?: Partial<Query>,
  _relationshipsToOmit: Array<string> = []
): Query => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'Query'];
  return {
    anonymous:
      overrides && overrides.hasOwnProperty('anonymous')
        ? overrides.anonymous!
        : relationshipsToOmit.includes('Anonymous')
        ? ({} as Anonymous)
        : anAnonymous({}, relationshipsToOmit),
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : relationshipsToOmit.includes('Node')
        ? ({} as Node)
        : aNode({}, relationshipsToOmit),
    viewer:
      overrides && overrides.hasOwnProperty('viewer')
        ? overrides.viewer!
        : relationshipsToOmit.includes('Viewer')
        ? ({} as Viewer)
        : aViewer({}, relationshipsToOmit),
  };
};

export const aStory = (
  overrides?: Partial<Story>,
  _relationshipsToOmit: Array<string> = []
): Story => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'Story'];
  return {
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : 'impedit',
    description:
      overrides && overrides.hasOwnProperty('description')
        ? overrides.description!
        : 'ratione',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '43319be6-5d3b-4a00-8485-e4f526c6b331',
    isCompleted:
      overrides && overrides.hasOwnProperty('isCompleted')
        ? overrides.isCompleted!
        : true,
    isDeleted:
      overrides && overrides.hasOwnProperty('isDeleted')
        ? overrides.isDeleted!
        : false,
    isUnEstimated:
      overrides && overrides.hasOwnProperty('isUnEstimated')
        ? overrides.isUnEstimated!
        : true,
    kind:
      overrides && overrides.hasOwnProperty('kind')
        ? overrides.kind!
        : StoryKind.Bug,
    owners:
      overrides && overrides.hasOwnProperty('owners')
        ? overrides.owners!
        : [
            relationshipsToOmit.includes('User')
              ? ({} as User)
              : aUser({}, relationshipsToOmit),
          ],
    points:
      overrides && overrides.hasOwnProperty('points')
        ? overrides.points!
        : 4000,
    position:
      overrides && overrides.hasOwnProperty('position')
        ? overrides.position!
        : StoryPosition.Backlog,
    priority:
      overrides && overrides.hasOwnProperty('priority')
        ? overrides.priority!
        : 8020,
    project:
      overrides && overrides.hasOwnProperty('project')
        ? overrides.project!
        : relationshipsToOmit.includes('Project')
        ? ({} as Project)
        : aProject({}, relationshipsToOmit),
    projectId:
      overrides && overrides.hasOwnProperty('projectId')
        ? overrides.projectId!
        : 'fea13c33-1285-4005-86fa-81db5444e360',
    releaseDate:
      overrides && overrides.hasOwnProperty('releaseDate')
        ? overrides.releaseDate!
        : 'dolores',
    requester:
      overrides && overrides.hasOwnProperty('requester')
        ? overrides.requester!
        : relationshipsToOmit.includes('User')
        ? ({} as User)
        : aUser({}, relationshipsToOmit),
    requesterId:
      overrides && overrides.hasOwnProperty('requesterId')
        ? overrides.requesterId!
        : 'ef2beadf-5f8a-4c66-b73a-bc6e5a062fa3',
    state:
      overrides && overrides.hasOwnProperty('state')
        ? overrides.state!
        : StoryState.Accepted,
    title:
      overrides && overrides.hasOwnProperty('title')
        ? overrides.title!
        : 'deleniti',
    updatedAt:
      overrides && overrides.hasOwnProperty('updatedAt')
        ? overrides.updatedAt!
        : 'cumque',
  };
};

export const aStoryConnection = (
  overrides?: Partial<StoryConnection>,
  _relationshipsToOmit: Array<string> = []
): StoryConnection => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'StoryConnection'];
  return {
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [
            relationshipsToOmit.includes('StoryEdge')
              ? ({} as StoryEdge)
              : aStoryEdge({}, relationshipsToOmit),
          ],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : relationshipsToOmit.includes('PageInfo')
        ? ({} as PageInfo)
        : aPageInfo({}, relationshipsToOmit),
  };
};

export const aStoryEdge = (
  overrides?: Partial<StoryEdge>,
  _relationshipsToOmit: Array<string> = []
): StoryEdge => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'StoryEdge'];
  return {
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'eaque',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : relationshipsToOmit.includes('Story')
        ? ({} as Story)
        : aStory({}, relationshipsToOmit),
  };
};

export const anUnauthorizedResult = (
  overrides?: Partial<UnauthorizedResult>,
  _relationshipsToOmit: Array<string> = []
): UnauthorizedResult => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'UnauthorizedResult'];
  return {
    errorMessage:
      overrides && overrides.hasOwnProperty('errorMessage')
        ? overrides.errorMessage!
        : 'id',
  };
};

export const anUpdateAccountInput = (
  overrides?: Partial<UpdateAccountInput>,
  _relationshipsToOmit: Array<string> = []
): UpdateAccountInput => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'UpdateAccountInput'];
  return {
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : 'f44a70c1-895b-404d-90ef-8c498e9078ec',
    name:
      overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'quod',
  };
};

export const anUpdateAccountSuccessResult = (
  overrides?: Partial<UpdateAccountSuccessResult>,
  _relationshipsToOmit: Array<string> = []
): UpdateAccountSuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'UpdateAccountSuccessResult',
  ];
  return {
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('Account')
        ? ({} as Account)
        : anAccount({}, relationshipsToOmit),
  };
};

export const anUpdateStoryInput = (
  overrides?: Partial<UpdateStoryInput>,
  _relationshipsToOmit: Array<string> = []
): UpdateStoryInput => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'UpdateStoryInput'];
  return {
    description:
      overrides && overrides.hasOwnProperty('description')
        ? overrides.description!
        : 'provident',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '2024735e-3496-4f00-ba9f-af965a031d16',
    kind:
      overrides && overrides.hasOwnProperty('kind')
        ? overrides.kind!
        : StoryKind.Bug,
    points:
      overrides && overrides.hasOwnProperty('points')
        ? overrides.points!
        : 7671,
    releaseDate:
      overrides && overrides.hasOwnProperty('releaseDate')
        ? overrides.releaseDate!
        : 'nihil',
    requesterId:
      overrides && overrides.hasOwnProperty('requesterId')
        ? overrides.requesterId!
        : '20f9e45d-3393-4f75-876e-a880078ee30f',
    state:
      overrides && overrides.hasOwnProperty('state')
        ? overrides.state!
        : StoryState.Accepted,
    title:
      overrides && overrides.hasOwnProperty('title')
        ? overrides.title!
        : 'nobis',
  };
};

export const anUpdateStoryStateInput = (
  overrides?: Partial<UpdateStoryStateInput>,
  _relationshipsToOmit: Array<string> = []
): UpdateStoryStateInput => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'UpdateStoryStateInput',
  ];
  return {
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : '86ec8942-363e-44f2-ac9b-2fee429b9bbc',
    state:
      overrides && overrides.hasOwnProperty('state')
        ? overrides.state!
        : StoryState.Accepted,
  };
};

export const anUpdateStoryStateSuccessResult = (
  overrides?: Partial<UpdateStoryStateSuccessResult>,
  _relationshipsToOmit: Array<string> = []
): UpdateStoryStateSuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'UpdateStoryStateSuccessResult',
  ];
  return {
    effectedStories:
      overrides && overrides.hasOwnProperty('effectedStories')
        ? overrides.effectedStories!
        : [
            relationshipsToOmit.includes('Story')
              ? ({} as Story)
              : aStory({}, relationshipsToOmit),
          ],
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('Story')
        ? ({} as Story)
        : aStory({}, relationshipsToOmit),
  };
};

export const anUpdateStorySuccessResult = (
  overrides?: Partial<UpdateStorySuccessResult>,
  _relationshipsToOmit: Array<string> = []
): UpdateStorySuccessResult => {
  const relationshipsToOmit = [
    ..._relationshipsToOmit,
    'UpdateStorySuccessResult',
  ];
  return {
    effectedStories:
      overrides && overrides.hasOwnProperty('effectedStories')
        ? overrides.effectedStories!
        : [
            relationshipsToOmit.includes('Story')
              ? ({} as Story)
              : aStory({}, relationshipsToOmit),
          ],
    result:
      overrides && overrides.hasOwnProperty('result')
        ? overrides.result!
        : relationshipsToOmit.includes('Story')
        ? ({} as Story)
        : aStory({}, relationshipsToOmit),
  };
};

export const aUser = (
  overrides?: Partial<User>,
  _relationshipsToOmit: Array<string> = []
): User => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'User'];
  return {
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : 'a5756f00-41a6-422a-8a7d-d13ee6a63750',
    name:
      overrides && overrides.hasOwnProperty('name') ? overrides.name! : 'porro',
  };
};

export const aUserConnection = (
  overrides?: Partial<UserConnection>,
  _relationshipsToOmit: Array<string> = []
): UserConnection => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'UserConnection'];
  return {
    edges:
      overrides && overrides.hasOwnProperty('edges')
        ? overrides.edges!
        : [
            relationshipsToOmit.includes('UserEdge')
              ? ({} as UserEdge)
              : aUserEdge({}, relationshipsToOmit),
          ],
    pageInfo:
      overrides && overrides.hasOwnProperty('pageInfo')
        ? overrides.pageInfo!
        : relationshipsToOmit.includes('PageInfo')
        ? ({} as PageInfo)
        : aPageInfo({}, relationshipsToOmit),
  };
};

export const aUserEdge = (
  overrides?: Partial<UserEdge>,
  _relationshipsToOmit: Array<string> = []
): UserEdge => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'UserEdge'];
  return {
    cursor:
      overrides && overrides.hasOwnProperty('cursor')
        ? overrides.cursor!
        : 'optio',
    node:
      overrides && overrides.hasOwnProperty('node')
        ? overrides.node!
        : relationshipsToOmit.includes('User')
        ? ({} as User)
        : aUser({}, relationshipsToOmit),
  };
};

export const aValidationIssue = (
  overrides?: Partial<ValidationIssue>,
  _relationshipsToOmit: Array<string> = []
): ValidationIssue => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'ValidationIssue'];
  return {
    field:
      overrides && overrides.hasOwnProperty('field')
        ? overrides.field!
        : 'blanditiis',
    message:
      overrides && overrides.hasOwnProperty('message')
        ? overrides.message!
        : 'vel',
  };
};

export const aViewer = (
  overrides?: Partial<Viewer>,
  _relationshipsToOmit: Array<string> = []
): Viewer => {
  const relationshipsToOmit = [..._relationshipsToOmit, 'Viewer'];
  return {
    accounts:
      overrides && overrides.hasOwnProperty('accounts')
        ? overrides.accounts!
        : relationshipsToOmit.includes('AccountConnection')
        ? ({} as AccountConnection)
        : anAccountConnection({}, relationshipsToOmit),
    avatarImageUrl:
      overrides && overrides.hasOwnProperty('avatarImageUrl')
        ? overrides.avatarImageUrl!
        : 'quibusdam',
    createdAt:
      overrides && overrides.hasOwnProperty('createdAt')
        ? overrides.createdAt!
        : 'dignissimos',
    email:
      overrides && overrides.hasOwnProperty('email')
        ? overrides.email!
        : 'nihil',
    id:
      overrides && overrides.hasOwnProperty('id')
        ? overrides.id!
        : 'b786abe6-aab7-4a59-ad28-8aa00011215e',
    invitationToken:
      overrides && overrides.hasOwnProperty('invitationToken')
        ? overrides.invitationToken!
        : relationshipsToOmit.includes('ProjectMemberInvitationToken')
        ? ({} as ProjectMemberInvitationToken)
        : aProjectMemberInvitationToken({}, relationshipsToOmit),
    project:
      overrides && overrides.hasOwnProperty('project')
        ? overrides.project!
        : relationshipsToOmit.includes('Project')
        ? ({} as Project)
        : aProject({}, relationshipsToOmit),
    updatedAt:
      overrides && overrides.hasOwnProperty('updatedAt')
        ? overrides.updatedAt!
        : 'impedit',
  };
};
