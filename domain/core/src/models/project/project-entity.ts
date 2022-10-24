import type { Project_Attributes, Project_Record } from './project-interfaces';

const fromRecord = (record: Project_Record): Project_Attributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

export type ProjectEntity = Project_Attributes & {};

export function ProjectEntity(item: Project_Attributes): ProjectEntity {
  return {
    ...item,
  };
}

ProjectEntity.fromRecord = fromRecord;
