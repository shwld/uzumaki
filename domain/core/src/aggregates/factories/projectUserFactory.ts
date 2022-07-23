import {
  ProjectEntity,
  ProjectUserEntity,
  UpdatableProjectUserEntityFields,
  UserEntity,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildProjectUser = ({
  project,
  user,
  ...projectUserParams
}: UpdatableProjectUserEntityFields & {
  project: ProjectEntity;
  user: UserEntity;
}): ProjectUserEntity => {
  return new ProjectUserEntity({
    ...generateTimeStampProperties(),
    ...projectUserParams,
    projectId: project.id,
    userId: user.id,
    name: user.name,
    isDeleted: false,
  });
};
