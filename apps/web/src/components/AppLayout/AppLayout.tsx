import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  Button,
  Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { IoIosHome, IoIosLogOut, IoMdPerson } from 'react-icons/io';
import Router from 'next/router';
import { useAppLayout_UserQuery } from './AppLayout.generated';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signOuting, setSignOuting] = useState(false);
  const [{ data }] = useAppLayout_UserQuery();
  const executeSignOut = async () => {
    setSignOuting(true);
    try {
      await signOut();
    } finally {
      setSignOuting(false);
    }
  };
  const avatarImageUrl = data?.viewer?.profile.avatarImageUrl;
  return (
    <>
      <Box bg={useColorModeValue('blue.200', 'gray.900')} px={4}>
        <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={avatarImageUrl} />
              </MenuButton>
              <MenuList>
                <MenuItem
                  icon={<Icon as={IoMdPerson} />}
                  onClick={() => Router.push('/user/edit')}
                >
                  User
                </MenuItem>
                <MenuItem
                  icon={<Icon as={IoIosHome} />}
                  onClick={() => Router.push('/accounts')}
                >
                  Accounts
                </MenuItem>
                <MenuItem
                  icon={<Icon as={IoIosLogOut} />}
                  disabled={signOuting}
                  onClick={executeSignOut}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}></Stack>
          </Box>
        ) : null}
      </Box>

      {children}
    </>
  );
};

export default AppLayout;
