import {
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  forwardRef,
  HStack,
  ListItem,
  ListItemProps,
  Text,
} from '@chakra-ui/react';
import { useState, FC, MouseEventHandler, useCallback } from 'react';
import {
  ProjectBoard_StoryFragment,
  useStoryItem_EstimateStoryMutation,
} from '~/graphql/generated/graphql';
import { StoryUpdateForm } from '../StoryUpdateForm';
import { StoryIcon } from './components/StoryIcon';
import { StoryPoints } from './components/StoryPoints';
import { StoryStateUpdateButton } from './components/StoryStateUpdateButton';

export const StoryItem = forwardRef<
  ListItemProps & { story: ProjectBoard_StoryFragment },
  'li'
>(({ story, ...props }, ref) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      {!opened && (
        <Story
          story={story}
          {...props}
          onClick={() => setOpened(true)}
          ref={ref}
        />
      )}
      {opened && (
        <StoryUpdateForm
          projectId={story.projectId}
          storyId={story.id}
          onClose={() => setOpened(false)}
          renderOnFetching={
            <Story
              story={story}
              {...props}
              onClick={() => setOpened(true)}
              ref={ref}
            />
          }
        />
      )}
    </>
  );
});

/**
 * PRIVATE
 */

const EstimateSelector: FC<{ storyId: string }> = ({ storyId }) => {
  const [_mutationResult, mutate] = useStoryItem_EstimateStoryMutation();

  const handleClick =
    (points: number): MouseEventHandler<HTMLButtonElement> =>
    e => {
      e.preventDefault();
      e.stopPropagation();
      mutate({
        input: {
          id: storyId,
          points,
        },
      });
    };
  return (
    <HStack>
      <ButtonGroup size="xs" isAttached variant="ghost">
        <Button onClick={handleClick(1)}>1</Button>
        <Button onClick={handleClick(3)}>3</Button>
        <Button onClick={handleClick(8)}>8</Button>
        <Button onClick={handleClick(20)}>20</Button>
        <Button onClick={handleClick(40)}>40</Button>
      </ButtonGroup>
    </HStack>
  );
};

const Story = forwardRef<
  ListItemProps & {
    story: ProjectBoard_StoryFragment;
    onClick(): void;
  },
  'li'
>(({ story, onClick, ...props }, ref) => {
  const [hovering, setHovering] = useState(false);
  return (
    <ListItem
      position="relative"
      borderBottom="1px"
      borderColor="gray.200"
      bgColor={story.isCompleted ? 'green.100' : undefined}
      py={1}
      px={2}
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
      ref={ref}
    >
      <HStack justify="space-between">
        <HStack w="70%">
          <StoryIcon kind={story.kind} />
          <StoryPoints story={story} />
          <Text fontSize="md">{story.title}</Text>
        </HStack>
        <HStack justify="flex-end">
          {!story.isCompleted && (
            <>
              {story.canEstimate && !story.isUnEstimated && (
                <EstimateSelector storyId={story.id} />
              )}
              {(!story.canEstimate || story.isUnEstimated) && (
                <>
                  {!hovering && <Badge cursor="pointer">{story.state}</Badge>}
                  {hovering && (
                    <StoryStateUpdateButton
                      storyId={story.id}
                      state={story.state}
                    />
                  )}
                </>
              )}
            </>
          )}
          <Checkbox />
        </HStack>
      </HStack>
    </ListItem>
  );
});
