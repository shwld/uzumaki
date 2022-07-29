import { Container } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AppLayout from '~/components/AppLayout/AppLayout';
import { ProjectInvitationConfirmation } from '~/features/project/ProjectInvitationConfirmation/ProjectInvitationConfirmation';
import { withGraphQLClient } from '~/graphql/withGraphQLClient';

function Project() {
  useSession({ required: true });
  const router = useRouter();
  const { id, token } = router.query;
  return (
    <AppLayout>
      <Container>
        <ProjectInvitationConfirmation
          projectId={id as string}
          confirmationToken={token as string}
          mt="5"
        />
      </Container>
    </AppLayout>
  );
}

export default withGraphQLClient(Project, { ssr: true });
