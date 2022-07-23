import { FC } from 'react';

import { StoryForm } from '../StoryForm';
import {
  useStoryUpdateFormQuery,
  useStoryUpdateForm_DestroyStoryMutation,
  useStoryUpdateForm_UpdateStoryMutation,
} from './StoryUpdateForm.generated';

export const StoryUpdateForm: FC<{
  projectId: string;
  storyId: string;
  onClose?(): void;
}> = ({ projectId, storyId, onClose }) => {
  const [result] = useStoryUpdateFormQuery({
    variables: {
      projectId,
      id: storyId,
    },
  });
  const [updateResult, updateStory] = useStoryUpdateForm_UpdateStoryMutation();
  const [destroyResult, destroyStory] =
    useStoryUpdateForm_DestroyStoryMutation();

  if (result.fetching) return <></>;
  if (result.error != null) return <></>;
  if (result.data?.viewer?.project?.story == null) return <></>;

  const story = result.data.viewer.project.story;
  return (
    <StoryForm
      defaultValues={{
        title: story.title,
        state: story.state,
        description: story.description,
        kind: story.kind,
        points: story.points ?? undefined,
        releaseDate: story.releaseDate ?? undefined,
        requesterId: story.requesterId,
      }}
      projectId={story.projectId}
      loading={updateResult.fetching || destroyResult.fetching}
      onSubmit={async (input) => {
        console.log(input);
        await updateStory({
          input: {
            ...input,
            id: storyId,
          },
        });
        onClose && onClose();
      }}
      onDelete={async () => {
        await destroyStory({
          input: {
            id: story.id,
          },
        });
        onClose && onClose();
      }}
      onCancel={onClose}
    />
  );
};
