import { Box, BoxProps, Button, Heading, Text } from '@chakra-ui/react';
import { generateId } from 'core-domain';
import Link from 'next/link';
import { FC } from 'react';
import {
  useProjectInvitationConfirmationQuery,
  useProjectInvitationConfirmation_JoinProjectMemberMutation,
} from './ProjectInvitationConfirmation.generated';

export const ProjectInvitationConfirmation: FC<
  { projectId: string; confirmationToken: string } & BoxProps
> = ({ projectId, confirmationToken, ...props }) => {
  const [{ data, fetching, error }, refetch] =
    useProjectInvitationConfirmationQuery({
      variables: { projectId, confirmationToken },
    });
  const [result, join] =
    useProjectInvitationConfirmation_JoinProjectMemberMutation();

  if (fetching) return <></>;
  if (error != null) return <></>;
  const invitationToken = data?.viewer?.invitationToken;
  if (invitationToken == null) return <></>;

  const canAccessProject = data?.viewer?.project != null;
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...props}>
      <Heading fontSize="xl">
        Invite from {invitationToken.invitation.projectName}
      </Heading>
      {canAccessProject && (
        <>
          <Text>You are already member</Text>
          <Link href={`/projects/${projectId}`}>
            <Text color="green" cursor="pointer">
              GO TO PROJECT
            </Text>
          </Link>
        </>
      )}
      {!canAccessProject && (
        <Button
          colorScheme="green"
          w="full"
          mt="5"
          disabled={result.fetching}
          onClick={async () => {
            await join({
              input: {
                memberId: generateId(),
                confirmationToken,
              },
            });
            refetch();
          }}
        >
          ACCEPT INVITATION
        </Button>
      )}
    </Box>
  );
};
