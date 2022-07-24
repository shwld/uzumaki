import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { FC, ReactNode } from 'react';

export const MockedRouterProvider: FC<
  Partial<NextRouter> & { children: ReactNode }
> = ({ children, ...props }) => {
  const mockedRouter: NextRouter = {
    route: '',
    basePath: '',
    pathname: '',
    isFallback: false,
    query: {},
    asPath: '',
    isReady: true,
    isLocaleDomain: true,
    isPreview: false,
    push: () => Promise.resolve(true),
    replace: () => Promise.resolve(true),
    reload: () => null,
    back: () => null,
    prefetch: () => Promise.resolve(undefined),
    beforePopState: () => null,
    events: {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
    ...props,
  };
  return (
    <RouterContext.Provider value={mockedRouter}>
      {children}
    </RouterContext.Provider>
  );
};
