import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AppLayout from '~/components/AppLayout/AppLayout';
import { ProjectMemberList } from '~/features/project/ProjectMemberList';
import { withGraphQLClient } from '~/graphql/withGraphQLClient';

function ProjectMembers() {
  useSession({ required: true });
  const router = useRouter();
  const { id } = router.query;
  return (
    <AppLayout>
      <ProjectMemberList projectId={id as string} />
    </AppLayout>
  );
}

export default withGraphQLClient(ProjectMembers, { ssr: true });
