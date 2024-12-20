import day4 from "./index";

const TEST_INPUT_FILE = "./src/2024/day04/testInput.txt";

describe("day4", () => {
  describe("day4", () => {
    it("handles demo input for part 1 correctly", async () => {
      const [part1] = await day4(TEST_INPUT_FILE);

      expect(part1).toBe(18);
    });

    it("handles demo input for part 2 correctly", async () => {
      const [, part2] = await day4(TEST_INPUT_FILE);

      expect(part2).toBe(9);
    });
  });
});
