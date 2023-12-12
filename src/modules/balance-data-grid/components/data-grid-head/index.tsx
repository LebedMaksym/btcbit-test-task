import { FC } from "react";
import { Col, Row } from "react-bootstrap";

type Props = {
  cols: unknown[] | undefined;
};

export const DataGridHead: FC<Props> = ({ cols = [] }) => {
  return (
    <thead>
      <tr>
        {cols.map((_, idx) => (
          <th key={idx} className="px-5">
            <Row className="justify-content-between">
              <Col className="text-secondary fs-6">Currency</Col>
              <Col className="d-flex justify-content-end text-secondary fs-6">
                Balance
              </Col>
            </Row>
          </th>
        ))}
      </tr>
    </thead>
  );
};
