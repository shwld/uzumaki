import { Aggregates } from 'core-domain';
import { create } from './project-member-create';
import { destroy } from './project-member-destroy';
import { findBy } from './project-member-find-by';
import { findMany } from './project-member-find-many';
import { update } from './project-member-update';

export const ProjectMemberRepository: Aggregates['projectMember'] = {
  create,
  update,
  destroy,
  findBy,
  findMany,
};
