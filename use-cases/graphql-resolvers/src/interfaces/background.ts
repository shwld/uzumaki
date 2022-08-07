interface BackgroundJobClient<T> {
  enqueue: (object: T) => void;
}

export interface Background {
  hello: BackgroundJobClient<{ name: string }>;
}
