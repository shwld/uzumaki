import { StoryUpdateForm } from './StoryUpdateForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { fromValue } from 'wonka';
import { aViewer } from '~/graphql/generated/mockData';

describe('StoryUpdateForm', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <StoryUpdateForm projectId="test" storyId="test" />
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
