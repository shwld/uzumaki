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
import { updateAccountArgsValidationSchema } from 'graphql-resolvers/src/modules/account/mutationResolvers/account.update/updateAccountValidation';
import { UpdateAccountInput } from '~/graphql/generated/graphql';
import { useAccountUpdateButtonMutation } from './AccountUpdateButton.generated';
import { useForm } from 'react-hook-form';

export const AccountUpdateButton: FC<{ defaultValues: UpdateAccountInput }> = ({
  defaultValues,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateAccountInput>({
    resolver: zodResolver(updateAccountArgsValidationSchema.shape.input),
    defaultValues,
  });
  const [updateResult, update] = useAccountUpdateButtonMutation();
  const submit = handleSubmit((input) => {
    update({
      input,
    });
  });

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
        EDIT ACCOUNT
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={submit}>
          <ModalHeader>Edit account</ModalHeader>
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
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
