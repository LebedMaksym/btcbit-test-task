import { renderHook, waitFor } from "@testing-library/react";
import { Status } from "../../constants";
import {
  DEFAULT_COLS_AMOUNT,
  useBalanceDataGridInteractor,
} from "./interactor";
import { act } from "react-dom/test-utils";

describe("useBalanceDataGridInteractor", () => {
  const mockUseBalance = jest.fn();
  const mockRemoveItem = jest.fn();

  const payload = {
    apiRoute: "/balances",
    useBalance: mockUseBalance,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("initializes with default values", () => {
    mockUseBalance.mockReturnValue({
      balances: [{}, {}, {}, {}, {}],
      removeItem: mockRemoveItem,
      status: Status.Loaded,
    });

    const { result } = renderHook(() => useBalanceDataGridInteractor(payload));

    waitFor(() => expect(result.current.status).toBe(Status.Loaded));
    waitFor(() => expect(result.current.balancesByRows.length).toEqual(2));
    waitFor(() =>
      expect(result.current.displayedColsAmount).toBe(DEFAULT_COLS_AMOUNT),
    );
    waitFor(() => expect(result.current.isAddColumnDisabled).toBeFalsy());
    waitFor(() => expect(result.current.isRemoveColumnDisabled).toBeTruthy());
  });

  it("calculates displayedColsAmount correctly when balances are less than colsAmount", () => {
    mockUseBalance.mockReturnValue({
      balances: [{}, {}],
      removeItem: mockRemoveItem,
      status: Status.Loaded,
    });

    const { result } = renderHook(() => useBalanceDataGridInteractor(payload));

    waitFor(() => expect(result.current.displayedColsAmount).toBe(2));
    waitFor(() => expect(result.current.isAddColumnDisabled).toBeFalsy());
    waitFor(() => expect(result.current.isRemoveColumnDisabled).toBeTruthy());
  });

  it("calculates displayedColsAmount correctly when balances are greater than colsAmount", () => {
    mockUseBalance.mockReturnValue({
      balances: [{}, {}, {}, {}],
      removeItem: mockRemoveItem,
      status: Status.Loaded,
    });

    const { result } = renderHook(() => useBalanceDataGridInteractor(payload));

    expect(result.current.displayedColsAmount).toBe(DEFAULT_COLS_AMOUNT);
    expect(result.current.isAddColumnDisabled).toBeFalsy();
    expect(result.current.isRemoveColumnDisabled).toBeFalsy();
  });

  it("disables add column button when displayedColsAmount equals balances length", () => {
    mockUseBalance.mockReturnValue({
      balances: [{}, {}],
      removeItem: mockRemoveItem,
      status: Status.Loaded,
    });

    const { result } = renderHook(() => useBalanceDataGridInteractor(payload));

    expect(result.current.isAddColumnDisabled).toBeTruthy();
  });

  it("disables remove column button when displayedColsAmount equals 1", () => {
    mockUseBalance.mockReturnValue({
      balances: [{}],
      removeItem: mockRemoveItem,
      status: Status.Loaded,
    });

    const { result } = renderHook(() => useBalanceDataGridInteractor(payload));

    expect(result.current.isRemoveColumnDisabled).toBeTruthy();
  });

  it("calls addColumn correctly", () => {
    mockUseBalance.mockReturnValue({
      balances: [{}, {}, {}],
      removeItem: mockRemoveItem,
      status: Status.Loaded,
    });

    const { result } = renderHook(() => useBalanceDataGridInteractor(payload));

    act(() => {
      result.current.addColumn();
    });

    waitFor(() =>
      expect(result.current.displayedColsAmount).toBe(DEFAULT_COLS_AMOUNT + 1),
    );
  });

  it("calls removeColumn correctly", () => {
    mockUseBalance.mockReturnValue({
      balances: [{}, {}],
      removeItem: mockRemoveItem,
      status: Status.Loaded,
    });

    const { result } = renderHook(() => useBalanceDataGridInteractor(payload));

    act(() => {
      result.current.removeColumn();
    });

    waitFor(() =>
      expect(result.current.displayedColsAmount).toBe(DEFAULT_COLS_AMOUNT - 1),
    );
  });

  it("calls removeItem correctly", () => {
    mockUseBalance.mockReturnValue({
      balances: [{ currencyCode: "USD" }],
      removeItem: mockRemoveItem,
      status: Status.Loaded,
    });

    const { result } = renderHook(() => useBalanceDataGridInteractor(payload));

    act(() => {
      result.current.removeItem("USD");
    });

    waitFor(() => expect(mockRemoveItem).toHaveBeenCalledWith("USD"));
  });
});
