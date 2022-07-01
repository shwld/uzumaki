export function assertMutationResult<T>(response: any): asserts response is T {
  expect(response).toHaveProperty('result');
  if (!('result' in response)) {
    throw new Error('result is not success');
  }
}
