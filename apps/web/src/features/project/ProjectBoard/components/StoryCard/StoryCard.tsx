import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  HStack,
  IconButton,
  BoxProps,
  forwardRef,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { ComponentProps, FC, ReactNode } from 'react';

export const StoryCardHead: FC<
  { title: string; children?: ReactNode; onCloseClick(): void } & Omit<
    ComponentProps<typeof ListIcon>,
    'children'
  >
> = ({ title, children, onCloseClick, ...props }) => {
  return (
    <ListItem
      borderBottom="1px"
      backgroundColor="blue.800"
      py={1}
      pr={2}
      pl={1}
      {...props}
    >
      <HStack justify="space-between" align="center">
        <HStack align="center">
          <IconButton
            aria-label=""
            variant="ghost"
            size="sm"
            icon={<CloseIcon color="white" />}
            onClick={onCloseClick}
          />
          {children}
        </HStack>
        <Text color="gray.100">{title}</Text>
      </HStack>
    </ListItem>
  );
};

export const StoryCard = forwardRef<BoxProps & { reverse?: boolean }, 'div'>(
  ({ children, reverse = false, ...props }, ref) => {
    return (
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflowY="scroll"
        {...props}
        ref={ref}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <List flexDirection={reverse ? 'column-reverse' : undefined}>
          {children}
        </List>
      </Box>
    );
  }
);
