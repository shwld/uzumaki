import { ProjectTabMenus } from './ProjectTabMenus';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';

describe('ProjectTabMenus', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <ProjectTabMenus projectId="test" />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
