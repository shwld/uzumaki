import type { Project } from '@prisma/client';
import { ProjectEntity } from 'core-domain';

export const convertToEntity = (record: Project): ProjectEntity => {
  return ProjectEntity(record);
};
