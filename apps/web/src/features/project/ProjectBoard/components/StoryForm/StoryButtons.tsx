import {
  IconButton,
  HStack,
  ButtonGroup,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FC } from 'react';
import { VscTrash } from 'react-icons/vsc';
export const StoryButtons: FC<{
  disabled?: boolean;
  onCancel?(): void;
  onDelete?(): void;
}> = ({ disabled, onDelete, onCancel }) => {
  return (
    <HStack justify="space-between" w="full" my={2} gap={2}>
      <ButtonGroup size="sm" isAttached variant="outline">
        {onDelete && (
          <IconButton
            aria-label="Delete"
            colorScheme="red"
            icon={<Icon as={VscTrash} />}
            onClick={onDelete}
          />
        )}
      </ButtonGroup>

      <HStack justify="flex-end">
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
        <Button type="submit" disabled={disabled}>
          Save
        </Button>
      </HStack>
    </HStack>
  );
};
