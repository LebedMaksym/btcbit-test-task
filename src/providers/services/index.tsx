import React, { PropsWithChildren } from "react";
import { IAuthService, authService } from "../../services/auth-service";
import {
  IBalanceService,
  balanceService,
} from "../../services/balance-service";

interface IServicesContext {
  authService: IAuthService;
  balanceService: IBalanceService;
}

const services = {
  authService,
  balanceService,
};

const ServicesContext = React.createContext<IServicesContext>(services);

export const useServices = () => React.useContext(ServicesContext);

export const ServicesProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <ServicesContext.Provider value={services}>
    {children}
  </ServicesContext.Provider>
);
