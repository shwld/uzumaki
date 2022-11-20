import { FC, useState } from 'react';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Icon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
} from '@chakra-ui/react';
import { BsSpeedometer } from 'react-icons/bs';

export const InspectVelocityButton: FC<{
  persistedVelocity: number;
  onChangeVelocity(velocity: number): void;
}> = ({ persistedVelocity, onChangeVelocity }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [velocity, setVelocity] = useState(persistedVelocity);
  return (
    <>
      <Button
        size="sm"
        leftIcon={<Icon as={BsSpeedometer} onClick={onOpen} color="white" />}
        onClick={onOpen}
        variant="ghost"
        color="white"
      >
        {velocity}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Velocity Override Simulator</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={e => {
                e.preventDefault();
                onChangeVelocity(velocity);
                onClose();
              }}
            >
              <Flex gap="3">
                <NumberInput
                  value={velocity}
                  onChange={v => setVelocity(Number(v))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button type="submit" colorScheme="blue">
                  Apply
                </Button>
                <Button
                  disabled={velocity === persistedVelocity}
                  variant="ghost"
                  onClick={() => {
                    setVelocity(persistedVelocity);
                    onChangeVelocity(persistedVelocity);
                    onClose();
                  }}
                >
                  Revert
                </Button>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            Use this to experiment with different velocities. Iterations in
            Current and Backlog will be temporarily recalculated based on the
            velocity you enter. No other user will see your overridden velocity.
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
