import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from 'ui';
import { Introduction } from '~/features/introduction/Introduction';
import { AccountCreateForm } from '../features/account/AccountCreateForm';
import { AccountList } from '../features/account/AccountList';

function Web() {
  const { data: session } = useSession();
  const isSignedIn = session?.user != null;
  return (
    <div>
      <h1>Web</h1>
      <p>You are logged and your email is {session?.user?.email}</p>

      {!isSignedIn && (
        <p>
          <Button onClick={() => signIn('auth0')}>SignIn</Button>
        </p>
      )}
      {isSignedIn && (
        <p>
          <Button onClick={() => signOut()}>SignOut</Button>
        </p>
      )}
      <AccountCreateForm />
      <AccountList />
      <Introduction />
    </div>
  );
}

export default Web;
