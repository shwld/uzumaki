import { VscChevronUp, VscTrash } from 'react-icons/vsc';
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Icon,
  IconButton,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Flex,
  Textarea,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  InputMaybe,
  Scalars,
  StoryKind,
  StoryState,
} from '~/graphql/generated/graphql';
import { valueAsNumber } from '~/shared/functions/valueAsNumber';
import { valueAsDate } from '~/shared/functions/valueAsDate';
import { createStoryArgsValidationSchema } from 'graphql-resolvers/src/modules/story/mutationResolvers/story.create/validation';
import { updateStoryArgsValidationSchema } from 'graphql-resolvers/src/modules/story/mutationResolvers/story.update/validation';
import { ProjectMemberSelect } from '~/features/project/components/ProjectMemberSelect';
import { valueAsString } from '~/shared/functions/valueAsString';

const schema = createStoryArgsValidationSchema.shape.input
  .merge(updateStoryArgsValidationSchema.shape.input)
  .pick({
    title: true,
    state: true,
    description: true,
    kind: true,
    points: true,
    releaseDate: true,
    requesterId: true,
  });

type StoryInput = {
  title: Scalars['String'];
  state: StoryState;
  description: Scalars['String'];
  kind: StoryKind;
  points?: InputMaybe<Scalars['Int']>;
  releaseDate?: InputMaybe<Scalars['DateTime']>;
  requesterId?: InputMaybe<Scalars['ID']>;
};

export const StoryForm: FC<{
  projectId: string;
  defaultValues?: StoryInput;
  loading: boolean;
  onSubmit(input: StoryInput): void;
  onCancel?(): void;
  onClose?(): void;
  onDelete?(): void;
}> = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<StoryInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      state: StoryState.Unstarted,
      points: undefined,
      ...props.defaultValues,
    },
  });
  const submit = handleSubmit((input) => {
    props.onSubmit(input);
  });
  console.log(errors);

  return (
    <Box p={3} bg="orange.100">
      <form onSubmit={submit}>
        <VStack align="flex-start">
          <HStack w="full">
            {props.onClose != null && (
              <IconButton
                aria-label="Close"
                icon={<VscChevronUp />}
                size="sm"
                onClick={props.onClose}
              />
            )}
            <FormControl isInvalid={errors.title != null}>
              <Input type="text" {...register('title')} bgColor="white" />
              {errors.title && (
                <FormErrorMessage>{errors.title.message}</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
        </VStack>

        <HStack justify="space-between" w="full" my={2} gap={2}>
          <ButtonGroup size="sm" isAttached variant="outline">
            {props.onDelete && (
              <IconButton
                aria-label="Delete"
                colorScheme="red"
                icon={<Icon as={VscTrash} />}
                onClick={props.onDelete}
              />
            )}
          </ButtonGroup>

          <HStack justify="flex-end">
            {props.onCancel && <Button onClick={props.onCancel}>Cancel</Button>}
            <Button type="submit" disabled={props.loading}>
              Save
            </Button>
          </HStack>
        </HStack>

        <VStack align="stretch" rounded="md" bg="white" mt={3} py={1} gap={2}>
          <HStack justify="space-between" align="center" px={3}>
            <FormControl isInvalid={errors.state != null}>
              <Flex alignItems="center">
                <FormLabel htmlFor="state" mb={0}>
                  State
                </FormLabel>
                <Select id="state" {...register('state')}>
                  <option value="UNSTARTED">UNSTARTED</option>
                  <option value="STARTED">STARTED</option>
                  <option value="FINISHED">FINISHED</option>
                  <option value="ACCEPTED">ACCEPTED</option>
                  <option value="REJECTED">REJECTED</option>
                </Select>
              </Flex>
              {errors.state && (
                <FormErrorMessage>{errors.state.message}</FormErrorMessage>
              )}
            </FormControl>
          </HStack>
        </VStack>

        <VStack align="stretch" rounded="md" bg="white" mt={3} py={1} gap={2}>
          <HStack justify="space-between" align="center" px={3}>
            <FormControl isInvalid={errors.state != null}>
              <Flex alignItems="center">
                <FormLabel htmlFor="kind" mb={0}>
                  TYPE
                </FormLabel>
                <Select id="kind" {...register('kind')}>
                  <option value="FEATURE">Feature</option>
                  <option value="BUG">Bug</option>
                  <option value="CHORE">Chore</option>
                  <option value="RELEASE">Release</option>
                </Select>
              </Flex>
              {errors.kind && (
                <FormErrorMessage>{errors.kind.message}</FormErrorMessage>
              )}
            </FormControl>
          </HStack>

          <HStack justify="space-between" align="center" px={3}>
            <FormControl isInvalid={errors.state != null}>
              <Flex alignItems="center">
                <FormLabel htmlFor="releaseDate" mb={0}>
                  RELEASE DATE
                </FormLabel>

                <Input
                  type="date"
                  {...register('releaseDate', { setValueAs: valueAsDate })}
                />
              </Flex>
              {errors.releaseDate && (
                <FormErrorMessage>
                  {errors.releaseDate.message?.toString()}
                </FormErrorMessage>
              )}
            </FormControl>
          </HStack>

          <HStack justify="space-between" align="center" px={3}>
            <FormControl isInvalid={errors.state != null}>
              <Flex alignItems="center">
                <FormLabel htmlFor="points" mb={0}>
                  POINTS
                </FormLabel>

                <Select
                  {...register('points', {
                    setValueAs: valueAsNumber,
                  })}
                >
                  <option>Unestimated</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={8}>8</option>
                  <option value={13}>13</option>
                  <option value={20}>20</option>
                  <option value={40}>40</option>
                </Select>
              </Flex>
              {errors.points && (
                <FormErrorMessage>{errors.points.message}</FormErrorMessage>
              )}
            </FormControl>
          </HStack>

          <HStack justify="space-between" align="center" px={3}>
            <FormControl isInvalid={errors.state != null}>
              <Flex alignItems="center">
                <FormLabel htmlFor="requesterId" mb={0}>
                  REQUESTER
                </FormLabel>

                <ProjectMemberSelect
                  projectId={props.projectId}
                  {...register('requesterId', { setValueAs: valueAsString })}
                />
              </Flex>
              {errors.requesterId && (
                <FormErrorMessage>
                  {errors.requesterId.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </HStack>
        </VStack>

        <VStack mt={3} align="flex-start">
          <FormControl isInvalid={errors.state != null}>
            <FormLabel htmlFor="description">DESCRIPTION</FormLabel>

            <Textarea {...register('description')} bgColor="white" />
          </FormControl>

          {errors.description && (
            <FormErrorMessage>{errors.description.message}</FormErrorMessage>
          )}
        </VStack>
      </form>
    </Box>
  );
};
