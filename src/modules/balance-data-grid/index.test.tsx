import { render } from "@testing-library/react";
import { BalanceDataGrid } from ".";
import * as interactor from "./interactor";
import { Status } from "../../constants";

jest.mock("../../utils/config", () => ({
  config: {
    baseApiUrl: "http://localhost:3000",
  },
}));

jest.mock("./components/columns-amount-controls/index.module.css", () => ({
  button: "",
}));
jest.mock("./components/data-grid-row/index.module.css", () => ({
  row: "",
  cell: "",
  remove_button: "",
}));
jest.mock("./components/stub/index.module.css", () => ({ stub: "" }));

describe("BalanceDataGrid", () => {
  it("renders correctly in the loading state", () => {
    jest
      .spyOn(interactor, "useBalanceDataGridInteractor")
      .mockImplementation(() => ({
        balancesByRows: [[]],
        status: Status.Loading,
        displayedColsAmount: 1,
        isAddColumnDisabled: true,
        isRemoveColumnDisabled: true,
        addColumn: jest.fn(),
        removeColumn: jest.fn(),
        removeItem: jest.fn(),
      }));
    const { container } = render(<BalanceDataGrid apiRoute="/balances" />);
    expect(container).toMatchSnapshot();
  });

  it("renders correctly in the loaded state", () => {
    jest
      .spyOn(interactor, "useBalanceDataGridInteractor")
      .mockImplementation(() => ({
        balancesByRows: [
          [
            {
              currencyCode: "USD",
              amount: "100",
              updatedAt: "date",
            },
          ],
        ],
        status: Status.Loaded,
        displayedColsAmount: 1,
        isAddColumnDisabled: false,
        isRemoveColumnDisabled: false,
        addColumn: jest.fn(),
        removeColumn: jest.fn(),
        removeItem: jest.fn(),
      }));
    const { container } = render(<BalanceDataGrid apiRoute="/balances" />);
    expect(container).toMatchSnapshot();
  });

  it("renders correctly in the error state", () => {
    jest
      .spyOn(interactor, "useBalanceDataGridInteractor")
      .mockImplementation(() => ({
        balancesByRows: [[]],
        status: Status.Error,
        displayedColsAmount: 3,
        isAddColumnDisabled: true,
        isRemoveColumnDisabled: true,
        addColumn: jest.fn(),
        removeColumn: jest.fn(),
        removeItem: jest.fn(),
      }));
    const { container } = render(<BalanceDataGrid apiRoute="/balances" />);
    expect(container).toMatchSnapshot();
  });

  it("renders correctly in the empty state", () => {
    jest
      .spyOn(interactor, "useBalanceDataGridInteractor")
      .mockImplementation(() => ({
        balancesByRows: [[]],
        status: Status.Empty,
        displayedColsAmount: 1,
        isAddColumnDisabled: true,
        isRemoveColumnDisabled: true,
        addColumn: jest.fn(),
        removeColumn: jest.fn(),
        removeItem: jest.fn(),
      }));
    const { container } = render(<BalanceDataGrid apiRoute="/balances" />);
    expect(container).toMatchSnapshot();
  });
});
