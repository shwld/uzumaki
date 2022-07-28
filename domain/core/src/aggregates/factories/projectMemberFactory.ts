import {
  ProjectMemberEntity,
  ProjectMemberInvitationEntity,
  UpdatableProjectMemberEntityFields,
  UserEntity,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildProjectMember = ({
  invitation,
  user,
  ...projectMemberParams
}: UpdatableProjectMemberEntityFields & {
  id: string;
  invitation: ProjectMemberInvitationEntity;
  user: UserEntity;
}): ProjectMemberEntity => {
  return new ProjectMemberEntity({
    ...generateTimeStampProperties(),
    ...projectMemberParams,
    projectId: invitation.projectId,
    userId: user.id,
    name: user.name,
    avatarImageUrl: user.avatarImageUrl,
    isDeleted: false,
  });
};
