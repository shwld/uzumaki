import { InvalidAttributesError } from '../../shared/error';
import type {
  ProjectMember_Attributes,
  ProjectMember_BuildInput,
  ProjectMember_BuildValidInput,
  ProjectMember_EditInput,
  ProjectMember_EditValidInput,
  ProjectMember_RemoveValidInput,
} from './project-member-interfaces';
import { validateOnBuild, validateOnEdit } from './project-member-validator';
import { pipe, Result } from '../../shared/functional';

const build = (
  input: ProjectMember_BuildInput
): Result<InvalidAttributesError, ProjectMember_BuildValidInput> => {
  return pipe(input, validateOnBuild);
};

const edit =
  (input: Partial<ProjectMember_EditInput>) =>
  (
    item: ProjectMember_Attributes
  ): Result<InvalidAttributesError, ProjectMember_EditValidInput> => {
    const newRecord: ProjectMember_EditInput = {
      projectId: item.projectId,
      userId: item.userId,
      role: item.role,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(newRecord, validateOnEdit);
  };

const remove = (
  item: ProjectMember_Attributes
): ProjectMember_RemoveValidInput => {
  return { ...item, __state: 'Removing' };
};

export const ProjectMemberMutations = {
  build,
  edit,
  remove,
};
