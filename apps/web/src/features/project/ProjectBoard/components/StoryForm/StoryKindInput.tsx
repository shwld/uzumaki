import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  HStack,
  Select,
  SelectProps,
} from '@chakra-ui/react';
import { useId } from 'react';
import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';
import { StoryKind } from '~/graphql/generated/graphql';
export const StoryKindInput = forwardRef<
  {
    errors: FieldErrorsImpl<DeepRequired<{ kind: StoryKind }>>;
  } & SelectProps,
  'select'
>(({ errors, ...props }, ref) => {
  const id = useId();
  return (
    <HStack justify="space-between" align="center" px={3}>
      <FormControl isInvalid={errors.kind != null}>
        <Flex alignItems="center">
          <FormLabel htmlFor={id} mb={0}>
            TYPE
          </FormLabel>
          <Select id={id} {...props} ref={ref}>
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
  );
});
