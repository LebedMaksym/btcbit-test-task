import { Col, Container, Row } from "react-bootstrap";
import { useSignInPageInteractor } from "./interactor";
import { SignInForm } from "../signin-form";
import { SignInWithOtpForm } from "../signin-with-otp-form";

export const SignInPage = () => {
  const { isOtpModalVisible, onSignInSuccess } = useSignInPageInteractor();

  return (
    <>
      <Container className="pt-5">
        <h2 className="text-center">Sign In</h2>
        <Row className="justify-content-center h-100">
          <Col lg={6}>
            <SignInForm onSuccess={onSignInSuccess} />
          </Col>
        </Row>
      </Container>
      {isOtpModalVisible && <SignInWithOtpForm />}
    </>
  );
};
