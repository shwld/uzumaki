import { AccountList } from './AccountList';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AccountList', () => {
  test('success', () => {
    const { getByLabelText } = render(
      <MockedUrqlProvider>
        <AccountList />
      </MockedUrqlProvider>
    );
    expect(getByLabelText('Account list')).toBeTruthy();
  });
});
