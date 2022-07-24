import { StoryCreateForm } from './StoryCreateForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { StoryPosition } from 'graphql-resolvers/src/generated/resolversTypes';

describe('StoryCreateForm', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <StoryCreateForm
          projectId="test"
          destination={{ position: StoryPosition.Icebox, priority: 0 }}
        />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('Save')).toBeTruthy();
  });
});
