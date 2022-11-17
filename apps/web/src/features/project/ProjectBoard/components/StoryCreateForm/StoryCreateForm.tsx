import { Box, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateId } from 'core-domain';
import { StoryPosition } from 'graphql-resolvers/src/generated/resolvers-types';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  InputMaybe,
  Scalars,
  StoryKind,
  StoryState,
} from '~/graphql/generated/graphql';
import { valueAsDate } from '~/shared/functions/valueAsDate';
import { valueAsNumber } from '~/shared/functions/valueAsNumber';
import { valueAsString } from '~/shared/functions/valueAsString';
import { StoryButtons } from '../StoryForm/StoryButtons';
import { StoryDescriptionInput } from '../StoryForm/StoryDescriptionInput';
import { StoryKindInput } from '../StoryForm/StoryKindInput';
import { StoryPointsInput } from '../StoryForm/StoryPointsInput';
import { StoryReleaseDateInput } from '../StoryForm/StoryReleaseDateInput';
import { StoryRequesterInput } from '../StoryForm/StoryRequesterInput';
import { StoryStateInput } from '../StoryForm/StoryStateInput';
import { StoryTitleInput } from '../StoryForm/StoryTitleInput';
import { useStoryCreateForm_CreateStoryMutation } from './StoryCreateForm.generated';
import { createStoryArgsValidationSchema } from 'graphql-resolvers/src/modules/story/mutation-resolvers/story.create/create-story-validation';

type StoryInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
  state: StoryState;
  description: Scalars['String'];
  kind: StoryKind;
  points?: InputMaybe<Scalars['Int']>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  requesterId: Scalars['ID'];
  position: StoryPosition;
  priority: Scalars['Int'];
  projectId: Scalars['ID'];
};

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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StoryInput>({
    resolver: zodResolver(createStoryArgsValidationSchema.shape.input),
    defaultValues: {
      title: '',
      state: StoryState.Unstarted,
      points: undefined,
      position: destination.position,
      priority: destination.priority,
      id: generateId(),
      projectId,
    },
  });
  const submit = handleSubmit(async input => {
    await createStory({
      input,
    });
    onComplete && onComplete();
  });
  return (
    <Box p={3} bg="orange.100">
      <form onSubmit={submit}>
        <input type="hidden" {...register('id')} />
        <input type="hidden" {...register('projectId')} />
        <input type="hidden" {...register('position')} />
        <input type="hidden" {...register('priority')} />
        <StoryTitleInput {...register('title')} errors={errors} />

        <StoryButtons
          disabled={createStoryResult.fetching}
          onCancel={onCancel}
        />

        <StoryStateInput errors={errors} {...register('state')} />

        <VStack align="stretch" rounded="md" bg="white" mt={3} py={1} gap={2}>
          <StoryKindInput {...register('kind')} errors={errors} />

          <StoryReleaseDateInput
            {...register('releaseDate', { setValueAs: valueAsDate })}
            errors={errors}
          />

          <StoryPointsInput
            {...register('points', {
              setValueAs: valueAsNumber,
            })}
            errors={errors}
          />

          <StoryRequesterInput
            projectId={projectId}
            {...register('requesterId', { setValueAs: valueAsString })}
            errors={errors}
          />
        </VStack>

        <StoryDescriptionInput {...register('description')} errors={errors} />
      </form>
    </Box>
  );
};
