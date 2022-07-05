import { AccountUpdateButton } from './AccountUpdateButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AccountUpdateButton', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <AccountUpdateButton />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
