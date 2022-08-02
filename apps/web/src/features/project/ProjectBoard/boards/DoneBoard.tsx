import { FC } from 'react';
import { StoryCard, StoryCardHead } from '../components/StoryCard';
import { StoryItem } from '../components/StoryItem';
import { ProjectBoard_StoryFragment } from '../ProjectBoard.generated';

export const DoneBoard: FC<{
  stories: ProjectBoard_StoryFragment[];
}> = ({ stories }) => {
  return (
    <StoryCard>
      <StoryCardHead title="Done" />
      {stories.map(story => (
        <StoryItem key={story.id} story={story} />
      ))}
    </StoryCard>
  );
};
