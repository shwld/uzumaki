type Client = {
  dispose(): void;
};

let session: { [url: string]: Client } = {};

export const createSSEClient = (
  url: string,
  handler: (obj: any) => void
): Client => {
  if (session[url] != null) return session[url];

  const eventSource = new EventSource(url);
  eventSource.addEventListener('message', handler);

  return {
    dispose() {
      eventSource.removeEventListener('message', handler);
    },
  };
};
