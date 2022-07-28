import {
  ProjectEntity,
  ProjectInvitationEntity,
  UpdatableProjectInvitationEntityFields,
} from '../../models';
import { generateTimeStampProperties } from '../../shared/entity';

export const buildProjectInvitation = ({
  project,
  ...projectInvitationParams
}: UpdatableProjectInvitationEntityFields & {
  id: string;
  project: ProjectEntity;
}): ProjectInvitationEntity => {
  return new ProjectInvitationEntity({
    ...generateTimeStampProperties(),
    ...projectInvitationParams,
    isDeleted: false,
    projectId: project.id,
  });
};
