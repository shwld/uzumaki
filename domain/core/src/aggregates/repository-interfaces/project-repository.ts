import type {
  User_ValidAttributes,
  Project_BuiltAttributes,
  Project_DraftAttributes,
  Project_RemoveAttributes,
  Project_ValidAttributes,
} from '../../models';
import { RepositoryRuntimeError, Result } from '../../shared';
import { Repository } from './base';

export interface ProjectRepository
  extends Repository<Project_ValidAttributes, {}> {
  create(
    attributes: Project_BuiltAttributes
  ): Result<RepositoryRuntimeError, Project_ValidAttributes>;
  update(
    attributes: Project_DraftAttributes
  ): Result<RepositoryRuntimeError, Project_ValidAttributes>;
  destroy(
    attributes: Project_RemoveAttributes
  ): Result<RepositoryRuntimeError, Project_ValidAttributes>;
}
