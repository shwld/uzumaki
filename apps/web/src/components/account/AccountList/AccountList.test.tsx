import { AccountList } from './AccountList';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AccountList', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <AccountList />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
