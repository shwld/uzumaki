import { InvalidAttributesError } from '../../shared/error';
import type {
  ProjectMemberInvitation_Attributes,
  ProjectMemberInvitation_BuildInput,
  ProjectMemberInvitation_BuildValidInput,
  ProjectMemberInvitation_EditInput,
  ProjectMemberInvitation_EditValidInput,
  ProjectMemberInvitation_RemoveValidInput,
} from './project-member-invitation-interfaces';
import {
  validateOnBuild,
  validateOnEdit,
} from './project-member-invitation-validator';
import { pipe, Result } from '../../shared/functional';

const build = (
  input: ProjectMemberInvitation_BuildInput
): Result<InvalidAttributesError, ProjectMemberInvitation_BuildValidInput> => {
  return pipe(input, validateOnBuild);
};

const edit =
  (input: Partial<ProjectMemberInvitation_EditInput>) =>
  (
    item: ProjectMemberInvitation_Attributes
  ): Result<InvalidAttributesError, ProjectMemberInvitation_EditValidInput> => {
    const newRecord: ProjectMemberInvitation_EditInput = {
      membershipId: item.membershipId,
      projectId: item.projectId,
      role: item.role,
      email: item.email,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(newRecord, validateOnEdit);
  };

const remove = (
  item: ProjectMemberInvitation_Attributes
): ProjectMemberInvitation_RemoveValidInput => {
  return { ...item, __state: 'Removing' };
};

export const ProjectMemberInvitationMutations = {
  build,
  edit,
  remove,
};
