import * as React from 'react';
export const Button: React.VFC<React.ComponentProps<'button'>> = props => {
  return <button {...props} />;
};
