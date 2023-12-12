import { FC } from "react";
import { Button, Col } from "react-bootstrap";
import cx from "classnames";
import styles from "./index.module.css";

type Props = {
  isAddColumnDisabled: boolean;
  isRemoveColumnDisabled: boolean;
  colsAmount: number;
  addColumn: () => void;
  removeColumn: () => void;
};

export const ColumnsAmountControls: FC<Props> = ({
  isAddColumnDisabled,
  isRemoveColumnDisabled,
  colsAmount,
  addColumn,
  removeColumn,
}) => {
  return (
    <Col className="d-flex align-items-end justify-content-end">
      <span className="px-4">Columns: {colsAmount}</span>
      <Button
        variant="dark"
        size="sm"
        disabled={isRemoveColumnDisabled}
        className={cx("me-1", styles.button)}
        onClick={removeColumn}
      >
        -
      </Button>
      <Button
        variant="dark"
        size="sm"
        disabled={isAddColumnDisabled}
        className={cx(styles.button)}
        onClick={addColumn}
      >
        +
      </Button>
    </Col>
  );
};
