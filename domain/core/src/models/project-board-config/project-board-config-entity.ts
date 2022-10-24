import type {
  ProjectBoardConfig_Attributes,
  ProjectBoardConfig_Record,
} from './project-board-config-interfaces';

const fromRecord = (
  record: ProjectBoardConfig_Record
): ProjectBoardConfig_Attributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

export type ProjectBoardConfigEntity = ProjectBoardConfig_Attributes & {};

export function ProjectBoardConfigEntity(
  item: ProjectBoardConfig_Attributes
): ProjectBoardConfigEntity {
  return {
    ...item,
  };
}

ProjectBoardConfigEntity.fromRecord = fromRecord;
