import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  HStack,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { useId } from 'react';
import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';
import { InputMaybe, Scalars } from '~/graphql/generated/graphql';
export const StoryReleaseDateInput = forwardRef<
  {
    errors: FieldErrorsImpl<
      DeepRequired<{ releaseDate: InputMaybe<Scalars['DateTime']> }>
    >;
  } & InputProps,
  'input'
>(({ errors, ...props }, ref) => {
  const id = useId();
  return (
    <HStack justify="space-between" align="center" px={3}>
      <FormControl isInvalid={errors.releaseDate != null}>
        <Flex alignItems="center">
          <FormLabel htmlFor={id} mb={0}>
            RELEASE DATE
          </FormLabel>

          <Input id={id} type="date" {...props} ref={ref} />
        </Flex>
        {errors.releaseDate && (
          <FormErrorMessage>
            {errors.releaseDate.message?.toString()}
          </FormErrorMessage>
        )}
      </FormControl>
    </HStack>
  );
});
