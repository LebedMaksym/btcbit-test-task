import { useMemo, useState } from "react";
import { Status } from "../../constants";
import { BalanceWithCurrencyCode } from "../../types";
import { UseBalance } from "../../use-cases/use-balance";
import { splitArrayIntoChunks } from "../../utils/helpers";

type Payload = {
  apiRoute: string;
  useBalance: UseBalance;
};

export interface IUseBalanceDataGridInteractor {
  balancesByRows: BalanceWithCurrencyCode[][];
  status: Status;
  isAddColumnDisabled: boolean;
  isRemoveColumnDisabled: boolean;
  displayedColsAmount: number;
  addColumn: () => void;
  removeColumn: () => void;
  removeItem: (currencyCode: string) => void;
}

type UseBalanceDataGridInteractor = (
  payload: Payload,
) => IUseBalanceDataGridInteractor;

export const DEFAULT_COLS_AMOUNT = 3;

export const useBalanceDataGridInteractor: UseBalanceDataGridInteractor = ({
  apiRoute,
  useBalance,
}) => {
  const [colsAmount, setColsAmount] = useState(DEFAULT_COLS_AMOUNT);

  const { balances, removeItem, status } = useBalance({ apiRoute });

  const displayedColsAmount = useMemo(() => {
    if (balances.length < colsAmount) return balances.length;
    return colsAmount;
  }, [colsAmount, balances]);

  const balancesByRows = useMemo(() => {
    return splitArrayIntoChunks(
      balances,
      displayedColsAmount,
    ) as BalanceWithCurrencyCode[][];
  }, [balances, displayedColsAmount]);

  return {
    status,
    balancesByRows,
    displayedColsAmount,
    isAddColumnDisabled: displayedColsAmount === balances.length,
    isRemoveColumnDisabled: displayedColsAmount === 1,
    addColumn: () => setColsAmount((prev) => prev + 1),
    removeColumn: () => setColsAmount((prev) => prev - 1),
    removeItem,
  };
};
