import { ProjectBoard } from './ProjectBoard';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ProjectBoard', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <ProjectBoard projectId="test" />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('Current Iteration')).toBeTruthy();
  });
});
