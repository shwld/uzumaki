import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER,
      idToken: true,
      authorization: {
        params: {
          audience: process.env.AUTH0_AUDIENCE,
          scope: 'openid email profile offline_access',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
