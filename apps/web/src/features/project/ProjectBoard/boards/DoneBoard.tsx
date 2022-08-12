import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { StoryCard, StoryCardHead } from '../components/StoryCard';
import { StoryItem } from '../components/StoryItem';
import { ProjectBoard_StoryFragment } from '../ProjectBoard.generated';

export const DoneBoard: FC<{
  stories: ProjectBoard_StoryFragment[];
}> = ({ stories }) => {
  return (
    <StoryCard reverse>
      <StoryCardHead title="Done" />
      {stories.map(story => (
        <StoryItem key={story.id} story={story} />
      ))}
    </StoryCard>
  );
};
