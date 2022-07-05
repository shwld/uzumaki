import { Introduction } from './Introduction';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
jest.mock('next-auth/react');

describe('Introduction', () => {
  test('success', () => {
    const mockSession: Session = {
      expires: '1',
      user: { email: 'a', name: 'Delta', image: 'c' },
    };
    (useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);
    const { getByText } = render(
      <MockedUrqlProvider>
        <Introduction />
      </MockedUrqlProvider>
    );
    expect(
      getByText('This is is changing how teams build software')
    ).toBeTruthy();
  });
});
