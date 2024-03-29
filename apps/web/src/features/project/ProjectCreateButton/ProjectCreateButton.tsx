import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  Button,
  Textarea,
  Select,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateId } from 'core-domain';
import { createProjectArgsValidationSchema } from 'graphql-resolvers/src/modules/project/mutation-resolvers/project.create/create-project-validation';
import {
  CreateProjectInput,
  ProjectPrivacy,
} from '~/graphql/generated/graphql';
import { useProjectCreateButton_CreateProjectMutation } from './ProjectCreateButton.generated';
import { useForm, Controller } from 'react-hook-form';
import { FC } from 'react';
import { z } from 'zod';

const schema = createProjectArgsValidationSchema.shape.input
  .omit({ initialVelocity: true })
  .merge(
    z.object({ initialVelocity: z.string().regex(/^\d+$/).transform(Number) })
  );

export const ProjectCreateButton: FC<{ accountId: string }> = ({
  accountId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: generateId(),
      name: '',
      description: '',
      privacy: ProjectPrivacy.Private,
      initialVelocity: 10,
      accountId,
    },
  });
  const [, create] = useProjectCreateButton_CreateProjectMutation();
  const submit = handleSubmit(input => {
    create({
      input,
    });
    onClose();
  });

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
        CREATE PROJECT
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={submit}>
          <ModalHeader>Create new project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={errors.id != null}>
              <Input
                type="hidden"
                id="id"
                placeholder="id"
                {...register('id')}
              />
              {errors.id && (
                <FormErrorMessage>{errors.id.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors.name != null}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" placeholder="name" {...register('name')} />
              {errors.name && (
                <FormErrorMessage>{errors.name.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.description != null}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea
                id="description"
                placeholder="description"
                {...register('description')}
              />
              {errors.description && (
                <FormErrorMessage>
                  {errors.description.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.privacy != null}>
              <FormLabel htmlFor="privacy">Privacy</FormLabel>
              <Select
                id="privacy"
                placeholder="privacy"
                {...register('privacy')}
              >
                <option value={ProjectPrivacy.Private}>PRIVATE</option>
                <option value={ProjectPrivacy.Public}>PUBLIC</option>
              </Select>
              {errors.privacy && (
                <FormErrorMessage>{errors.privacy.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.initialVelocity != null}>
              <FormLabel htmlFor="initialVelocity">Initial velocity</FormLabel>
              <Controller
                control={control}
                name="initialVelocity"
                render={({ field: { ref, ...restField } }) => (
                  <NumberInput {...restField}>
                    <NumberInputField ref={ref} name={restField.name} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />
              {errors.initialVelocity && (
                <FormErrorMessage>
                  {errors.initialVelocity.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>

            <Button type="submit" colorScheme="green">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
