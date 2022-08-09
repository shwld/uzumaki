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
  eventSource.addEventListener('message', message => {
    try {
      handler(JSON.parse(message.data));
    } catch (e) {
      console.debug(message);
      console.error(e);
    }
  });

  return {
    dispose() {
      eventSource.removeEventListener('message', handler);
    },
  };
};
