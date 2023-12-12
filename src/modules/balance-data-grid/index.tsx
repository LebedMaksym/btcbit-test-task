import { Col, Row, Table } from "react-bootstrap";
import { useBalanceDataGridInteractor } from "./interactor";
import { ComponentProps, FC } from "react";
import { useUseCases } from "../../providers/use-cases";
import { Status } from "../../constants";
import { DataGridHead } from "./components/data-grid-head";
import { DataGridRow } from "./components/data-grid-row";
import { ColumnsAmountControls } from "./components/columns-amount-controls";
import cx from "classnames";
import { Stub } from "./components/stub";

type Props = {
  apiRoute: string;
} & ComponentProps<"div">;

export const BalanceDataGrid: FC<Props> = ({ apiRoute, className }) => {
  const { useBalance } = useUseCases();

  const {
    balancesByRows,
    status,
    displayedColsAmount,
    isAddColumnDisabled,
    isRemoveColumnDisabled,
    addColumn,
    removeColumn,
    removeItem,
  } = useBalanceDataGridInteractor({
    useBalance,
    apiRoute,
  });

  return (
    <Row className={cx("justify-content-center bg-white rounded", className)}>
      {
        {
          [Status.Loaded]: (
            <>
              <Row className="d-flex mt-3 justify-content-between">
                <Col>
                  <h5 className="fw-bold">Balances</h5>
                </Col>
                <ColumnsAmountControls
                  isAddColumnDisabled={isAddColumnDisabled}
                  isRemoveColumnDisabled={isRemoveColumnDisabled}
                  colsAmount={displayedColsAmount}
                  addColumn={addColumn}
                  removeColumn={removeColumn}
                />
              </Row>
              <div className="overflow-auto px-0 pt-0 pb-3">
                <Table className="mt-3" striped hover>
                  <DataGridHead cols={balancesByRows[0]} />
                  <tbody>
                    {balancesByRows.map((row, idx) => (
                      <DataGridRow
                        onRemoveItem={removeItem}
                        key={idx}
                        row={row}
                        colsAmount={displayedColsAmount}
                      />
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          ),
          [Status.Loading]: <Stub.Loading />,
          [Status.Error]: <Stub.Error />,
          [Status.Empty]: <Stub.Empty />,
        }[status]
      }
    </Row>
  );
};
