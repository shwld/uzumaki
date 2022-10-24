import { InvalidAttributesError } from '../../shared/error';
import type {
  Project_Attributes,
  Project_BuildInput,
  Project_BuildValidInput,
  Project_EditInput,
  Project_EditValidInput,
  Project_RemoveValidInput,
} from './project-interfaces';
import { validateOnBuild, validateOnEdit } from './project-validator';
import { pipe, Result } from '../../shared/functional';

const build = (
  input: Project_BuildInput
): Result<InvalidAttributesError, Project_BuildValidInput> => {
  return pipe(input, validateOnBuild);
};

const edit =
  (input: Partial<Project_EditInput>) =>
  (
    item: Project_Attributes
  ): Result<InvalidAttributesError, Project_EditValidInput> => {
    const newRecord: Project_EditInput = {
      id: item.id,
      name: item.name,
      description: item.description,
      privacy: item.privacy,
      ...input,
      __state: 'Unvalidated',
    };
    return pipe(newRecord, validateOnEdit);
  };

const remove = (item: Project_Attributes): Project_RemoveValidInput => {
  return { ...item, __state: 'Removing' };
};

export const ProjectMutations = {
  build,
  edit,
  remove,
};
