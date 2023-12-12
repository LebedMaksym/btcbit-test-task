import { ComponentType } from "react";
import { AuthState } from "../../constants";
import { useAuth } from "../../providers/auth";
import { Navigate } from "react-router-dom";

type Payload = {
  requiredAuthState: AuthState;
  redirectTo: string;
};

export const WithAuthGuard = <P extends object>(
  WrappedComponent: ComponentType<P>,
  payload: Payload,
) => {
  const WithAuthGuard: React.FC<P> = (props) => {
    const { authState } = useAuth();

    if (authState === payload.requiredAuthState)
      return <WrappedComponent {...props} />;

    return <Navigate to={payload.redirectTo} />;
  };

  return WithAuthGuard;
};
