// StepThree renders the final step of the form: a summary of all the entered information.
// It includes a confirmation checkbox — the "Submit" button is disabled until this is checked.
// Here the handleSubmit() function is used to show the summary as a JavaScript objects in the console, reset the states to their initial valuesm present the user with a message and also clears localStorage.

export default function StepThree({ formData, onChange }) {
  return (
    <div className="summary-text">
      <p>
        <strong>Full Name:</strong> {formData.fullName}
      </p>
      <p>
        <strong>Phone Number:</strong> {formData.phoneNumber}
      </p>
      <p>
        <strong>Date of Birth:</strong> {formData.dateOfBirth}
      </p>
      <p>
        <strong>Employed:</strong> {formData.employed}
      </p>
      <p>
        <strong>Monthly Salary:</strong> ${formData.salary}
      </p>
      <p>
        <strong>Loan Amount:</strong> ${formData.amount}
      </p>
      <p>
        <strong>Purpose of Loan:</strong> {formData.purpose}
      </p>
      <p>
        <strong>Payment Period: </strong>
        {formData.paymentPeriod} Years
      </p>
      <p>
        <strong>Comment: </strong>
        {formData.comment}
      </p>

      {/* This checkbox must be checked in order to submit the form, else the submit button is disabled. This is to avoid clicking submit by accident */}
      <div>
        <input
          id="checkbox"
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={onChange}
        />
        <label htmlFor="checkbox">
          I confirm that the information provided above is accurate
        </label>
      </div>
    </div>
  );
}
