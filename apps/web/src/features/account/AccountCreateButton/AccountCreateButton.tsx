import { ReactNode, FC } from 'react';
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
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateId } from 'core-domain';
import { createAccountArgsValidationSchema } from 'graphql-resolvers/src/modules/account/mutationResolvers/account.create/createAccountValidation';
import { CreateAccountInput } from '~/graphql/generated/graphql';
import { useAccountCreateButtonMutation } from './AccountCreateButton.generated';
import { useForm } from 'react-hook-form';

export const AccountCreateButton: FC<{ children?: ReactNode }> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountArgsValidationSchema.shape.input),
    defaultValues: {
      id: generateId(),
      name: '',
    },
  });
  const [, create] = useAccountCreateButtonMutation();
  const submit = handleSubmit((input) => {
    create({
      input,
    });
    onClose();
  });

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
        CREATE ACCOUNT
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={submit}>
          <ModalHeader>Create new account</ModalHeader>
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
