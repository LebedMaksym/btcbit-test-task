import * as Yup from "yup";

export const otpSchema = Yup.string()
  .min(6, "one time password should be longer than 6 characters")
  .max(15, "one time password should be shorter than 15 characters")
  .required("one time password is required field");

export const emailSchema = Yup.string()
  .required()
  .email("must be a valid email")
  .max(255, "email should be shorter than 255 characters");

export const passwordSchema = Yup.string()
  .required()
  .min(6, "password should be longer than 6 characters")
  .max(15, "password should be shorter than 15 characters");
