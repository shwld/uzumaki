import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  HStack,
  Select,
  SelectProps,
  VStack,
} from '@chakra-ui/react';
import { useId } from 'react';
import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';
import { StoryState } from '~/graphql/generated/graphql';
export const StoryStateInput = forwardRef<
  {
    errors: FieldErrorsImpl<DeepRequired<{ state: StoryState }>>;
  } & SelectProps,
  'select'
>(({ errors, ...props }, ref) => {
  const id = useId();
  return (
    <VStack align="stretch" rounded="md" bg="white" mt={3} py={1} gap={2}>
      <HStack justify="space-between" align="center" px={3}>
        <FormControl isInvalid={errors.state != null}>
          <Flex alignItems="center">
            <FormLabel htmlFor={id} mb={0}>
              State
            </FormLabel>
            <Select id={id} {...props} ref={ref}>
              <option value="UNSTARTED">UNSTARTED</option>
              <option value="STARTED">STARTED</option>
              <option value="FINISHED">FINISHED</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="ACCEPTED">ACCEPTED</option>
              <option value="REJECTED">REJECTED</option>
            </Select>
          </Flex>
          {errors.state && (
            <FormErrorMessage>{errors.state.message}</FormErrorMessage>
          )}
        </FormControl>
      </HStack>
    </VStack>
  );
});
