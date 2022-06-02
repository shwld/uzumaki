import { withAuthUser } from 'next-firebase-auth';
import Link from 'next/link';
import { Sample } from '../features/sample/Sample';

function Web() {
  return (
    <div>
      <h1>Web</h1>

      <Link href="/mypage">Go to mypage</Link>
      <Sample />
    </div>
  );
}

export default withAuthUser()(Web);
