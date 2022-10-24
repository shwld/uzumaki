import type {
  ProjectBoardConfig_Record,
  ProjectBoardConfig_EditValidInput,
} from './project-board-config-interfaces';

const fieldsFromEditInput = (
  attributes: ProjectBoardConfig_EditValidInput
): Pick<
  ProjectBoardConfig_Record,
  'initialVelocity' | 'startOn' | 'startIterationOn' | 'iterationLength'
> => {
  const { __state, ...record } = attributes;
  return record;
};

export function ProjectBoardConfigRecord() {
  return {};
}

ProjectBoardConfigRecord.fieldsFromEditInput = fieldsFromEditInput;
