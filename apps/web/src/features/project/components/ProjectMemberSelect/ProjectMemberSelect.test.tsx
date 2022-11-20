import { ProjectMemberSelect } from './ProjectMemberSelect';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ProjectMemberSelect', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <ProjectMemberSelect projectId="test" />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('sapiente')).toBeTruthy();
  });
});
