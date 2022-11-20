export type File = {
  text(): Promise<string>;
  stream(): any;
  arrayBuffer(): ArrayBuffer;
  type: string;
};

export const fileToDataUrl = async (file: File): Promise<string> => {
  const buff = Buffer.from(await file.arrayBuffer());
  const base64data = buff.toString('base64');

  return `data:${file.type};base64,${base64data}`;
};
