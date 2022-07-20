import { StoryCreateForm } from './StoryCreateForm';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { StoryPosition } from 'graphql-resolvers/src/generated/resolversTypes';

describe('StoryCreateForm', () => {
  test('success', () => {
    const { getByText } = render(
      <MockedUrqlProvider>
        <StoryCreateForm
          projectId="test"
          destination={{ position: StoryPosition.Icebox, priority: 0 }}
        />
      </MockedUrqlProvider>
    );
    expect(getByText('text')).toBeTruthy();
  });
});
