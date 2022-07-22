import {
  Box,
  BoxProps,
  Flex,
  HStack,
  Text,
  TextProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import ActiveLink from '~/components/ActiveLink/ActiveLink';

const TabMenu: FC<{ isActive?: boolean; children: ReactNode } & TextProps> = ({
  isActive,
  children,
  ...props
}) => (
  <Text
    borderBottom={isActive ? '2px' : '0'}
    borderBottomColor="blue"
    px="1"
    cursor="pointer"
    {...props}
  >
    {children}
  </Text>
);

export const ProjectTabMenus: FC<{ projectId: string } & BoxProps> = ({
  projectId,
  ...props
}) => {
  return (
    <Box
      bg={useColorModeValue('blue.200', 'gray.900')}
      px={4}
      mb={2}
      {...props}
    >
      <Flex h={6} alignItems={'center'} justifyContent={'space-between'}>
        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
          <ActiveLink href={`/projects/${projectId}`}>
            <TabMenu>STORIES</TabMenu>
          </ActiveLink>
          <ActiveLink href={`/projects/${projectId}/members`}>
            <TabMenu>MEMBERS</TabMenu>
          </ActiveLink>
        </HStack>
      </Flex>
    </Box>
  );
};
