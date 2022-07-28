import type { ProjectEntity, ProjectInvitationEntity } from '../../models';
import { Repository } from './base';

export interface ProjectInvitationRepository
  extends Repository<ProjectInvitationEntity, { project?: ProjectEntity }> {}
