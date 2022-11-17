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
export const StoryPointsInput = forwardRef<
  {
    errors: FieldErrorsImpl<DeepRequired<{ points?: number | null }>>;
  } & SelectProps,
  'select'
>(({ errors, ...props }, ref) => {
  const id = useId();
  return (
    <HStack justify="space-between" align="center" px={3}>
      <FormControl isInvalid={errors.points != null}>
        <Flex alignItems="center">
          <FormLabel htmlFor={id} mb={0}>
            POINTS
          </FormLabel>

          <Select id={id} {...props} ref={ref}>
            <option>Unestimated</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={13}>13</option>
            <option value={20}>20</option>
            <option value={40}>40</option>
          </Select>
        </Flex>
        {errors.points && (
          <FormErrorMessage>{errors.points.message}</FormErrorMessage>
        )}
      </FormControl>
    </HStack>
  );
});
