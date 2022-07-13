import { Select, SelectProps, forwardRef } from '@chakra-ui/react';

export const ProjectMemberSelect = forwardRef<
  { projectId: string } & SelectProps,
  'select'
>(({ projectId, ...props }, ref) => {
  return (
    <Select {...props}>
      <option></option>
    </Select>
  );
});
