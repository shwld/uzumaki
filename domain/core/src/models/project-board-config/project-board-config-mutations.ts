import { InvalidAttributesError } from '../../shared/error';
import type {
  ProjectBoardConfig_Attributes,
  ProjectBoardConfig_EditInput,
  ProjectBoardConfig_EditValidInput,
} from './project-board-config-interfaces';
import { validateOnEdit } from './project-board-config-validator';
import { pipe, Result } from '../../shared/functional';

const edit =
  (input: Partial<ProjectBoardConfig_EditInput>) =>
  (
    item: ProjectBoardConfig_Attributes
  ): Result<InvalidAttributesError, ProjectBoardConfig_EditValidInput> => {
    const newRecord: ProjectBoardConfig_EditInput = {
      id: item.id,
      initialVelocity: item.initialVelocity,
      startOn: item.startOn,
      startIterationOn: item.startIterationOn,
      iterationLength: item.iterationLength,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(newRecord, validateOnEdit);
  };

export const ProjectBoardConfigMutations = {
  edit,
};
