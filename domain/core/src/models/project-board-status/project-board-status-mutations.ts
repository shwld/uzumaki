import { InvalidAttributesError } from '../../shared/error';
import type {
  ProjectBoardStatus_Attributes,
  ProjectBoardStatus_EditInput,
  ProjectBoardStatus_EditValidInput,
} from './project-board-status-interfaces';
import { validateOnEdit } from './project-board-status-validator';
import { pipe, Result } from '../../shared/functional';

const edit =
  (input: Partial<ProjectBoardStatus_EditInput>) =>
  (
    item: ProjectBoardStatus_Attributes
  ): Result<InvalidAttributesError, ProjectBoardStatus_EditValidInput> => {
    const newRecord: ProjectBoardStatus_EditInput = {
      id: item.id,
      velocity: item.velocity,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(newRecord, validateOnEdit);
  };

export const ProjectBoardStatusMutations = {
  edit,
};
