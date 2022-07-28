import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { ProjectMemberRole } from '../projectMember';
import { projectInvitationValidator } from './projectInvitationValidator';

/** Field  */
export interface UpdatableProjectInvitationEntityFields {
  email: string;
  role: ProjectMemberRole;
}

interface ProjectInvitationEntityRelationFields {
  projectId: string;
  membershipId?: string;
}

export type ProjectInvitationEntityFields = GenericEntityProperties &
  StateProperties &
  UpdatableProjectInvitationEntityFields &
  ProjectInvitationEntityRelationFields;

export type AttributesForInitialize = GenericEntityProperties &
  Partial<StateProperties> &
  UpdatableProjectInvitationEntityFields &
  ProjectInvitationEntityRelationFields;

export class ProjectInvitationEntity implements ProjectInvitationEntityFields {
  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly isDeleted;
  readonly isUpdated;

  readonly email;
  readonly role;

  readonly projectId;
  readonly membershipId;

  attributes(): AttributesForInitialize {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      email: this.email,
      role: this.role,

      projectId: this.projectId,
      membershipId: this.membershipId,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.isDeleted = args.isDeleted ?? false;
    this.isUpdated = args.isUpdated ?? false;

    this.email = projectInvitationValidator.email.parse(args.email);
    this.role = projectInvitationValidator.role.parse(
      args.role
    ) as ProjectMemberRole;
    this.projectId = projectInvitationValidator.projectId.parse(args.projectId);
    this.membershipId = projectInvitationValidator.membershipId.parse(
      args.membershipId
    );
  }

  update(
    fields: UpdatableProjectInvitationEntityFields
  ): ProjectInvitationEntity {
    return new ProjectInvitationEntity({
      ...this.attributes(),
      ...fields,
      isUpdated: true,
    });
  }

  destroy() {
    return new ProjectInvitationEntity({
      ...this.attributes(),
      isDeleted: true,
    });
  }

  isInviting() {
    return this.membershipId == null;
  }

  isJoined() {
    return this.membershipId != null;
  }
}
