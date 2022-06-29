import { VFC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateTodoInput,
  useTodoCreateFormMutation,
} from '../../../graphql/generated/graphql';
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
import { createTodoArgsValidationSchema } from 'graphql-resolvers/src/modules/todo/mutationResolvers/todo.create/validation';

export const TodoCreateForm: VFC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoInput>({
    resolver: zodResolver(createTodoArgsValidationSchema.shape.input),
    defaultValues: {
      id: generateId(),
      title: '',
    },
  });
  const [createResult, create] = useTodoCreateFormMutation();
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
        <FormLabel htmlFor="id">First title</FormLabel>
        <Input id="id" placeholder="id" {...register('id')} />
        {errors.id && <FormErrorMessage>{errors.id.message}</FormErrorMessage>}
      </FormControl>

      <FormControl isInvalid={errors.title != null}>
        <FormLabel htmlFor="title">First id</FormLabel>
        <Input id="title" placeholder="title" {...register('title')} />
        {errors.title && (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>

      <Button type="submit">Submit</Button>
    </form>
  );
};
