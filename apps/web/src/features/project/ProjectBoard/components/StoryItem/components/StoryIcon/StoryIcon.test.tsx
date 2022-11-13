import { StoryIcon } from './StoryIcon';
import { render } from '@testing-library/react';
import { MockedUrqlProvider } from '~/test/MockedUrqlProvider';
import { StoryKind } from '~/graphql/generated/graphql';
import { List, ListItem } from '@chakra-ui/react';

describe('StoryIcon', () => {
  const renderComponent = () => {
    const renderResult = render(
      <MockedUrqlProvider>
        <List>
          <ListItem>
            <StoryIcon kind={StoryKind.Release} />
          </ListItem>
        </List>
      </MockedUrqlProvider>
    );
    return renderResult;
  };
  test('Snapshot', () => {
    expect(renderComponent().asFragment()).toMatchSnapshot();
  });
});
