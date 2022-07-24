import { ProjectTabMenus } from './ProjectTabMenus';
import { render } from '@testing-library/react';
import { MockedRouterProvider } from '~/test/MockedRouterProvider';

describe('ProjectTabMenus', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedRouterProvider>
        <ProjectTabMenus projectId="test" />
      </MockedRouterProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('STORIES')).toBeTruthy();
  });
});
