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
import { useState, FC } from 'react';
import { ProjectBoardStoryFragment } from '~/graphql/generated/graphql';
import { StoryUpdateForm } from '../StoryUpdateForm';

const EstimateSelector: FC = () => {
  return (
    <HStack>
      <ButtonGroup size="xs" isAttached variant="ghost">
        <Button>1</Button>
        <Button>3</Button>
        <Button>8</Button>
        <Button>20</Button>
        <Button>40</Button>
      </ButtonGroup>
    </HStack>
  );
};

export const StoryItem = forwardRef<
  ListItemProps & { story: ProjectBoardStoryFragment },
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
              {story.isUnEstimated && <EstimateSelector />}
              {!story.isUnEstimated && <Badge>{story.state}</Badge>}
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
