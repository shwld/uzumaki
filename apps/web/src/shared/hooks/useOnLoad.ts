import { useEffect, useRef } from 'react';

export const useOnLoad = (onLoad: () => void, terms: boolean) => {
  const firstLoaded = useRef(false);
  useEffect(() => {
    if (firstLoaded.current) return;
    if (!terms) return;

    firstLoaded.current = true;
    onLoad && onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms]);
};
