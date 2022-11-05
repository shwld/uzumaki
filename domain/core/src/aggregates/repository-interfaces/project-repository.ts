import type {
  Project_BuiltAttributes,
  Project_DraftAttributes,
  Project_RemoveAttributes,
  ProjectEntity,
  UserEntity,
} from '../../models';
import { RuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectRepository
  extends Repository<ProjectEntity, { user?: UserEntity | null }> {
  create(
    attributes: Project_BuiltAttributes
  ): Result<RuntimeError, ProjectEntity>;
  update(
    attributes: Project_DraftAttributes
  ): Result<RuntimeError, ProjectEntity>;
  destroy(
    attributes: Project_RemoveAttributes
  ): Result<RuntimeError, ProjectEntity>;
}
