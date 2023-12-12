import { mapBalance } from "./index.ts";
import { currencyCodesById } from "../../constants";

describe("mapBalance", () => {
  it("maps the balance data correctly", () => {
    const balances = [
      { amount: "100", updatedAt: "2023-01-01", currencyId: "1" },
      { amount: "200", updatedAt: "2023-01-02", currencyId: "2" },
      { amount: "200", updatedAt: "2023-01-02", currencyId: "3" },
      { amount: "200", updatedAt: "2023-01-02", currencyId: "4" },
      { amount: "200", updatedAt: "2023-01-02", currencyId: "5" },
    ];

    const mappedData = mapBalance(balances);

    expect(mappedData).toHaveLength(balances.length);

    mappedData.forEach((item, index) => {
      const { amount, updatedAt, currencyCode } = item;
      const {
        amount: originalAmount,
        updatedAt: originalUpdatedAt,
        currencyId,
      } = balances[index];

      expect(amount).toEqual(originalAmount);
      expect(updatedAt).toEqual(originalUpdatedAt);
      expect(currencyCode).toEqual(currencyCodesById[currencyId]);
    });
  });
});
