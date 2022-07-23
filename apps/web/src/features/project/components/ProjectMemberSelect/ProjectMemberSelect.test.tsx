import { ProjectMemberSelect } from './ProjectMemberSelect';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ProjectMemberSelect', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <ProjectMemberSelect projectId="test" />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
