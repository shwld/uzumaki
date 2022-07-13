import { AddIcon } from '@chakra-ui/icons';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { FC } from 'react';

export const StoryCreateButton: FC<ButtonProps> = (props) => {
  return (
    <Button variant="ghost" color="white" size="sm" {...props}>
      <Icon as={AddIcon} />
      Add story
    </Button>
  );
};
