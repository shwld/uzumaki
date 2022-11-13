import { build } from './build-project';
import { edit } from './edit-project';
import { remove } from './remove-project';
export type {
  Project_BuildInput,
  Project_BuiltAttributes,
} from './build-project';
export type {
  Project_EditInput,
  Project_DraftAttributes,
} from './edit-project';
export type { Project_RemoveAttributes } from './remove-project';

export const ProjectMutations = {
  build,
  edit,
  remove,
};
