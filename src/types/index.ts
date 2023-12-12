export type Balance = {
  amount: string;
  updatedAt: string;
  currencyId: string;
};

export type BalanceWithCurrencyCode = Omit<Balance, "currencyId"> & {
  currencyCode: string;
};

export type ServiceError = {
  status: number;
  message: string;
};
