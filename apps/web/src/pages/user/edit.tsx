import { Container, Stack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import AppLayout from '~/components/AppLayout/AppLayout';
import { ProfileForm } from '~/features/user/ProfileForm';
import { withGraphQLClient } from '~/graphql/withGraphQLClient';

function User() {
  useSession({ required: true });
  return (
    <AppLayout>
      <Container>
        <Stack flexGrow={3} my={3}>
          <ProfileForm />
        </Stack>
      </Container>
    </AppLayout>
  );
}

export default withGraphQLClient(User, { ssr: true });
