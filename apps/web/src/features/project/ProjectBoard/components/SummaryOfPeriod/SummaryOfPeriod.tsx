import { FC } from 'react';
import { HStack, ListItemProps, ListItem, Text } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';

export const SummaryOfPeriod: FC<
  {
    points: number;
    startDate: Date;
  } & Omit<ListItemProps, 'children'>
> = ({ points, startDate, ...props }) => {
  return (
    <ListItem
      borderBottom="1px"
      backgroundColor="blue.600"
      py={0}
      px={2}
      {...props}
    >
      <HStack justify="flex-start" align="center">
        <CalendarIcon color="gray.100" />
        <Text color="gray.100" fontSize="sm">
          {points} points
        </Text>
        <HStack align="center"></HStack>
      </HStack>
    </ListItem>
  );
};
