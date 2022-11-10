import {
  GenericAuthPluginOptions,
  ResolveUserFn,
  useGenericAuth,
  ValidateUserFn,
} from '@envelop/generic-auth';
import { Aggregates, generateId, UserEntity, UserMutations } from 'core-domain';
import { andThen, getOrThrow, pipe } from 'core-domain/lib';
import { GraphqlServerContext } from './context';

const resolveUserFn: ResolveUserFn<
  UserEntity,
  GraphqlServerContext
> = context => {
  // Here you can implement any custom sync/async code, and use the context built so far in Envelop and the HTTP request
  // to find the current user.
  // Common practice is to use a JWT token here, validate it, and use the payload as-is, or fetch the user from an external services.
  // Make sure to either return `null` or the user object.

  try {
    // const user = await context.authApi.authenticateUser(
    //   context.req.headers.authorization
    // );

    // return user;
    return context.currentUser ?? null;
  } catch (e) {
    console.error('Failed to validate token');

    return null;
  }
};

const validateUser: ValidateUserFn<UserEntity> = ({ user }) => {
  // Here you can implement any custom to check if the user is valid and have access to the server.
  // This method is being triggered in different flows, based on the mode you chose to implement.

  // If you are using the `protect-auth-directive` mode, you'll also get 2 additional parameters: the resolver parameters as object and the DirectiveNode of the auth directive.

  if (!user) {
    throw new Error(`Unauthenticated!`);
  }
};

export const useAuth = (
  options?: Omit<
    GenericAuthPluginOptions<UserEntity, GraphqlServerContext>,
    'resolveUserFn' | 'validateUser'
  >
) =>
  useGenericAuth({
    resolveUserFn,
    validateUser,
    mode: 'protect-granular',
    ...options,
  });

type UserProperties = {
  uid: string;
  email: string;
  name: string;
  avatarImageUrl: string;
};

export async function prepareUser(
  aggregates: Aggregates,
  userProps: UserProperties
): Promise<UserEntity> {
  const foundUser = await getOrThrow(
    aggregates.user.findByUid({ uid: userProps.uid })
  );
  if (foundUser != null) return foundUser;

  const newUser = await pipe(
    UserMutations.build({ ...userProps, id: generateId() }),
    andThen(aggregates.user.create),
    getOrThrow
  );
  return newUser;
}
