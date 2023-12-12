import { Container } from "react-bootstrap";
import { BalanceDataGrid } from "../balance-data-grid";
import styles from "./index.module.css";

export const BalancePage = () => {
  return (
    <main className={`flex-grow-1 ${styles.page}`}>
      <Container className="pt-5">
        <BalanceDataGrid apiRoute="/currencies" />
        <BalanceDataGrid apiRoute="/not-found" className="mt-5" />
      </Container>
    </main>
  );
};
