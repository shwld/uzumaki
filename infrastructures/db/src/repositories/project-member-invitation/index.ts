import { Aggregates } from 'core-domain';
import { create } from './project-member-invitation-create';
import { destroy } from './project-member-invitation-destroy';
import { find } from './project-member-invitation-find';
import { findBy } from './project-member-invitation-find-by';
import { findMany } from './project-member-invitation-find-many';
import { update } from './project-member-invitation-update';

export const ProjectMemberInvitationRepository: Aggregates['projectMemberInvitation'] =
  {
    create,
    update,
    destroy,
    find,
    findBy,
    findMany,
  };
