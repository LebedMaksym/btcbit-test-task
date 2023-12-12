import { currencyCodesById } from "../../constants";
import { Balance } from "../../types";

export const mapBalance = (data: Balance[]) => {
  return data.map(({ amount, updatedAt, currencyId }) => {
    return {
      amount: amount,
      updatedAt: updatedAt,
      currencyCode: currencyCodesById[currencyId],
    };
  });
};
