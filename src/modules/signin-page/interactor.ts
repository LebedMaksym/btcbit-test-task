import { useState } from "react";

export interface IUseSignInPageInteractor {
  isOtpModalVisible: boolean;
  onSignInSuccess: () => void;
}
type UseSignInPageInteractor = () => IUseSignInPageInteractor;

export const useSignInPageInteractor: UseSignInPageInteractor = () => {
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);

  return {
    isOtpModalVisible,
    onSignInSuccess: () => setIsOtpModalVisible(true),
  };
};
