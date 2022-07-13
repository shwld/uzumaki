import { StoryCreateForm } from './StoryCreateForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryCreateForm', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryCreateForm />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
