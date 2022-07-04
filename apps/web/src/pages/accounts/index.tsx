import { Container, Flex, Stack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import AppLayout from '~/components/AppLayout/AppLayout';
import { AccountCreateButton } from '~/features/account/AccountCreateButton';
import { AccountList } from '~/features/account/AccountList';
import { withGraphQLClient } from '~/graphql/withGraphQLClient';

function Accounts() {
  useSession({ required: true });
  return (
    <AppLayout>
      <Container>
        <Stack flexGrow={3} my={3}>
          <Flex justify="flex-end">
            <AccountCreateButton />
          </Flex>
          <AccountList />
        </Stack>
      </Container>
    </AppLayout>
  );
}

export default withGraphQLClient(Accounts, { ssr: true });
