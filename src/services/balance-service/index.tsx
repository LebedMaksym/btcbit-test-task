import { Balance } from "../../types";
import { BaseService } from "../base-service";

export interface IBalanceService {
  getBalance: (apiRoute: string) => Promise<Balance[]>;
}

class BalanceService extends BaseService implements IBalanceService {
  public getBalance: IBalanceService["getBalance"] = (apiRoute) => {
    return this.get<Balance[]>(apiRoute);
  };
}

export const balanceService = new BalanceService();

export class BalanceServiceStub implements IBalanceService {
  public getBalance: IBalanceService["getBalance"] = jest.fn();
}
