import * as React from 'react';
import { withAuthUser, AuthAction } from 'next-firebase-auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { authApp } from '../lib/firebase';
import { EmailAuthProvider } from 'firebase/auth';

const firebaseUIConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/mypage',
  signInOptions: [EmailAuthProvider.PROVIDER_ID],
};

function SignInPage() {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={firebaseUIConfig} firebaseAuth={authApp} />
    </div>
  );
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(SignInPage);
