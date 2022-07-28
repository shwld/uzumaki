import {
  ProjectEntity,
  ProjectMemberInvitationEntity,
  UpdatableProjectMemberInvitationEntityFields,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildProjectMemberInvitation = ({
  project,
  ...projectMemberInvitationParams
}: UpdatableProjectMemberInvitationEntityFields & {
  id: string;
  project: ProjectEntity;
}): ProjectMemberInvitationEntity => {
  return new ProjectMemberInvitationEntity({
    ...generateTimeStampProperties(),
    ...projectMemberInvitationParams,
    isDeleted: false,
    projectId: project.id,
  });
};
