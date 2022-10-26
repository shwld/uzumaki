import { build } from './build-project-board-config';
import { edit } from './edit-project-board-config';
import { remove } from './remove-project-board-config';
export type {
  ProjectBoardConfig_BuildInput,
  ProjectBoardConfig_BuiltAttributes,
} from './build-project-board-config';
export type {
  ProjectBoardConfig_EditInput,
  ProjectBoardConfig_DraftAttributes,
} from './edit-project-board-config';
export type { ProjectBoardConfig_RemoveAttributes } from './remove-project-board-config';

export const ProjectBoardConfigMutations = {
  build,
  edit,
  remove,
};
