import { ProjectInvitationConfirmation } from './ProjectInvitationConfirmation';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ProjectInvitationConfirmation', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <ProjectInvitationConfirmation />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('test')).toBeTruthy();
  });
});
