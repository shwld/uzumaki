import type {
  ProjectMemberInvitation_Attributes,
  ProjectMemberInvitation_Record,
} from './project-member-invitation-interfaces';

const fromRecord = (
  record: ProjectMemberInvitation_Record
): ProjectMemberInvitation_Attributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

export type ProjectMemberInvitationEntity =
  ProjectMemberInvitation_Attributes & {
    isInviting(): boolean;
    isJoined(): boolean;
  };

export function ProjectMemberInvitationEntity(
  item: ProjectMemberInvitation_Attributes
): ProjectMemberInvitationEntity {
  return {
    ...item,
    isInviting() {
      return item.membershipId == null;
    },
    isJoined() {
      return item.membershipId != null;
    },
  };
}

ProjectMemberInvitationEntity.fromRecord = fromRecord;
