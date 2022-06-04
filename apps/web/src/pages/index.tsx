import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from 'ui';
import { Sample } from '../features/sample/Sample';

function Web() {
  const res = useSession();
  console.log(res);
  const { data: session } = useSession();
  return (
    <div>
      <h1>Web</h1>
      <p>You are logged and your email is {session?.user?.email}</p>

      <p>
        <Button onClick={() => signIn('auth0')}>SignIn</Button>
      </p>
      <p>
        <Button onClick={() => signOut()}>SignOut</Button>
      </p>
      <Sample />
    </div>
  );
}

export default Web;
