import { Select, SelectProps } from '@chakra-ui/react';
import { FC } from 'react';

export const ProjectMemberSelect: FC<{ projectId: string } & SelectProps> = ({
  projectId,
  ...props
}) => {
  return (
    <Select {...props}>
      <option></option>
    </Select>
  );
};
