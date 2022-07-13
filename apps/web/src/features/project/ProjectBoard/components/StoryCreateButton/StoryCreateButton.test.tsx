import { StoryCreateButton } from './StoryCreateButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('StoryCreateButton', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryCreateButton />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
