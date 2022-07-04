import { Button, ListItem, UnorderedList } from '@chakra-ui/react';
import { ReactNode, FC, useState } from 'react';
import { AccountUpdateForm } from '../AccountUpdateForm';
import { useAccountListQuery } from './AccountList.generated';

export const AccountList: FC<{ children?: ReactNode }> = () => {
  const [cursor, setCursor] = useState('');
  const [result] = useAccountListQuery({ variables: { cursor } });

  const accounts =
    result.data?.viewer?.accounts.edges?.map((it) => it?.node!) ?? [];
  const { hasNextPage, endCursor } =
    result.data?.viewer?.accounts.pageInfo ?? {};

  return (
    <UnorderedList>
      {accounts.map((account) => (
        <ListItem key={account.id}>
          <AccountUpdateForm
            defaultValues={{ id: account.id, name: account.name }}
          />
        </ListItem>
      ))}
      {hasNextPage && (
        <Button
          onClick={() => {
            endCursor != null && setCursor(endCursor);
          }}
        >
          More
        </Button>
      )}
    </UnorderedList>
  );
};
