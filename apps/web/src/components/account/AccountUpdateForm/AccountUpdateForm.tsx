import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { updateAccountArgsValidationSchema } from 'graphql-resolvers/src/modules/account/mutationResolvers/account.update/validation';
import { useAccountUpdateFormMutation } from './AccountUpdateForm.generated';
import { UpdateAccountInput } from '~/graphql/generated/graphql';

export const AccountUpdateForm: FC<{ defaultValues: UpdateAccountInput }> = ({
  defaultValues,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateAccountInput>({
    resolver: zodResolver(updateAccountArgsValidationSchema.shape.input),
    defaultValues,
  });
  const [updateResult, update] = useAccountUpdateFormMutation();
  const submit = handleSubmit((input) => {
    update({
      input,
    });
  });

  return (
    <form onSubmit={submit}>
      <Input type="hidden" id="id" placeholder="id" {...register('id')} />

      <FormControl isInvalid={errors.name != null}>
        <FormLabel htmlFor="name">First id</FormLabel>
        <Input id="name" placeholder="name" {...register('name')} />
        {errors.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </FormControl>

      <Button type="submit">Update</Button>
    </form>
  );
};
