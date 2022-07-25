import { ProjectMemberInviteButton } from './ProjectMemberInviteButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ProjectMemberInviteButton', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <ProjectMemberInviteButton projectId="test_id" />
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
  test('success', () => {
    const { getByText } = renderComponent();
    expect(getByText('INVITE PEOPLE')).toBeTruthy();
  });
});
