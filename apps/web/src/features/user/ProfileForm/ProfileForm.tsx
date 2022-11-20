import {
  Avatar,
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
import { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  useProfileForm_UpdateUserProfileMutation,
  useProfileForm_UserProfileQuery,
} from './ProfileForm.generated';

type ProfileInput = {
  name: Scalars['String'];
  // avatarImageUrl: Scalars['String'];
};

export const ProfileForm: FC = () => {
  const [{ data }] = useProfileForm_UserProfileQuery();
  if (data?.viewer?.profile == null) return <></>;

  return (
    <ProfileEditForm
      defaultValues={data?.viewer?.profile}
      avatarImageUrl={data.viewer.profile.avatarImageUrl}
    />
  );
};

const ProfileEditForm: FC<{
  defaultValues: ProfileInput;
  avatarImageUrl?: string;
}> = ({ defaultValues, avatarImageUrl }) => {
  const id = useId();
  const fileId = useId();
  const file = useRef<HTMLInputElement>(null);
  const [result, updateUserProfile] =
    useProfileForm_UpdateUserProfileMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(updateUserProfileArgsValidationSchema.shape.input),
    defaultValues,
  });
  const submit = handleSubmit(async input => {
    const image = file.current?.files?.[0];
    await updateUserProfile({
      input: {
        name: input.name,
        avatarImage: image,
      },
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
        <HStack w="full">
          <FormControl>
            <FormLabel htmlFor={fileId} mb={0}>
              Avatar
              <Avatar src={avatarImageUrl} />
            </FormLabel>
            <input
              type="file"
              id={fileId}
              ref={file}
              style={{ display: 'none' }}
            />
          </FormControl>
        </HStack>
        <Button type="submit" colorScheme="blue" mt="3">
          Submit
        </Button>
      </form>
    </Box>
  );
};
