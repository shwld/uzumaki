import type {
  Project_BuiltAttributes,
  Project_DraftAttributes,
  Project_RemoveAttributes,
  ProjectEntity,
} from '../../models';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectRepository extends Repository<ProjectEntity, {}> {
  create(
    attributes: Project_BuiltAttributes
  ): Result<RepositoryRuntimeError, ProjectEntity>;
  update(
    attributes: Project_DraftAttributes
  ): Result<RepositoryRuntimeError, ProjectEntity>;
  destroy(
    attributes: Project_RemoveAttributes
  ): Result<RepositoryRuntimeError, ProjectEntity>;
}
