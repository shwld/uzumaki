import {
  FormControl,
  FormErrorMessage,
  forwardRef,
  IconButton,
  HStack,
  VStack,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';
import { VscChevronUp } from 'react-icons/vsc';
export const StoryTitleInput = forwardRef<
  {
    errors: FieldErrorsImpl<DeepRequired<{ title: string }>>;
    onClose?(): void;
  } & InputProps,
  'input'
>(({ errors, onClose, ...props }, ref) => {
  console.log({ props });
  return (
    <VStack align="flex-start">
      <HStack w="full">
        {onClose != null && (
          <IconButton
            aria-label="Close"
            icon={<VscChevronUp />}
            size="sm"
            onClick={onClose}
          />
        )}
        <FormControl isInvalid={errors.title != null}>
          <Input type="text" {...props} bgColor="white" ref={ref} />
          {errors.title && (
            <FormErrorMessage>{errors.title.message}</FormErrorMessage>
          )}
        </FormControl>
      </HStack>
    </VStack>
  );
});
