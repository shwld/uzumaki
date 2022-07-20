import { StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  forwardRef,
  HStack,
  ListIcon,
  ListItem,
  ListItemProps,
  Text,
} from '@chakra-ui/react';
import { useState, FC, MouseEventHandler } from 'react';
import {
  ProjectBoard_StoryFragment,
  useStoryItem_EstimateStoryMutation,
} from '~/graphql/generated/graphql';
import { StoryUpdateForm } from '../StoryUpdateForm';

const EstimateSelector: FC<{ storyId: string }> = ({ storyId }) => {
  const [mutationResult, mutate] = useStoryItem_EstimateStoryMutation();

  const handleClick =
    (points: number): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
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

export const StoryItem = forwardRef<
  ListItemProps & { story: ProjectBoard_StoryFragment },
  'li'
>(({ story, ...props }, ref) => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      {!opened && (
        <ListItem
          borderBottom="1px"
          borderColor="gray.200"
          py={1}
          px={2}
          onClick={() => setOpened(true)}
          {...props}
          ref={ref}
        >
          <HStack justify="space-between">
            <HStack>
              <ListIcon as={StarIcon} color="green.400" />
              <Text fontSize="sm" color="gray.400" w={5}>
                {story.points}
              </Text>
              <Text fontSize="md">
                {story.title}
                <br />
                {story.id}
                <br />
                {story.priority}
              </Text>
            </HStack>
            <HStack justify="flex-end">
              {!story.isUnEstimated && <EstimateSelector storyId={story.id} />}
              {story.isUnEstimated && <Badge>{story.state}</Badge>}
              <Checkbox />
            </HStack>
          </HStack>
        </ListItem>
      )}
      {opened && (
        <StoryUpdateForm
          projectId={story.projectId}
          storyId={story.id}
          onClose={() => setOpened(false)}
        />
      )}
    </>
  );
});
