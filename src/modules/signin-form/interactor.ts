import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { IAuthService } from "../../services/auth-service";
import { ServiceError } from "../../types";
import { emailSchema, passwordSchema } from "../../utils/validation-schemas";

type SignInFormValues = {
  email: string;
  password: string;
};

type Payload = {
  authService: IAuthService;
  onSuccess: () => void;
};

export interface IUseSignInFormInteractor {
  isSubmitting: FormikProps<SignInFormValues>["isSubmitting"];
  errors: FormikProps<SignInFormValues>["errors"];
  touched: FormikProps<SignInFormValues>["touched"];
  handleChange: FormikProps<SignInFormValues>["handleChange"];
  handleBlur: FormikProps<SignInFormValues>["handleBlur"];
  handleSubmit: FormikProps<SignInFormValues>["handleSubmit"];
}
type UseSignInFormInteractor = (payload: Payload) => IUseSignInFormInteractor;

export const useSignInFormInteractor: UseSignInFormInteractor = ({
  authService,
  onSuccess,
}) => {
  const signinForm = useFormik<SignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: emailSchema,
      password: passwordSchema,
    }),
    onSubmit: async (values, helpers) => {
      try {
        await authService.signin(values);
        onSuccess();
      } catch (error: unknown) {
        const message = (error as ServiceError).message;
        helpers.setErrors({ email: message, password: message });
      }
    },
  });

  return { ...signinForm };
};
