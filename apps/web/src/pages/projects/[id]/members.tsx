import { Container } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import AppLayout from '~/components/AppLayout/AppLayout';
import { ProjectMemberList } from '~/features/project/ProjectMemberList';
import { ProjectTabMenus } from '~/features/project/ProjectTabMenus';
import { withGraphQLClient } from '~/graphql/withGraphQLClient';

function ProjectMembers() {
  useSession({ required: true });
  const router = useRouter();
  const { id } = router.query;
  return (
    <AppLayout>
      <ProjectTabMenus projectId={id as string} />
      <Container maxW="container.md">
        <ProjectMemberList projectId={id as string} />
      </Container>
    </AppLayout>
  );
}

export default withGraphQLClient(ProjectMembers, { ssr: true });
