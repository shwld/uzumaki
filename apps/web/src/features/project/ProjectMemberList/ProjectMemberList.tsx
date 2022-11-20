import { Avatar, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { filterOfPresence } from '~/shared/functions/filterOfPresence';
import { ProjectMemberInviteButton } from './components/ProjectMemberInviteButton';
import { useProjectMemberListQuery } from './ProjectMemberList.generated';

export const ProjectMemberList: FC<{ projectId: string }> = ({ projectId }) => {
  const [{ data, fetching, error }] = useProjectMemberListQuery({
    variables: { projectId },
  });
  if (error != null) return <></>;
  if (fetching) return <></>;
  if (data?.viewer?.project == null) return <></>;
  const projectMembers = filterOfPresence(
    data.viewer.project.members.edges?.map(it => it?.node) ?? []
  );
  const invitations = filterOfPresence(
    data.viewer.project.invitations.edges?.map(it => it?.node) ?? []
  );
  return (
    <>
      <ProjectMemberInviteButton projectId={projectId} />
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            {invitations.map(invitation => (
              <Tr key={invitation.id}>
                <Td></Td>
                <Td>{invitation.email}</Td>
                <Td>{invitation.role}</Td>
              </Tr>
            ))}
            {projectMembers.map(member => (
              <Tr key={member.id}>
                <Td>
                  <Avatar size={'sm'} src={member.profile.avatarImageUrl} />
                </Td>
                <Td>{member.profile.name}</Td>
                <Td>{member.role}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
