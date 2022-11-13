import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Select,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteProjectMemberArgsValidationSchema } from 'graphql-resolvers/src/modules/project/mutation-resolvers/project-member.invite/invite-project-member-validation';
import {
  InviteProjectMemberInput,
  ProjectMemberRole,
} from '~/graphql/generated/graphql';
import { useProjectMemberInviteButton_InviteMutation } from './ProjectMemberInviteButton.generated';
import { useForm } from 'react-hook-form';
import { FC } from 'react';
import { generateId } from 'core-domain';

export const ProjectMemberInviteButton: FC<{ projectId: string }> = ({
  projectId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<InviteProjectMemberInput>({
    resolver: zodResolver(inviteProjectMemberArgsValidationSchema.shape.input),
    defaultValues: {
      id: generateId(),
      projectId,
      userEmail: '',
      role: ProjectMemberRole.Member,
    },
  });
  const [, invite] = useProjectMemberInviteButton_InviteMutation();
  const submit = handleSubmit(input => {
    invite({
      input,
    });
    onClose();
  });

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
        INVITE PEOPLE
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={submit}>
          <ModalHeader>Invite people</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="hidden" id="id" {...register('id')} />
            {errors.id && (
              <FormErrorMessage>{errors.id.message}</FormErrorMessage>
            )}
            <FormControl isInvalid={errors.userEmail != null}>
              <Input
                type="email"
                id="email"
                placeholder="email"
                {...register('userEmail')}
              />
              {errors.userEmail && (
                <FormErrorMessage>{errors.userEmail.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors.role != null}>
              <FormLabel htmlFor="role">Role</FormLabel>
              <Select id="role" placeholder="role" {...register('role')}>
                <option value={ProjectMemberRole.Owner}>Owner</option>
                <option value={ProjectMemberRole.Member}>Member</option>
                <option value={ProjectMemberRole.Viewer}>Viewer</option>
              </Select>
              {errors.role && (
                <FormErrorMessage>{errors.role.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>

            <Button type="submit" colorScheme="green" isLoading={isSubmitting}>
              Invite
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
