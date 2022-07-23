import { Avatar, Table, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { filterOfPresence } from '~/shared/functions/filterOfPresence';
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
  return (
    <TableContainer>
      <Table variant="simple">
        <Tbody>
          {projectMembers.map(member => (
            <Tr key={member.id}>
              <Td>
                <Avatar size={'sm'} src={member.avatarImageUrl} />
              </Td>
              <Td>{member.name}</Td>
              <Td>{member.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
