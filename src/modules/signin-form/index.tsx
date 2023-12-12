import { FC } from "react";
import { Form } from "react-bootstrap";
import { useSignInFormInteractor } from "./interactor";
import { useServices } from "../../providers/services";
import { ButtonWithLoader } from "../../components/shared/button-with-loader";

interface IProps {
  onSuccess: () => void;
}

export const SignInForm: FC<IProps> = ({ onSuccess }) => {
  const { authService } = useServices();

  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useSignInFormInteractor({
    onSuccess,
    authService,
  });

  return (
    <Form className="p-3" noValidate onSubmit={handleSubmit}>
      <Form.Group className="mt-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          disabled={isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          placeholder="Enter email"
          isInvalid={touched.email && Boolean(errors.email)}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mt-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          disabled={isSubmitting}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          placeholder="Enter password"
          isInvalid={touched.password && Boolean(errors.password)}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <ButtonWithLoader
        disabled={isSubmitting}
        isLoading={isSubmitting}
        className="w-100 mt-3"
        variant="dark"
        type="submit"
      >
        Sign In
      </ButtonWithLoader>
    </Form>
  );
};
