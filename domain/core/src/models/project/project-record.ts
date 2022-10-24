import { generateId } from '../../shared/entity';
import type {
  Project_Record,
  Project_BuildValidInput,
  Project_EditValidInput,
  Project_RemoveValidInput,
} from './project-interfaces';

const fieldsFromBuildInput = (
  attributes: Project_BuildValidInput
): Omit<Project_Record, 'createdAt' | 'updatedAt'> => {
  return {
    id: attributes.id,
    name: attributes.name,
    privacy: attributes.privacy,
    description: attributes.description,
    accountId: attributes.accountId,
    createdById: attributes.createdById,
    boardConfigId: generateId(),
    boardStatusId: generateId(),
  };
};

const fieldsFromEditInput = (
  attributes: Project_EditValidInput
): Pick<Project_Record, 'name' | 'privacy' | 'description'> => {
  const { __state, ...record } = attributes;
  return record;
};

const fieldsFromRemoveInput = (
  attributes: Project_RemoveValidInput
): Pick<Project_Record, 'id'> => {
  const { __state, ...record } = attributes;
  return record;
};

export function ProjectRecord() {
  return {};
}

ProjectRecord.fieldsFromBuildInput = fieldsFromBuildInput;
ProjectRecord.fieldsFromEditInput = fieldsFromEditInput;
ProjectRecord.fieldsFromRemoveInput = fieldsFromRemoveInput;
