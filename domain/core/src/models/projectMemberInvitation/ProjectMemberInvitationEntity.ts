import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { ProjectMemberRole } from '../projectMember';
import { projectMemberInvitationValidator } from './projectMemberInvitationValidator';

/** Field  */
export interface UpdatableProjectMemberInvitationEntityFields {
  email: string;
  role: ProjectMemberRole;
}

interface ProjectMemberInvitationEntityRelationFields {
  projectId: string;
  membershipId?: string;
}

export type ProjectMemberInvitationEntityFields = GenericEntityProperties &
  StateProperties &
  UpdatableProjectMemberInvitationEntityFields &
  ProjectMemberInvitationEntityRelationFields;

type AttributesForInitialize = GenericEntityProperties &
  Partial<StateProperties> &
  UpdatableProjectMemberInvitationEntityFields &
  ProjectMemberInvitationEntityRelationFields;

export class ProjectMemberInvitationEntity
  implements ProjectMemberInvitationEntityFields
{
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

    this.email = projectMemberInvitationValidator.email.parse(args.email);
    this.role = projectMemberInvitationValidator.role.parse(
      args.role
    ) as ProjectMemberRole;
    this.projectId = projectMemberInvitationValidator.projectId.parse(
      args.projectId
    );
    this.membershipId = projectMemberInvitationValidator.membershipId.parse(
      args.membershipId
    );
  }

  update(
    fields: UpdatableProjectMemberInvitationEntityFields
  ): ProjectMemberInvitationEntity {
    return new ProjectMemberInvitationEntity({
      ...this.attributes(),
      ...fields,
      isUpdated: true,
    });
  }

  destroy() {
    return new ProjectMemberInvitationEntity({
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
