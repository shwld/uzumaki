import { FC } from 'react';
import { Text } from '@chakra-ui/react';
import { Story, StoryKind } from '~/graphql/generated/graphql';

export const StoryPoints: FC<{ story: Pick<Story, 'points' | 'kind'> }> = ({
  story,
}) => {
  if (story.kind !== StoryKind.Feature) return <Text w={5}></Text>;
  return (
    <Text fontSize="sm" color="gray.400" w={5}>
      {story.points}
    </Text>
  );
};
