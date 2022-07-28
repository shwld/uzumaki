import type {
  ProjectEntity,
  ProjectMemberInvitationEntity,
} from '../../models';
import { Repository } from './base';

export interface ProjectMemberInvitationRepository
  extends Repository<
    ProjectMemberInvitationEntity,
    { project?: ProjectEntity }
  > {
  findByToken: (args: {
    tokenId: string;
  }) => Promise<ProjectMemberInvitationEntity | undefined>;
}
