import { FC } from "react";
import { Button, ButtonProps, Spinner } from "react-bootstrap";

type Props = {
  isLoading: boolean;
} & ButtonProps;

export const ButtonWithLoader: FC<Props> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button {...props}>
      {isLoading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        children
      )}
    </Button>
  );
};
