import { StoryForm } from './StoryForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryForm', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryForm />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
