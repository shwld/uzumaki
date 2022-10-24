import type {
  ProjectBoardStatus_Record,
  ProjectBoardStatus_EditValidInput,
} from './project-board-status-interfaces';

const fieldsFromEditInput = (
  attributes: ProjectBoardStatus_EditValidInput
): Pick<ProjectBoardStatus_Record, 'velocity'> => {
  const { __state, ...record } = attributes;
  return record;
};

export function ProjectBoardStatusRecord() {
  return {};
}

ProjectBoardStatusRecord.fieldsFromEditInput = fieldsFromEditInput;
