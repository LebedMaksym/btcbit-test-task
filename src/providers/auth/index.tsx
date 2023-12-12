import React, { PropsWithChildren, useState } from "react";
import { noop } from "../../utils/helpers";
import { AuthState } from "../../constants";

interface IAuthContext {
  authState: AuthState;
  setAuthState: (value: AuthState) => void;
}

const AuthContext = React.createContext<IAuthContext>({
  authState: AuthState.LoggedOut,
  setAuthState: noop,
});

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState(AuthState.LoggedOut);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
