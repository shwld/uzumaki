// REF: https://github.com/vercel/next.js/blob/canary/examples/active-class-name/components/ActiveLink.tsx
import { FC } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import React, { useState, useEffect, ReactElement, Children } from 'react';

type ActiveLinkProps = LinkProps & {
  children: ReactElement;
};

const ActiveLink: FC<ActiveLinkProps> = ({ children, ...props }) => {
  const { asPath, isReady } = useRouter();
  const child = Children.only(children);
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    // Check if the router fields are updated client-side
    if (isReady) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;
      setActive(linkPathname === activePathname);
    }
  }, [asPath, isReady, props.as, props.href]);

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        isActive,
      })}
    </Link>
  );
};

export default ActiveLink;
