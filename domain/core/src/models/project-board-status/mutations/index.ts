import { build } from './build-project-board-status';
import { edit } from './edit-project-board-status';
import { remove } from './remove-project-board-status';
export type {
  ProjectBoardStatus_BuildInput,
  ProjectBoardStatus_BuiltAttributes,
} from './build-project-board-status';
export type {
  ProjectBoardStatus_EditInput,
  ProjectBoardStatus_DraftAttributes,
} from './edit-project-board-status';
export type { ProjectBoardStatus_RemoveAttributes } from './remove-project-board-status';

export const ProjectBoardStatusMutations = {
  build,
  edit,
  remove,
};
