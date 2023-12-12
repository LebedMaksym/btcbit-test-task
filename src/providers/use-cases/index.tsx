import React, { PropsWithChildren } from "react";
import { UseBalance, useBalance } from "../../use-cases/use-balance";

interface IUseCasesContext {
  useBalance: UseBalance;
}

const useCases = {
  useBalance,
};

const UseCasesContext = React.createContext<IUseCasesContext>(useCases);

export const useUseCases = () => React.useContext(UseCasesContext);

export const UseCasesProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <UseCasesContext.Provider value={useCases}>
    {children}
  </UseCasesContext.Provider>
);
