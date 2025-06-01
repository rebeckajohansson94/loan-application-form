import { useEffect, useState } from "react";
import { step1Schema, step2Schema } from "../../Validations/LoanInputs";
import StepOne from "../StepOne/StepOne";
import StepTwo from "../StepTwo/StepTwo";
import StepThree from "../StepThree/StepThree";
import StepTitle from "../StepTitle/StepTitle";
import Submitted from "../Submitted/Submitted";

const stepTitle = ["Personal Info", "Loan Details", "Summary"];

//Gets saved form data from localStorage if it exists, otherwise returns the default empty values
const getInitialState = () => {
  const saved = localStorage.getItem("loanFormData");
  if (saved) {
    return JSON.parse(saved);
  } else {
    return {
      fullName: "",
      phoneNumber: "",
      dateOfBirth: "",
      employed: "",
      salary: "",
      amount: 0,
      purpose: "",
      paymentPeriod: 1,
      comment: "",
      agree: false,
    };
  }
};

export default function LoanForm() {
  // Sets the initial form data, either from localStorage or the default empty values
  const [formData, setFormData] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("loanFormData", JSON.stringify(formData));
  }, [formData]);

  const [showForm, setShowForm] = useState(true); // State for showing/hiding the form before/after submitting it
  const [step, setStep] = useState(1); // State used to set the current step in the multi-step form
  const [formErrors, setFormErrors] = useState({}); // Used by Yup for validation, shows errors

  const [isSubmitted, setIsSubmitted] = useState(false); // Sets the form as submitted (for further manipulation in the handleSubmit() function below)
  const [loading, setLoading] = useState(false); // Used for the loading animation after submitting the form

  // Gathers all form values into a summary object to be used on final submit
  const summary = {
    Fullname: `${formData.fullName}`,
    Phonenumber: `${formData.phoneNumber}`,
    DateOfBirth: `${formData.dateOfBirth}`,
    Employed: `${formData.employed}`,
    Salary: `${formData.salary}`,
    Amount: `${formData.amount}`,
    Purpose: `${formData.purpose}`,
    Paymentperiod: `${formData.paymentPeriod}`,
    Comment: `${formData.comment}`,
  };

  // Default values used for resetting the form when submitted
  const initialState = {
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    employed: "",
    salary: "0",
    amount: 0,
    purpose: "",
    paymentPeriod: 1,
    comment: "",
    agree: false,
  };

  const handleInputChange = (e) => {
    // Handles input changes: grabs 'name' and 'value' from the input, then updates the matching field in the form data
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Same as handleInputChange() above, but handles checkboxes (which do not provide a value)
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  function handlePrevious(e) {
    if (step > 1) setStep(step - 1);
    e.preventDefault();
  }

  // Validates current step's form data using the right schema. If valid, go to next step – if not, show all errors.
  async function handleNext(e) {
    e.preventDefault();

    let currentSchema = step === 1 ? step1Schema : step2Schema;

    try {
      await currentSchema.validate(formData, { abortEarly: false });
      setFormErrors({});
      setStep(step + 1);
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormErrors(errors);
      }
    }
  }

  // Submits the form: stops page reload, logs the summary, resets the form, and hides the form by setting its state to false
  function handleSubmit(e) {
    e.preventDefault();
    console.log(summary);

    setFormData(initialState);
    setShowForm(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false); // Displays the loading animation for 2 seconds
      setIsSubmitted(true); // Displays the submitted component after 2 seconds
    }, 2000);
  }

  // Renders the step form based on current step – shows StepOne, StepTwo, or StepThree
  return (
    <section className="steps-section">
      <div className="numbers">
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>

      {showForm === true ? (
        <StepTitle step={step} stepTitle={stepTitle} />
      ) : null}

      {loading && <div className="loading">Sending application...</div>}
      {!loading && isSubmitted && <Submitted />}

      <div className={showForm === true ? "form-section" : "hide-section"}>
        <form
          className="step-form"
          onSubmit={step === 3 ? handleSubmit : handleNext}
        >
          {step === 1 && (
            <StepOne
              onChange={handleInputChange}
              formData={formData}
              formErrors={formErrors}
            />
          )}
          {step === 2 && (
            <StepTwo
              onChange={handleInputChange}
              formData={formData}
              formErrors={formErrors}
            />
          )}
          {step === 3 && (
            <StepThree onChange={handleCheckbox} formData={formData} />
          )}
          <div className="buttons">
            <button
              className={step === 1 ? "prev-btn disable-btn" : "prev-btn"}
              type="button"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              disabled={step === 3 && !formData.agree}
              className="next-btn"
              type="submit"
            >
              {step === 3 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
