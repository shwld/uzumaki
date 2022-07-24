import { ActiveLink } from './ActiveLink';
import { render } from '@testing-library/react';
import { MockedRouterProvider } from '~/test/MockedRouterProvider';

describe('ActiveLink', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedRouterProvider>
        <ActiveLink href="">
          <>test</>
        </ActiveLink>
      </MockedRouterProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('test')).toBeTruthy();
  });
});
