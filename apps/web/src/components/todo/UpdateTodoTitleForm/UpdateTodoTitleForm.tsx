import { VFC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTodoUpdateTitleFormMutation } from './UpdateTodoTitleForm.generated';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from '@chakra-ui/react';
import { updateTodoTitleArgsValidationSchema } from 'graphql-resolvers/src/modules/todo/mutationResolvers/todo.updateTitle/validation';
import { UpdateTodoTitleInput } from '../../../graphql/generated/graphql';

export const TodoUpdateTitleForm: VFC<{
  defaultValues: UpdateTodoTitleInput;
}> = ({ defaultValues }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateTodoTitleInput>({
    resolver: zodResolver(updateTodoTitleArgsValidationSchema.shape.input),
    defaultValues,
  });
  const [updateResult, update] = useTodoUpdateTitleFormMutation();
  const submit = handleSubmit((input) => {
    update({
      input,
    });
  });
  console.log(errors);

  return (
    <form onSubmit={submit}>
      <Input type="hidden" id="id" placeholder="id" {...register('id')} />

      <FormControl isInvalid={errors.title != null}>
        <FormLabel htmlFor="title">First id</FormLabel>
        <Input id="title" placeholder="title" {...register('title')} />
        {errors.title && (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        )}
      </FormControl>

      <Button type="submit">Update</Button>
    </form>
  );
};
