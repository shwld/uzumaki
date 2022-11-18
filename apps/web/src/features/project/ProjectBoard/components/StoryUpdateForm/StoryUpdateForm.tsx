import { Box, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  InputMaybe,
  Scalars,
  StoryKind,
  StoryState,
} from '~/graphql/generated/graphql';

import { StoryButtons } from '../StoryForm/StoryButtons';
import { StoryDescriptionInput } from '../StoryForm/StoryDescriptionInput';
import { StoryKindInput } from '../StoryForm/StoryKindInput';
import { StoryPointsInput } from '../StoryForm/StoryPointsInput';
import { StoryReleaseDateInput } from '../StoryForm/StoryReleaseDateInput';
import { StoryRequesterInput } from '../StoryForm/StoryRequesterInput';
import { StoryStateInput } from '../StoryForm/StoryStateInput';
import { StoryTitleInput } from '../StoryForm/StoryTitleInput';
import {
  StoryUpdateForm_ItemFragment,
  useStoryUpdateFormQuery,
  useStoryUpdateForm_DestroyStoryMutation,
  useStoryUpdateForm_UpdateStoryMutation,
} from './StoryUpdateForm.generated';
import { updateStoryArgsValidationSchema } from 'graphql-resolvers/src/modules/story/mutation-resolvers/story.update/update-story-validation';
import { valueAsNumber } from '~/shared/functions/valueAsNumber';
import { valueAsString } from '~/shared/functions/valueAsString';
import { useOnLoad } from '~/shared/hooks/useOnLoad';

type StoryInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
  state: StoryState;
  description: Scalars['String'];
  kind: StoryKind;
  points?: InputMaybe<Scalars['Int']>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  requesterId: Scalars['ID'];
  projectId: Scalars['ID'];
};

export const StoryUpdateForm: FC<{
  projectId: string;
  storyId: string;
  onClose?(): void;
  onLoad?(): void;
}> = ({ projectId, storyId, onClose, onLoad }) => {
  const [result] = useStoryUpdateFormQuery({
    variables: {
      projectId,
      id: storyId,
    },
  });

  useOnLoad(() => onLoad && onLoad(), !result.fetching);

  if (result.fetching) return <></>;
  if (result.error != null) return <></>;
  if (result.data?.viewer?.project?.story == null) return <></>;

  const story = result.data.viewer.project.story;
  return <StoryForm story={story} onClose={onClose} />;
};

/**
 * PRIVATE
 */

const StoryForm: FC<{
  story: StoryUpdateForm_ItemFragment;
  onClose?(): void;
}> = ({ story, onClose }) => {
  const [updateResult, updateStory] = useStoryUpdateForm_UpdateStoryMutation();
  const [destroyResult, destroyStory] =
    useStoryUpdateForm_DestroyStoryMutation();

  console.log(story);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StoryInput>({
    resolver: zodResolver(updateStoryArgsValidationSchema.shape.input),
    defaultValues: {
      id: story.id,
      title: story.title,
      state: story.state,
      description: story.description,
      kind: story.kind,
      points: story.points ?? undefined,
      releaseDate: story.releaseDate ?? undefined,
      requesterId: story.requesterId,
      projectId: story.projectId,
    },
  });
  const submit = handleSubmit(async input => {
    await updateStory({
      input,
    });
    onClose && onClose();
  });

  return (
    <Box p={3} bg="orange.100">
      <form onSubmit={submit}>
        <input type="hidden" {...register('id')} />
        <input type="hidden" {...register('projectId')} />
        <StoryTitleInput {...register('title')} errors={errors} />

        <StoryButtons
          disabled={updateResult.fetching || destroyResult.fetching}
          onCancel={onClose}
          onDelete={async () => {
            await destroyStory({
              input: {
                id: story.id,
              },
            });
            onClose && onClose();
          }}
        />

        <StoryStateInput errors={errors} {...register('state')} />

        <VStack align="stretch" rounded="md" bg="white" mt={3} py={1} gap={2}>
          <StoryKindInput {...register('kind')} errors={errors} />

          <Controller
            control={control}
            name="releaseDate"
            render={props => (
              <StoryReleaseDateInput
                value={props.field.value?.substring(0, 10)}
                onChange={e => {
                  props.field.onChange(e.target.value);
                }}
                errors={errors}
              />
            )}
          />

          <StoryPointsInput
            {...register('points', {
              setValueAs: valueAsNumber,
            })}
            errors={errors}
          />

          <StoryRequesterInput
            projectId={story.projectId}
            {...register('requesterId', { setValueAs: valueAsString })}
            errors={errors}
          />
        </VStack>

        <StoryDescriptionInput {...register('description')} errors={errors} />
      </form>
    </Box>
  );
};
