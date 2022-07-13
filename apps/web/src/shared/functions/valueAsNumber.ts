export function valueAsNumber(v: string): number | undefined {
  return parseInt(v, 10) || undefined;
}
