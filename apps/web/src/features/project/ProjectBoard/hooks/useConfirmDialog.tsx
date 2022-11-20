import { ReactNode, useMemo } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ModalHeader,
} from '@chakra-ui/react';

export const useConfirmDialog = (props: {
  title: string;
  onOk(): Promise<void> | void;
}): {
  renderConfirmDialog: ReactNode;
  open(): void;
} => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const renderConfirmDialog = useMemo(
    () => (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>{props.title}</ModalHeader>
          <ModalBody py="5">
            <Button colorScheme="red" mr={3} onClick={props.onOk}>
              OK
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isOpen]
  );
  return {
    open: onOpen,
    renderConfirmDialog,
  };
};
