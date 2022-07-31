import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { projectMemberValidator } from './projectMemberValidator';

export type ProjectMemberRole = 'OWNER' | 'MEMBER' | 'VIEWER';

/** Field  */
export interface UpdatableProjectMemberEntityFields {
  role: ProjectMemberRole;
}

interface ProjectMemberEntityRelationFields {
  projectId: string;
  userId: string;
  name: string;
  avatarImageUrl: string;
  createdByInvitationId?: string;
}

export type ProjectMemberEntityFields = GenericEntityProperties &
  StateProperties &
  UpdatableProjectMemberEntityFields &
  ProjectMemberEntityRelationFields;

type AttributesForInitialize = GenericEntityProperties &
  Partial<StateProperties> &
  UpdatableProjectMemberEntityFields &
  ProjectMemberEntityRelationFields;

export class ProjectMemberEntity implements ProjectMemberEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;
  readonly isUpdated;

  readonly projectId;
  readonly userId;
  readonly createdByInvitationId;

  readonly role;
  readonly name;
  readonly avatarImageUrl;

  attributes(): AttributesForInitialize & StateProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isUpdated: this.isUpdated,
      isDeleted: this.isDeleted,
      projectId: this.projectId,
      userId: this.userId,
      createdByInvitationId: this.createdByInvitationId,
      role: this.role,
      name: this.name,
      avatarImageUrl: this.avatarImageUrl,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = args.isDeleted ?? false;
    this.isUpdated = args.isUpdated ?? false;

    this.projectId = projectMemberValidator.projectId.parse(args.projectId);
    this.userId = projectMemberValidator.userId.parse(args.userId);
    this.createdByInvitationId =
      projectMemberValidator.createdByInvitationId.parse(
        args.createdByInvitationId
      );

    this.role = projectMemberValidator.role.parse(
      args.role
    ) as ProjectMemberRole;
    this.name = projectMemberValidator.name.parse(args.name);
    this.avatarImageUrl = projectMemberValidator.avatarImageUrl.parse(
      args.avatarImageUrl
    );
  }

  destroy() {
    return new ProjectMemberEntity({
      ...this.attributes(),
      isDeleted: true,
    });
  }
}
