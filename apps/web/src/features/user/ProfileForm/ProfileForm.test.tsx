import { ProfileForm } from './ProfileForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ProfileForm', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <ProfileForm />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('User Profile')).toBeTruthy();
  });
});
