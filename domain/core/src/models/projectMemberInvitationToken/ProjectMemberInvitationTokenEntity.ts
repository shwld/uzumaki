import { GenericEntityProperties } from '../../shared/entity';
import { genericValidator } from '../../shared/validator';
import { ProjectMemberInvitationEntity } from '../projectMemberInvitation/ProjectMemberInvitationEntity';
import { projectMemberInvitationTokenValidator } from './projectMemberInvitationTokenValidator';

/** Field  */
export interface UpdatableProjectMemberInvitationTokenEntityFields {}

interface ProjectMemberInvitationTokenEntityRelationFields {}

export type ProjectMemberInvitationTokenEntityFields = GenericEntityProperties &
  UpdatableProjectMemberInvitationTokenEntityFields &
  ProjectMemberInvitationTokenEntityRelationFields & {
    expiredAt: Date;
    invitation: ProjectMemberInvitationEntity;
  };

type AttributesForInitialize = GenericEntityProperties &
  UpdatableProjectMemberInvitationTokenEntityFields &
  ProjectMemberInvitationTokenEntityRelationFields & {
    expiredAt: Date;
    invitation: ProjectMemberInvitationEntity;
  };

export class ProjectMemberInvitationTokenEntity
  implements ProjectMemberInvitationTokenEntityFields
{
  readonly id;
  readonly createdAt;
  readonly updatedAt;
  readonly expiredAt;
  readonly invitation;

  attributes(): AttributesForInitialize {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      expiredAt: this.expiredAt,
      invitation: this.invitation,
    };
  }

  constructor(args: AttributesForInitialize) {
    this.id = genericValidator.id.parse(args.id);
    this.createdAt = genericValidator.createdAt.parse(args.createdAt);
    this.updatedAt = genericValidator.updatedAt.parse(args.updatedAt);
    this.expiredAt = projectMemberInvitationTokenValidator.expiredAt.parse(
      args.expiredAt
    );
    this.invitation = args.invitation;
  }

  get confirmationToken(): string {
    return this.id;
  }

  isExpired(): boolean {
    return this.expiredAt < new Date();
  }
}
