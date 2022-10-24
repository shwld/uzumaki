import type {
  ProjectBoardStatus_Attributes,
  ProjectBoardStatus_Record,
} from './project-board-status-interfaces';

const fromRecord = (
  record: ProjectBoardStatus_Record
): ProjectBoardStatus_Attributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

export type ProjectBoardStatusEntity = ProjectBoardStatus_Attributes & {};

export function ProjectBoardStatusEntity(
  item: ProjectBoardStatus_Attributes
): ProjectBoardStatusEntity {
  return {
    ...item,
  };
}

ProjectBoardStatusEntity.fromRecord = fromRecord;
