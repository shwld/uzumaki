import { Button } from 'ui';
import { Sample } from '../features/sample/Sample';
import {
  AuthAction,
  getFirebaseAdmin,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import { GetServerSideProps } from 'next';

function MyPage() {
  const AuthUser = useAuthUser();
  return (
    <div>
      <h1>MyPage</h1>
      <p>You are logged and your email is {AuthUser.email}</p>
      <Button onClick={() => AuthUser.signOut()}>sign out</Button>

      <Sample />
    </div>
  );
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(MyPage);

export const getServerSideProps: GetServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const token = await AuthUser.getIdToken();

  if (token == null) return { props: {} };
  const auth = getFirebaseAdmin().auth();
  const decodedToken = await auth.verifyIdToken(token);

  // set admin to true in custom claims
  // adminAuthApp().setCustomUserClaims(decodedToken.uid, { admin: true })

  // reset custom claims
  auth.setCustomUserClaims(decodedToken.uid, null);

  return { props: {} };
});
