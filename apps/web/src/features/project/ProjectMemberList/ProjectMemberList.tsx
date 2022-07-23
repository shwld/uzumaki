import { FC } from 'react';
import { ProjectTabMenus } from '../ProjectTabMenus';
import { useProjectMemberListQuery } from './ProjectMemberList.generated';

export const ProjectMemberList: FC<{ projectId: string }> = ({ projectId }) => {
  const [{ data, fetching, error }] = useProjectMemberListQuery({
    variables: { projectId },
  });
  if (error != null) return <></>;
  if (fetching) return <></>;
  if (data?.viewer?.project == null) return <></>;
  return (
    <>
      <ProjectTabMenus projectId={projectId} />
      {data.viewer.project.members.edges?.map((member) => (
        <div key={member?.node?.id}>{member?.node?.name}</div>
      ))}
    </>
  );
};
