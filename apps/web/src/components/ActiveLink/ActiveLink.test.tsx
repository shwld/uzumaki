import { ActiveLink } from './ActiveLink';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ActiveLink', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <ActiveLink />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
