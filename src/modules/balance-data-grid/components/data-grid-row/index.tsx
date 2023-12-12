import { FC, useMemo } from "react";
import { BalanceWithCurrencyCode } from "../../../../types";
import styles from "./index.module.css";
import cx from "classnames";
import { CloseButton } from "react-bootstrap";

type Props = {
  row: BalanceWithCurrencyCode[];
  colsAmount: number;
  onRemoveItem: (currencyCode: string) => void;
};

export const DataGridRow: FC<Props> = ({ row, colsAmount, onRemoveItem }) => {
  const placeholders = useMemo(() => {
    if (row.length < colsAmount)
      return new Array(colsAmount - row.length).fill(0);
    return [];
  }, [row, colsAmount]);

  return (
    <tr className={styles.row}>
      {row.map((balance, idx) => (
        <td key={idx} className={cx("px-5 position-relative", styles.cell)}>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-medium">{balance.currencyCode}</span>
            <span className="d-flex text-secondary justify-content-end">
              {balance.amount}
            </span>
            <CloseButton
              onClick={() => onRemoveItem(balance.currencyCode)}
              className={styles.remove_button}
            />
          </div>
        </td>
      ))}
      {placeholders.map((_, idx) => (
        <td
          key={idx}
          className={cx(styles.cell, styles["cell--placeholder"])}
        />
      ))}
    </tr>
  );
};
