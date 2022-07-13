const isInvalidDate = (date: Date) => Number.isNaN(date.getTime());

export function valueAsDate(v: string): Date | undefined {
  if (v == null) return;

  const date = new Date(v);
  if (isInvalidDate(date)) return;

  return date;
}
