import type {
  ProjectMemberInvitationToken_Attributes,
  ProjectMemberInvitationToken_Record,
} from './project-member-invitation-token-interfaces';

const fromRecord = (
  record: ProjectMemberInvitationToken_Record
): ProjectMemberInvitationToken_Attributes => {
  return {
    __state: 'Validated',
    ...record,
  };
};

export type ProjectMemberInvitationTokenEntity =
  ProjectMemberInvitationToken_Attributes & {
    readonly confirmationToken: string;
    isExpired(): boolean;
  };

export function ProjectMemberInvitationTokenEntity(
  item: ProjectMemberInvitationToken_Attributes
): ProjectMemberInvitationTokenEntity {
  return {
    ...item,
    get confirmationToken(): string {
      return item.id;
    },

    isExpired(): boolean {
      return item.expiredAt < new Date();
    },
  };
}

ProjectMemberInvitationTokenEntity.fromRecord = fromRecord;
