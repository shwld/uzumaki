import { Container, Flex, Stack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import AppLayout from '~/components/AppLayout/AppLayout';
import { AccountCreateButton } from '~/features/account/AccountCreateButton';
import { AccountList } from '~/features/account/AccountList';
import { withGraphQLClient } from '~/graphql/withGraphQLClient';

function Project() {
  useSession({ required: true });
  return <AppLayout>Project</AppLayout>;
}

export default withGraphQLClient(Project, { ssr: true });
