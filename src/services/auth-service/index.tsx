import { BaseService } from "../base-service";

export interface IAuthService {
  signin: (payload: { email: string; password: string }) => Promise<void>;
  signinWithOtp: (otp: string) => Promise<void>;
}

class AuthService extends BaseService {
  public signin: IAuthService["signin"] = async ({ email, password }) => {
    await this.post<void>();
    if (email === "incorrect@email.com" || password === "incorrect-password") {
      throw {
        status: 401,
        message: "Invalid credentials",
      };
    }
  };

  public signinWithOtp: IAuthService["signinWithOtp"] = () => {
    return this.post<void>();
  };
}

export const authService = new AuthService();
