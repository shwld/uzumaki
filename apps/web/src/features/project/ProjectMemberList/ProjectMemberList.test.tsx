import { ProjectMemberList } from './ProjectMemberList';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ProjectMemberList', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <ProjectMemberList />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
