import { Aggregates } from 'core-domain';
import { create } from './project-member-create';
import { destroy } from './project-member-destroy';
import { find } from './project-member-find';
import { findBy } from './project-member-find-by';
import { findByUser } from './project-member-find-by-user';
import { findByUserOrError } from './project-member-find-by-user-or-error';
import { findMany } from './project-member-find-many';
import { update } from './project-member-update';

export const ProjectMemberRepository: Aggregates['projectMember'] = {
  create,
  update,
  destroy,
  find,
  findBy,
  findMany,
  findByUser,
  findByUserOrError,
};
