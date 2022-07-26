import {
  ProjectEntity,
  ProjectMemberEntity,
  UpdatableProjectMemberEntityFields,
  UserEntity,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildProjectMember = ({
  project,
  user,
  ...projectMemberParams
}: UpdatableProjectMemberEntityFields & {
  id: string;
  project: ProjectEntity;
  user: UserEntity;
}): ProjectMemberEntity => {
  return new ProjectMemberEntity({
    ...generateTimeStampProperties(),
    ...projectMemberParams,
    projectId: project.id,
    userId: user.id,
    name: user.name,
    avatarImageUrl: user.avatarImageUrl,
    isDeleted: false,
  });
};
