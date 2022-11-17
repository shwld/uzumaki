import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  HStack,
  SelectProps,
} from '@chakra-ui/react';
import { useId } from 'react';
import { DeepRequired, FieldErrorsImpl } from 'react-hook-form';
import { ProjectMemberSelect } from '~/features/project/components/ProjectMemberSelect';
export const StoryRequesterInput = forwardRef<
  {
    projectId: string;
    errors: FieldErrorsImpl<DeepRequired<{ requesterId?: string | null }>>;
  } & SelectProps,
  'select'
>(({ errors, projectId, ...props }, ref) => {
  const id = useId();
  return (
    <HStack justify="space-between" align="center" px={3}>
      <FormControl isInvalid={errors.requesterId != null}>
        <Flex alignItems="center">
          <FormLabel htmlFor={id} mb={0}>
            REQUESTER
          </FormLabel>

          <ProjectMemberSelect
            id={id}
            projectId={projectId}
            {...props}
            ref={ref}
          />
        </Flex>
        {errors.requesterId && (
          <FormErrorMessage>{errors.requesterId.message}</FormErrorMessage>
        )}
      </FormControl>
    </HStack>
  );
});
