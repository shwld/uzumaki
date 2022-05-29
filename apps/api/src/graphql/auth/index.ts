import {
  GenericAuthPluginOptions,
  ResolveUserFn,
  useGenericAuth,
  ValidateUserFn,
} from '@envelop/generic-auth';
import { GraphqlServerContext } from '../context';

type UserType = {
  id: string;
};

const resolveUserFn: ResolveUserFn<UserType, GraphqlServerContext> = async (
  context
) => {
  // Here you can implement any custom sync/async code, and use the context built so far in Envelop and the HTTP request
  // to find the current user.
  // Common practice is to use a JWT token here, validate it, and use the payload as-is, or fetch the user from an external services.
  // Make sure to either return `null` or the user object.

  try {
    // const user = await context.authApi.authenticateUser(
    //   context.req.headers.authorization
    // );

    // return user;
    return { id: 'test' };
  } catch (e) {
    console.error('Failed to validate token');

    return null;
  }
};

const validateUser: ValidateUserFn<UserType> = ({ user }) => {
  // Here you can implement any custom to check if the user is valid and have access to the server.
  // This method is being triggered in different flows, based on the mode you chose to implement.

  // If you are using the `protect-auth-directive` mode, you'll also get 2 additional parameters: the resolver parameters as object and the DirectiveNode of the auth directive.

  if (!user) {
    throw new Error(`Unauthenticated!`);
  }
};

export const useAuth = (
  options?: Omit<
    GenericAuthPluginOptions<UserType, GraphqlServerContext>,
    'resolveUserFn' | 'validateUser'
  >
) =>
  useGenericAuth({
    resolveUserFn,
    validateUser,
    mode: 'protect-all',
    ...options,
  });
