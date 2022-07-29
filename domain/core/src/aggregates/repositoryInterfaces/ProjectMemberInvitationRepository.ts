import type {
  ProjectEntity,
  ProjectMemberInvitationEntity,
  ProjectMemberInvitationTokenEntity,
} from '../../models';
import { Repository } from './base';

export interface ProjectMemberInvitationRepository
  extends Repository<
    ProjectMemberInvitationEntity,
    { project?: ProjectEntity; isInviting?: boolean }
  > {
  createToken: (
    invitation: ProjectMemberInvitationEntity
  ) => Promise<ProjectMemberInvitationTokenEntity>;
  findTokenBy: (args: {
    confirmationToken: string;
  }) => Promise<ProjectMemberInvitationTokenEntity | undefined>;
}
