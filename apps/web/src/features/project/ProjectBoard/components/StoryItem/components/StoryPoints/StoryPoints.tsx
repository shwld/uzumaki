import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { Story } from '~/graphql/generated/graphql';

export const StoryPoints: FC<{
  story: Pick<Story, 'points' | 'canEstimate'>;
}> = ({ story }) => {
  if (story.canEstimate) {
    return (
      <Text fontSize="sm" color="gray.400" w={5}>
        {story.points}
      </Text>
    );
  }
  return <Text w={5}></Text>;
};
