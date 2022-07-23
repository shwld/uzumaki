import { Select, SelectProps, forwardRef } from '@chakra-ui/react';
import { useProjectMemberSelectQuery } from './ProjectMemberSelect.generated';

export const ProjectMemberSelect = forwardRef<
  { projectId: string } & SelectProps,
  'select'
>(({ projectId, ...props }, ref) => {
  const [{ data, fetching, error }] = useProjectMemberSelectQuery({
    variables: { projectId },
  });
  if (error != null) return <></>;
  if (fetching) return <></>;
  if (data?.viewer?.project == null) return <></>;
  return (
    <Select {...props} ref={ref}>
      <option></option>
      {data.viewer.project.members.edges?.map(member => (
        <option key={member?.node?.id} value={member?.node?.id}>
          {member?.node?.name}
        </option>
      ))}
    </Select>
  );
});
