import { Center, useDisclosure } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from 'ui';
import AppLayout from '~/components/AppLayout/AppLayout';
import { AccountCreateButton } from '~/features/account/AccountCreateButton';
import { AccountList } from '~/features/account/AccountList';

function Accounts() {
  useSession({ required: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <AppLayout>
      <Center>
        <AccountCreateButton />
        <AccountList />
      </Center>
    </AppLayout>
  );
}

export default Accounts;
