import { AuthConfig, authExchange } from '@urql/exchange-auth';
import { IdTokenResult } from 'firebase/auth';
import { makeOperation } from 'urql';

type AuthState = {
  token: string;
  result: IdTokenResult;
};

const authConfig: AuthConfig<AuthState> = {
  async getAuth() {
    // if (authApp.currentUser != null) {
    //   const tokenResult = await authApp.currentUser.getIdTokenResult();
    //   return { token: tokenResult.token, result: tokenResult };
    // }
    return null;
  },
  willAuthError: ({ authState }) => {
    if (authState?.result?.expirationTime) {
      const expirationDate = new Date(authState.result.expirationTime);
      console.log('⚠️ expirationDate: ', expirationDate);
      return expirationDate < new Date();
    }

    return !authState || !authState.token;
  },
  addAuthToOperation: ({ authState, operation }) => {
    if (!authState || !authState.token) {
      return operation;
    }

    const fetchOptions =
      typeof operation.context.fetchOptions === 'function'
        ? operation.context.fetchOptions()
        : operation.context.fetchOptions || {};

    return makeOperation(operation.kind, operation, {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: 'Bearer ' + authState.token,
        },
      },
    });
  },
};

export const firebaseAuthExchange = authExchange<AuthState>(authConfig);
