import { splitArrayIntoChunks } from "./index";

describe("splitArrayIntoChunks", () => {
  it("splits the array into chunks of the specified size", () => {
    const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const chunkSize = 3;

    const result = splitArrayIntoChunks(inputArray, chunkSize);

    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  it("handles arrays with length not evenly divisible by chunkSize", () => {
    const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const chunkSize = 4;

    const result = splitArrayIntoChunks(inputArray, chunkSize);

    expect(result).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9]]);
  });

  it("handles empty arrays", () => {
    const inputArray: number[] = [];
    const chunkSize = 3;

    const result = splitArrayIntoChunks(inputArray, chunkSize);

    expect(result).toEqual([]);
  });

  it("handles arrays with length less than chunkSize", () => {
    const inputArray = [1, 2];
    const chunkSize = 3;

    const result = splitArrayIntoChunks(inputArray, chunkSize);

    expect(result).toEqual([[1, 2]]);
  });
});
