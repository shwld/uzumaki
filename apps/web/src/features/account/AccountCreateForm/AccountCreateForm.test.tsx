import { AccountCreateForm } from './AccountCreateForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AccountCreateForm', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <AccountCreateForm />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
