import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from 'ui';
import { Sample } from '../features/sample/Sample';
import { TodoCreateForm } from '../components/todo/TodoCreateForm';
import { TodoList } from '../components/todo/TodoList/TodoList';

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
      <Sample />
      <TodoCreateForm />
      <TodoList />
    </div>
  );
}

export default Web;
