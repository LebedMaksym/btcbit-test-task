export const noop = () => {};

export const splitArrayIntoChunks = (array: unknown[], chunkSize: number) => {
  return Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
    array.slice(i * chunkSize, i * chunkSize + chunkSize),
  );
};
