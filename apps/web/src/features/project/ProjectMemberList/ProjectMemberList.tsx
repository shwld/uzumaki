import { FC } from 'react';
import { ProjectTabMenus } from '../ProjectTabMenus';

export const ProjectMemberList: FC<{ projectId: string }> = ({ projectId }) => {
  return (
    <>
      <ProjectTabMenus projectId={projectId} />
    </>
  );
};
