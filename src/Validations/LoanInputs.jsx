import * as yup from "yup";

// Validation for step 1: personal info
export const step1Schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  phoneNumber: yup
    .string()
    // REGEX: makes sure only digits are allowed (no letters, spaces, or symbols)
    .matches(/^\d+$/, "Phone number must be digits only")
    .required("Phone number is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  employed: yup.string().required("Employment status is required"),
  salary: yup
    .string()
    .required("Salary is required")
    .notOneOf(["0"], "Please select your salary range"),
});

// Validation for step 2: loan details
export const step2Schema = yup.object().shape({
  amount: yup
    .number()
    .min(1000, "Minimum amount is 1000")
    .max(50000)
    .required("Loan amount is required"),
  purpose: yup.string().required("Purpose is required"),
  paymentPeriod: yup
    .number()
    .min(1)
    .max(10)
    .required("Payback period is required"),
});
