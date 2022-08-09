import { ReactNode, FC } from 'react';
import { Provider } from 'urql';
import { fromValue, never } from 'wonka';
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
        executeMutation: executeMutation ?? jest.fn(() => never),
        executeSubscription: executeSubscription ?? jest.fn(() => never),
      } as any
    }
  >
    {children}
  </Provider>
);
