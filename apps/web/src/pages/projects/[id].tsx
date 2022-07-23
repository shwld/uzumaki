import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AppLayout from '~/components/AppLayout/AppLayout';
import { ProjectBoard } from '~/features/project/ProjectBoard';
import { ProjectTabMenus } from '~/features/project/ProjectTabMenus';
import { withGraphQLClient } from '~/graphql/withGraphQLClient';

function Project() {
  useSession({ required: true });
  const router = useRouter();
  const { id } = router.query;
  return (
    <AppLayout>
      <ProjectTabMenus projectId={id as string} />
      <ProjectBoard projectId={id as string} />
    </AppLayout>
  );
}

export default withGraphQLClient(Project, { ssr: true });
