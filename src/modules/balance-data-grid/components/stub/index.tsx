import { FC } from "react";
import styles from "./index.module.css";
import cx from "classnames";
import { Spinner } from "react-bootstrap";

const Empty: FC = () => {
  return (
    <div
      className={cx(
        styles.stub,
        "d-flex justify-content-center align-items-center fs-5",
      )}
    >
      There is now data to display
    </div>
  );
};

const Error: FC = () => {
  return (
    <div
      className={cx(
        styles.stub,
        "d-flex justify-content-center align-items-center fs-5",
      )}
    >
      Sorry, We couldn't find your balances
    </div>
  );
};

const Loading: FC = () => {
  return (
    <div
      className={cx(
        styles.stub,
        "d-flex justify-content-center align-items-center fs-5",
      )}
    >
      <Spinner animation="grow" className="me-3" size="sm" variant="dark" />
      <div>Loading...</div>
    </div>
  );
};

export const Stub = {
  Empty,
  Error,
  Loading,
};
