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
import { IoIosHome, IoIosLogOut } from 'react-icons/io';
import Router from 'next/router';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signOuting, setSignOuting] = useState(false);
  const executeSignOut = async () => {
    setSignOuting(true);
    try {
      await signOut();
    } finally {
      setSignOuting(false);
    }
  };
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
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
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
