import { useCallback, useEffect, useState } from "react";
import { BalanceWithCurrencyCode } from "../../types";
import { Status } from "../../constants";
import { mapBalance } from "../../utils/mappers";
import { useServices } from "../../providers/services";

export interface IUseBalance {
  balances: BalanceWithCurrencyCode[];
  status: Status;
  removeItem: (currencyCode: string) => void;
}
export type Payload = {
  apiRoute: string;
};
export type UseBalance = (payload: Payload) => IUseBalance;

export const useBalance: UseBalance = ({ apiRoute }) => {
  const { balanceService } = useServices();
  const [balances, setBalances] = useState<BalanceWithCurrencyCode[] | null>(
    null,
  );
  const [status, setStatus] = useState(Status.Loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await balanceService.getBalance(apiRoute);
        setBalances(mapBalance(response));
      } catch {
        setStatus(Status.Error);
      }
    };
    fetchData();
  }, [balanceService, apiRoute]);

  useEffect(() => {
    if (balances == null) return;
    if (balances.length === 0) {
      setStatus(Status.Empty);
      return;
    }
    setStatus(Status.Loaded);
  }, [balances]);

  const removeItem: IUseBalance["removeItem"] = useCallback((currencyCode) => {
    setBalances((prev) => {
      if (prev == null) return prev;
      return prev.filter((balance) => balance.currencyCode !== currencyCode);
    });
  }, []);

  return {
    balances: balances ?? [],
    removeItem,
    status,
  };
};
