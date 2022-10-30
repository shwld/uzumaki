import { Aggregates } from 'core-domain';
import { create } from './project-create';
import { destroy } from './project-destroy';
import { findBy } from './project-find-by';
import { findMany } from './project-find-many';
import { update } from './project-update';

export const ProjectRepository: Aggregates['project'] = {
  create,
  update,
  destroy,
  findBy,
  findMany,
};
