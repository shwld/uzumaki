import type {
  ProjectMemberInvitation_Record,
  ProjectMemberInvitation_EditValidInput,
} from './project-member-invitation-interfaces';

const fieldsFromEditInput = (
  attributes: ProjectMemberInvitation_EditValidInput
): Pick<ProjectMemberInvitation_Record, 'role'> => {
  const { __state, ...record } = attributes;
  return record;
};

export function ProjectMemberInvitationRecord() {
  return {};
}

ProjectMemberInvitationRecord.fieldsFromEditInput = fieldsFromEditInput;
