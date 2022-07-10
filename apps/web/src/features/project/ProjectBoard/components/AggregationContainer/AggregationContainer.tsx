import { CalendarIcon } from '@chakra-ui/icons';
import { HStack, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { ComponentProps, FC } from 'react';
import { ProjectBoardStoryFragment } from '~/graphql/generated/graphql';

export const AggregationContainer: FC<
  {
    currentVelocity: number;
    startDate: Date;
    iterationLengthInWeek?: number;
    stories: ProjectBoardStoryFragment[];
    renderStoryItem(
      story: ProjectBoardStoryFragment,
      index: number
    ): JSX.Element;
  } & Omit<ComponentProps<typeof ListIcon>, 'children'>
> = ({ currentVelocity, stories, renderStoryItem, ...props }) => {
  return (
    <>
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
            0 of 7 points
          </Text>
          <HStack align="center"></HStack>
        </HStack>
      </ListItem>
      {stories.map(renderStoryItem)}
    </>
  );
};
