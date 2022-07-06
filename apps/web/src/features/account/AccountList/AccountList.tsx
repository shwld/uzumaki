import { Button, Box, Flex, UnorderedList, Text } from '@chakra-ui/react';
import { ReactNode, FC, useState, Fragment } from 'react';
import { ProjectCreateButton } from '~/features/project/ProjectCreateButton';
import { AccountUpdateButton } from '../AccountUpdateButton';
import { useAccountListQuery } from './AccountList.generated';
import Link from 'next/link';

export const AccountList: FC<{ children?: ReactNode }> = () => {
  const [cursor, setCursor] = useState('');
  const [result] = useAccountListQuery({ variables: { cursor } });

  const accounts =
    result.data?.viewer?.accounts.edges?.map((it) => it?.node!) ?? [];
  const { hasNextPage, endCursor } =
    result.data?.viewer?.accounts.pageInfo ?? {};

  return (
    <UnorderedList aria-label="Account list">
      {accounts.map((account) => (
        <Box key={account.id} borderWidth="1px">
          <Box bgColor="black" p={3}>
            <Flex justify="space-between" alignItems="center">
              <Text color="white">{account.name}</Text>
              <AccountUpdateButton
                defaultValues={{ id: account.id, name: account.name }}
              />
            </Flex>
          </Box>
          {account.projects.edges?.map((project) => (
            <Fragment key={project?.node?.id}>
              {project?.node != null && (
                <Box bgColor="gray" p={3}>
                  <Flex justify="space-between" alignItems="center">
                    <Link href={`/projects/${project.node.id}`}>
                      <a>
                        <Text>{project.node.name}</Text>
                      </a>
                    </Link>
                  </Flex>
                </Box>
              )}
            </Fragment>
          ))}
          <ProjectCreateButton accountId={account.id} />
        </Box>
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
