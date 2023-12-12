import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../../providers/auth";
import { ServicesProvider } from "../../providers/services";
import { WithAuthGuard } from "../../hoc/with-auth-guard";
import { AuthState } from "../../constants";
import { SignInPage } from "../signin-page";
import { BalancePage } from "../balance-page";
import { UseCasesProvider } from "../../providers/use-cases";

const SignIn = WithAuthGuard(() => <SignInPage />, {
  requiredAuthState: AuthState.LoggedOut,
  redirectTo: "/",
});

const Balance = WithAuthGuard(() => <BalancePage />, {
  requiredAuthState: AuthState.LoggedIn,
  redirectTo: "/signin",
});

export const Root: React.FC = () => {
  return (
    <AuthProvider>
      <ServicesProvider>
        <UseCasesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Balance />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </BrowserRouter>
        </UseCasesProvider>
      </ServicesProvider>
    </AuthProvider>
  );
};
