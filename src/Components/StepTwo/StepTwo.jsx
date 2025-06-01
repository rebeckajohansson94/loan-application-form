// StepTwo renders the second step of the form: loan details.
// Like StepOne, it highlights any fields with validation errors (from Yup) and shows the error message in red inside the label.

export default function StepTwo({ formErrors, formData, onChange }) {
  return (
    <>
      <label
        htmlFor="amount"
        className={formErrors.amount ? "error-label" : ""}
      >
        {formErrors.amount
          ? `Loan Amount (${formErrors.amount})`
          : `Loan Amount ($${formData.amount}):`}
      </label>
      <input
        onChange={onChange}
        name="amount"
        className="slider"
        id="amount"
        type="range"
        min="1000"
        max="50000"
        step="1000"
        value={formData.amount}
      />
      <label
        htmlFor="purpose"
        className={formErrors.purpose ? "error-label" : ""}
      >
        {formErrors.purpose
          ? `Purpose of the Loan? (${formErrors.purpose})`
          : "Purpose of the Loan?"}
      </label>
      <input
        onChange={onChange}
        value={formData.purpose}
        name="purpose"
        id="purpose"
        type="text"
        placeholder="Purpose of the Loan..."
      />
      <label
        htmlFor="paymentPeriod"
        className={formErrors.paymentPeriod ? "error-label" : ""}
      >
        {formErrors.paymentPeriod
          ? `Payback Period (${formErrors.paymentPeriod})`
          : "Payback Period (No. of Years):"}
      </label>
      <select
        name="paymentPeriod"
        id="paymentPeriod"
        onChange={onChange}
        value={formData.paymentPeriod}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <label htmlFor="comment">Comment:</label>
      <textarea
        onChange={onChange}
        value={formData.comment}
        name="comment"
        id="comment"
        rows="5"
        placeholder="Comment..."
      />
    </>
  );
}
