import { FC } from 'react';
import { HStack, ListItemProps, ListItem, Text } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';

export const SummaryOfPeriod: FC<
  {
    points: number;
    startDate: Date;
    iterationLength: number;
  } & Omit<ListItemProps, 'children'>
> = ({ points, startDate, iterationLength, ...props }) => {
  const endDate = dayjs(startDate).add(iterationLength, 'weeks');
  return (
    <ListItem
      borderBottom="1px"
      backgroundColor="blue.600"
      py={0}
      px={2}
      {...props}
    >
      <HStack justify="space-between" align="center">
        <HStack align="center">
          <CalendarIcon color="gray.100" />
          <Text color="gray.100" fontSize="sm">
            {points} points
          </Text>
        </HStack>
        <HStack align="center">
          <Text color="gray.100" fontSize="sm">
            {dayjs(startDate).format('DD MMM')} -{' '}
            {dayjs(endDate).format('DD MMM')}
          </Text>
        </HStack>
      </HStack>
    </ListItem>
  );
};
