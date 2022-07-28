import { GenericEntityProperties, StateProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { ProjectMemberRole } from '../projectMember';
import { invitationValidator } from './invitationValidator';

/** Field  */
export interface UpdatableInvitationEntityFields {
  email: string;
  role: ProjectMemberRole;
}

interface InvitationEntityRelationFields {
  projectId: string;
  membershipId?: string;
}

export type InvitationEntityFields = GenericEntityProperties &
  StateProperties &
  UpdatableInvitationEntityFields &
  InvitationEntityRelationFields;

export type AttributesForInitialize = GenericEntityProperties &
  Partial<StateProperties> &
  UpdatableInvitationEntityFields &
  InvitationEntityRelationFields;

export class InvitationEntity implements InvitationEntityFields {
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

    this.email = invitationValidator.email.parse(args.email);
    this.role = invitationValidator.role.parse(args.role) as ProjectMemberRole;
    this.projectId = invitationValidator.projectId.parse(args.projectId);
    this.membershipId = invitationValidator.membershipId.parse(
      args.membershipId
    );
  }

  update(fields: UpdatableInvitationEntityFields): InvitationEntity {
    return new InvitationEntity({
      ...this.attributes(),
      ...fields,
      isUpdated: true,
    });
  }

  destroy() {
    return new InvitationEntity({
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
