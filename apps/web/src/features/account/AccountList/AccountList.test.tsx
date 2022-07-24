import { AccountList } from './AccountList';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('AccountList', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <AccountList />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByLabelText } = renderComponent();
    expect(getByLabelText('Account list')).toBeTruthy();
  });
});
