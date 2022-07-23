import { StoryForm } from './StoryForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryForm', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryForm projectId="test" onSubmit={jest.fn()} />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
