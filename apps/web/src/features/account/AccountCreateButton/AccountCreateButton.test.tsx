import { AccountCreateButton } from './AccountCreateButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AccountCreateButton', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <AccountCreateButton />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
