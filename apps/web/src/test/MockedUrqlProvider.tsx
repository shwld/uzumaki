import { ReactNode, FC } from 'react';
import { Provider } from 'urql';
import { fromValue } from 'wonka';
import { aViewer } from '~/graphql/generated/mockData';

export const MockedUrqlProvider: FC<{
  children?: ReactNode;
  executeQuery?(): any;
  executeMutation?(): any;
  executeSubscription?(): any;
}> = ({ children, executeQuery, executeMutation, executeSubscription }) => (
  <Provider
    value={
      {
        executeQuery:
          executeQuery ??
          (() =>
            fromValue({
              data: {
                viewer: aViewer(),
              },
            })),
        executeMutation,
        executeSubscription,
      } as any
    }
  >
    {children}
  </Provider>
);
