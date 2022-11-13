import type { ProjectMembership, User } from '@prisma/client';
import { ProjectMemberEntity } from 'core-domain';

export const convertToEntity = (
  record: ProjectMembership & { user: User }
): ProjectMemberEntity => {
  return ProjectMemberEntity(record);
};
