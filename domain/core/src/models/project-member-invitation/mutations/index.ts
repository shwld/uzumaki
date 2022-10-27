import { build } from './build-project-member-invitation';
import { edit } from './edit-project-member-invitation';
import { remove } from './remove-project-member-invitation';
export type {
  ProjectMemberInvitation_BuildInput,
  ProjectMemberInvitation_BuiltAttributes,
} from './build-project-member-invitation';
export type {
  ProjectMemberInvitation_EditInput,
  ProjectMemberInvitation_DraftAttributes,
} from './edit-project-member-invitation';
export type { ProjectMemberInvitation_RemoveAttributes } from './remove-project-member-invitation';

export const ProjectMemberInvitationMutations = {
  build,
  edit,
  remove,
};
