import { Button, ButtonGroup, ButtonGroupProps } from '@chakra-ui/react';
import { FC } from 'react';
import { StoryState } from '~/graphql/generated/graphql';
import { useNextStateButton } from './hooks';
import { useStoryStateUpdateButton_UpdateStoryStateMutation } from './StoryStateUpdateButton.generated';

export const StoryStateUpdateButton: FC<
  {
    storyId: string;
    state: StoryState;
  } & ButtonGroupProps
> = ({ storyId, state, ...props }) => {
  const nextState = useNextStateButton(state);
  const [result, update] = useStoryStateUpdateButton_UpdateStoryStateMutation();

  return (
    <ButtonGroup {...props}>
      {nextState.state != null && (
        <Button
          size="sm"
          isLoading={result.fetching}
          colorScheme={nextState.color}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            update({
              input: {
                id: storyId,
                state: nextState.state!,
              },
            });
          }}
        >
          {nextState.label}
        </Button>
      )}
      {state === StoryState.Delivered && (
        <Button
          size="sm"
          isLoading={result.fetching}
          colorScheme="red"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            update({
              input: {
                id: storyId,
                state: StoryState.Rejected,
              },
            });
          }}
        >
          Reject
        </Button>
      )}
    </ButtonGroup>
  );
};
