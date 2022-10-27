import { build } from './build-project-member';
import { edit } from './edit-project-member';
import { remove } from './remove-project-member';
export type {
  ProjectMember_BuildInput,
  ProjectMember_BuiltAttributes,
} from './build-project-member';
export type {
  ProjectMember_EditInput,
  ProjectMember_DraftAttributes,
} from './edit-project-member';
export type { ProjectMember_RemoveAttributes } from './remove-project-member';

export const ProjectMemberMutations = {
  build,
  edit,
  remove,
};
