import { useMemo } from 'react';
import { StoryState } from '~/graphql/generated/graphql';

export function useNextStateButton(state: StoryState): {
  state: StoryState | undefined;
  label: string;
  color: string | undefined;
} {
  const nextState = useMemo(() => {
    const nextState = getNextState(state);
    return {
      state: nextState,
      label: buttonLabel(nextState),
      color: buttonColor(nextState),
    };
  }, [state]);

  return nextState;
}

/**
 * PRIVATE
 */

const ORDERED_STATES: StoryState[] = [
  StoryState.Unstarted,
  StoryState.Started,
  StoryState.Finished,
  StoryState.Delivered,
];

const DISPLAY_STATES: StoryState[] = [...ORDERED_STATES, StoryState.Accepted];

function getNextState(state: StoryState): StoryState | undefined {
  if (state === StoryState.Rejected) {
    return StoryState.Started;
  }
  const index = ORDERED_STATES.indexOf(state);
  if (index !== -1 && DISPLAY_STATES[index + 1] != null) {
    return DISPLAY_STATES[index + 1];
  }
}

function buttonLabel(state: StoryState | undefined): string {
  switch (state) {
    case StoryState.Unstarted: {
    }
    case StoryState.Started: {
      return 'Start';
    }
    case StoryState.Finished: {
      return 'Finish';
    }
    case StoryState.Delivered: {
      return 'Deliver';
    }
    case StoryState.Accepted: {
      return 'Accept';
    }
    default: {
      return '';
    }
  }
}

function buttonColor(state: StoryState | undefined): string | undefined {
  switch (state) {
    case StoryState.Unstarted: {
    }
    case StoryState.Started: {
      return undefined;
    }
    case StoryState.Finished: {
      return 'blue';
    }
    case StoryState.Delivered: {
      return 'orange';
    }
    case StoryState.Accepted: {
      return 'green';
    }
  }
}
