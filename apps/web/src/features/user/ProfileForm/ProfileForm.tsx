import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Text,
  useId,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Scalars } from 'graphql-resolvers/src/generated/resolvers-types';
import { updateUserProfileArgsValidationSchema } from 'graphql-resolvers/src/modules/user-profile/mutation-resolvers/user-profile.update/update-user-profile-validation';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useProfileForm_UpdateUserProfleMutation } from './ProfileForm.generated';

type ProfileInput = {
  name: Scalars['String'];
  avatarImageUrl: Scalars['String'];
};

export const ProfileForm: FC<{ defaultValues: ProfileInput }> = ({
  defaultValues,
}) => {
  const id = useId();
  const [result, updateUserProfile] = useProfileForm_UpdateUserProfleMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(updateUserProfileArgsValidationSchema.shape.input),
    defaultValues,
  });
  const submit = handleSubmit(async input => {
    await updateUserProfile({
      input,
    });
  });

  return (
    <Box p={3} bg="gray.100">
      <Text>User Profile</Text>
      <form onSubmit={submit}>
        <HStack w="full">
          <FormControl isInvalid={errors.name != null}>
            <FormLabel htmlFor={id} mb={0}>
              Name
            </FormLabel>
            <Input type="text" id={id} {...register('name')} bgColor="white" />
            {errors.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </FormControl>
        </HStack>
        <Button type="submit" colorScheme="blue" mt="3">
          Submit
        </Button>
      </form>
    </Box>
  );
};
