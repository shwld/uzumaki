import { generateId } from 'core-domain';
import { StoryPosition } from 'graphql-resolvers/src/generated/resolversTypes';
import { FC } from 'react';
import { StoryForm } from '../components/StoryForm';
import { useStoryCreateFormCreateStoryMutation } from './StoryCreateForm.generated';

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
    useStoryCreateFormCreateStoryMutation();
  return (
    <StoryForm
      projectId={projectId}
      loading={createStoryResult.fetching}
      onSubmit={async (input) => {
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
