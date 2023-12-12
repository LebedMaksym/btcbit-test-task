import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { AuthState } from "../../constants";
import { IAuthService } from "../../services/auth-service";
import { otpSchema } from "../../utils/validation-schemas";

type SignInFormValues = {
  otp: string;
};

type Payload = {
  authService: IAuthService;
  setAuthState: (state: AuthState) => void;
};

export interface IUseSignInWithOtpFormInteractor {
  isSubmitting: FormikProps<SignInFormValues>["isSubmitting"];
  errors: FormikProps<SignInFormValues>["errors"];
  touched: FormikProps<SignInFormValues>["touched"];
  handleChange: FormikProps<SignInFormValues>["handleChange"];
  handleBlur: FormikProps<SignInFormValues>["handleBlur"];
  handleSubmit: FormikProps<SignInFormValues>["handleSubmit"];
}
type UseSignInWithOtpFormInteractor = (
  payload: Payload,
) => IUseSignInWithOtpFormInteractor;

export const useSignInWithOtpFormInteractor: UseSignInWithOtpFormInteractor = ({
  setAuthState,
  authService,
}) => {
  const otpForm = useFormik<SignInFormValues>({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: otpSchema,
    }),
    onSubmit: async (values) => {
      await authService.signinWithOtp(values.otp);
      setAuthState(AuthState.LoggedIn);
    },
  });

  return {
    ...otpForm,
  };
};
