import { act, renderHook, waitFor } from "@testing-library/react";
import { useBalance, IUseBalance, Payload } from "./index.ts";
import { Status } from "../../constants/index.ts";

const mockBalanceServiceGetBalance = jest.fn();

jest.mock("../../providers/services", () => {
  return {
    useServices: () => ({
      balanceService: { getBalance: mockBalanceServiceGetBalance },
    }),
  };
});

describe("useBalance", () => {
  it("sets status to Error when fetching balances fails", async () => {
    mockBalanceServiceGetBalance.mockRejectedValueOnce(
      new Error("Fetch error"),
    );

    const { result } = renderHook<IUseBalance, Payload>(() =>
      useBalance({ apiRoute: "/balances" }),
    );

    await waitFor(() =>
      expect(mockBalanceServiceGetBalance).toHaveBeenCalledWith("/balances"),
    );
    waitFor(() => expect(result.current.status).toEqual(Status.Error));
  });

  it("sets status to Empty when balances length is 0", async () => {
    mockBalanceServiceGetBalance.mockResolvedValue([]);

    const { result } = renderHook<IUseBalance, Payload>(() =>
      useBalance({ apiRoute: "/balances" }),
    );

    await waitFor(() =>
      expect(mockBalanceServiceGetBalance).toHaveBeenCalledWith("/balances"),
    );

    waitFor(() => expect(result.current.status).toEqual(Status.Empty));
  });

  it("sets status to Loaded when balances fetched", async () => {
    mockBalanceServiceGetBalance.mockResolvedValue([
      { currencyId: "1", updatedAt: "date", amount: 100 },
    ]);

    const { result } = renderHook<IUseBalance, Payload>(() =>
      useBalance({ apiRoute: "/balances" }),
    );

    await waitFor(() =>
      expect(mockBalanceServiceGetBalance).toHaveBeenCalledWith("/balances"),
    );

    waitFor(() => expect(result.current.status).toEqual(Status.Loaded));
  });

  it("removes an item from balances", async () => {
    mockBalanceServiceGetBalance.mockResolvedValue([
      { currencyId: "1", updatedAt: "date", amount: 100 },
      { currencyId: "2", updatedAt: "date", amount: 100 },
    ]);
    const { result } = renderHook<IUseBalance, Payload>(() =>
      useBalance({ apiRoute: "/balances" }),
    );

    await waitFor(() =>
      expect(mockBalanceServiceGetBalance).toHaveBeenCalledWith("/balances"),
    );

    act(() => {
      result.current.removeItem("AUD");
    });

    expect(result.current.balances.length).toEqual(1);
  });
});
