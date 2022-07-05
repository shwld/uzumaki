import { ProjectCreateButton } from './ProjectCreateButton';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ProjectCreateButton', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <ProjectCreateButton />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
