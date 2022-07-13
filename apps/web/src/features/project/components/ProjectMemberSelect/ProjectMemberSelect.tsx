import { Select, SelectProps, forwardRef } from '@chakra-ui/react';
import { FC } from 'react';

export const ProjectMemberSelect = forwardRef<SelectProps, 'select'>(
  ({ projectId, ...props }, ref) => {
    return (
      <Select {...props}>
        <option></option>
      </Select>
    );
  }
);
