import { ReactNode, VFC } from 'react';
import { Provider } from 'urql';
import { never } from 'wonka';

const mockClient = {
  executeQuery: jest.fn(() => never),
  executeMutation: jest.fn(() => never),
  executeSubscription: jest.fn(() => never),
};

export const MockedUrqlProvider: VFC<{ children?: ReactNode }> = ({
  children,
}) => <Provider value={mockClient as any}>{children}</Provider>;
