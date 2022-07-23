import { StoryUpdateForm } from './StoryUpdateForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryUpdateForm', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryUpdateForm projectId="test" storyId="test" />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
