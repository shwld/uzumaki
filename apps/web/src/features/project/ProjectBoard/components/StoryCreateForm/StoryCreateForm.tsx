import { generateId } from 'core-domain';
import { StoryPosition } from 'graphql-resolvers/src/generated/resolvers-types';
import { FC } from 'react';
import { StoryForm } from '../StoryForm';
import { useStoryCreateForm_CreateStoryMutation } from './StoryCreateForm.generated';

export const StoryCreateForm: FC<{
  projectId: string;
  destination: {
    position: StoryPosition;
    priority: number;
  };
  onCancel?(): void;
  onComplete?(): void;
}> = ({ projectId, destination, onCancel, onComplete }) => {
  const [createStoryResult, createStory] =
    useStoryCreateForm_CreateStoryMutation();
  return (
    <StoryForm
      projectId={projectId}
      loading={createStoryResult.fetching}
      onSubmit={async input => {
        await createStory({
          input: {
            ...input,
            id: generateId(),
            position: destination.position,
            priority: destination.priority,
            projectId,
          },
        });
        onComplete && onComplete();
      }}
      onCancel={onCancel}
    />
  );
};
