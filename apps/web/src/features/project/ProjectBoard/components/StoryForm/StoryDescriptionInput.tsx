import {
  FormControl,
  FormErrorMessage,
  forwardRef,
  VStack,
  FormLabel,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import { useId } from 'react';
import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';
export const StoryDescriptionInput = forwardRef<
  {
    errors: FieldErrorsImpl<DeepRequired<{ description: string }>>;
    onClose?(): void;
  } & TextareaProps,
  'textarea'
>(({ errors, onClose, ...props }, ref) => {
  const id = useId();
  return (
    <VStack mt={3} align="flex-start">
      <FormControl isInvalid={errors.description != null}>
        <FormLabel htmlFor="description">DESCRIPTION</FormLabel>

        <Textarea id={id} bgColor="white" {...props} ref={ref} />
      </FormControl>

      {errors.description && (
        <FormErrorMessage>{errors.description.message}</FormErrorMessage>
      )}
    </VStack>
  );
});
