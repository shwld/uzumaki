interface BackgroundJobClient<T> {
  enqueue: (object: T) => void;
}

export type CalculateVelocityPayload = { projectId: string };

export interface Background {
  calculateVelocity: BackgroundJobClient<CalculateVelocityPayload>;
}
