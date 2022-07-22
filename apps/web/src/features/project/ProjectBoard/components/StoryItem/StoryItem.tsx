import { StarIcon } from '@chakra-ui/icons';
import {
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  forwardRef,
  HStack,
  ListIcon,
  ListItem,
  ListItemProps,
  Text,
} from '@chakra-ui/react';
import { useState, FC, MouseEventHandler, useMemo } from 'react';
import {
  ProjectBoard_StoryFragment,
  useStoryItem_EstimateStoryMutation,
} from '~/graphql/generated/graphql';
import { StoryUpdateForm } from '../StoryUpdateForm';
import { StoryStateUpdateButton } from './components/StoryStateUpdateButton';

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
  const [hovering, setHovering] = useState(false);
  return (
    <>
      {!opened && (
        <ListItem
          position="relative"
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
              <Text fontSize="md">{story.title}</Text>
            </HStack>
            <HStack justify="flex-end">
              {!story.isUnEstimated && <EstimateSelector storyId={story.id} />}
              {story.isUnEstimated && (
                <Badge cursor="pointer" onMouseEnter={() => setHovering(true)}>
                  {story.state}
                </Badge>
              )}
              <Checkbox />
            </HStack>
          </HStack>
          {hovering && (
            <Flex
              position="absolute"
              top={0}
              right={5}
              left={0}
              bottom={0}
              justify="flex-end"
              align="center"
              p="1"
              gap={2}
            >
              <StoryStateUpdateButton
                storyId={story.id}
                state={story.state}
                onMouseLeave={() => setHovering(false)}
              />
            </Flex>
          )}
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
