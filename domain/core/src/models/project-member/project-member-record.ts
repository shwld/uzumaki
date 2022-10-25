import type {
  ProjectMember_Record,
  ProjectMember_BuildValidInput,
  ProjectMember_EditValidInput,
  ProjectMember_RemoveValidInput,
} from './project-member-interfaces';

const fieldsFromBuildInput = (
  attributes: ProjectMember_BuildValidInput
): Omit<ProjectMember_Record, 'createdAt' | 'updatedAt'> => {
  return {
    id: attributes.id,
    userId: attributes.userId,
    projectId: attributes.projectId,
    role: attributes.role,
  };
};

const fieldsFromEditInput = (
  attributes: ProjectMember_EditValidInput
): Pick<ProjectMember_Record, 'role'> => {
  const { __state, ...record } = attributes;
  return record;
};

const fieldsFromRemoveInput = (
  attributes: ProjectMember_RemoveValidInput
): Pick<ProjectMember_Record, 'projectId' | 'userId'> => {
  const { __state, ...record } = attributes;
  return record;
};

export function ProjectMemberRecord() {
  return {};
}

ProjectMemberRecord.fieldsFromBuildInput = fieldsFromBuildInput;
ProjectMemberRecord.fieldsFromEditInput = fieldsFromEditInput;
ProjectMemberRecord.fieldsFromRemoveInput = fieldsFromRemoveInput;
