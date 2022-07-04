import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateAccountInput } from '~/graphql/generated/graphql';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from '@chakra-ui/react';
import { generateId } from 'core-domain';
import { createAccountArgsValidationSchema } from 'graphql-resolvers/src/modules/account/mutationResolvers/account.create/validation';
import { useAccountCreateFormMutation } from './AccountCreateForm.generated';

export const AccountCreateForm: FC = () => {
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
  const [createResult, create] = useAccountCreateFormMutation();
  const submit = handleSubmit((input) => {
    create({
      input,
    });
  });

  return (
    <form onSubmit={submit}>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Your browser is outdated!</AlertTitle>
        <AlertDescription>
          Your Chakra experience may be degraded.
        </AlertDescription>
      </Alert>
      <FormControl isInvalid={errors.id != null}>
        <FormLabel htmlFor="id">First name</FormLabel>
        <Input id="id" placeholder="id" {...register('id')} />
        {errors.id && <FormErrorMessage>{errors.id.message}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={errors.name != null}>
        <FormLabel htmlFor="name">First id</FormLabel>
        <Input id="name" placeholder="name" {...register('name')} />
        {errors.name && (
          <FormErrorMessage>{errors.name.message}</FormErrorMessage>
        )}
      </FormControl>

      <Button type="submit">Submit</Button>
    </form>
  );
};
