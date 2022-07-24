import { Introduction } from './Introduction';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
jest.mock('next-auth/react');

describe('Introduction', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <Introduction />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  beforeEach(() => {
    const mockSession: Session = {
      expires: '1',
      user: { email: 'a', name: 'Delta', image: 'c' },
    };
    (useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);
  });
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(
      getByText('This is is changing how teams build software')
    ).toBeTruthy();
  });
});
