import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { useSignInWithOtpFormInteractor } from "./interactor";
import { useAuth } from "../../providers/auth";
import { useServices } from "../../providers/services";

export const SignInWithOtpForm = () => {
  const { setAuthState } = useAuth();
  const { authService } = useServices();

  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useSignInWithOtpFormInteractor({
    setAuthState,
    authService,
  });

  return (
    <Modal show={true}>
      <Modal.Header closeButton={false}>
        <Modal.Title>Please, Enter One Time Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="p-3" noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="otp">
            <Form.Label>One Time Password</Form.Label>
            <Form.Control
              disabled={isSubmitting}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              placeholder="Enter password"
              isInvalid={touched.otp && Boolean(errors.otp)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.otp}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={isSubmitting}
            className="w-100"
            variant="dark"
            type="submit"
          >
            {isSubmitting ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Sign In"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
