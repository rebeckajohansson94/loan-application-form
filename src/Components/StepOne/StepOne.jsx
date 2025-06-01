// StepOne renders the first step of the form: personal information.
// If any field has a validation error (from Yup), it highlights the label in red and shows the error message.

export default function StepOne({ formErrors, formData, onChange }) {
  return (
    <>
      <label
        htmlFor="fullName"
        className={formErrors.fullName ? "error-label" : ""}
      >
        {formErrors.fullName
          ? `Full Name (${formErrors.fullName})`
          : "Full Name:"}
      </label>
      <input
        id="fullName"
        name="fullName"
        type="text"
        placeholder="Full Name..."
        onChange={onChange}
        value={formData.fullName}
      />

      <label
        htmlFor="phone"
        className={formErrors.phoneNumber ? "error-label" : ""}
      >
        {formErrors.phoneNumber
          ? `Phone Number (${formErrors.phoneNumber})`
          : "Phone Number:"}
      </label>
      <input
        id="phone"
        name="phoneNumber"
        type="tel"
        placeholder="Phone Number..."
        onChange={onChange}
        value={formData.phoneNumber}
      />

      <label
        htmlFor="dateofbirth"
        className={formErrors.dateOfBirth ? "error-label" : ""}
      >
        {formErrors.dateOfBirth
          ? `Date of Birth (${formErrors.dateOfBirth})`
          : "Date of Birth:"}
      </label>
      <input
        id="dateofbirth"
        name="dateOfBirth"
        type="date"
        placeholder="Date of birth..."
        onChange={onChange}
        value={formData.dateOfBirth}
      />

      <fieldset>
        <legend className={formErrors.employed ? "error-label" : ""}>
          {formErrors.employed
            ? `Are you employed? (${formErrors.employed})`
            : "Are you employed?"}
        </legend>
        <div className="employment">
          <input
            type="radio"
            id="employed"
            name="employed"
            value="Yes"
            onChange={onChange}
            checked={formData.employed === "Yes"}
          />
          <label htmlFor="employed">Yes</label>

          <input
            type="radio"
            id="not_employed"
            name="employed"
            value="No"
            onChange={onChange}
            checked={formData.employed === "No"}
          />
          <label htmlFor="not_employed">No</label>
        </div>
      </fieldset>

      <label
        htmlFor="salary"
        className={formErrors.salary ? "error-label" : ""}
      >
        {formErrors.salary
          ? `Monthly Salary (${formErrors.salary})`
          : "Monthly Salary:"}
      </label>
      <select
        name="salary"
        id="salary"
        value={formData.salary}
        onChange={onChange}
      >
        <option value="0" disabled>
          Monthly Salary...
        </option>
        <option value="0-1000">$0-1000</option>
        <option value="1001-2000">$1001-2000</option>
        <option value="2001-3000">$2001-3000</option>
        <option value="3001+">$3001 or above</option>
      </select>

      {/* Displays a warning if salary is too low */}
      {formData.salary === "0-1000" && (
        <em>Please note: Low salary can affect your loan application</em>
      )}
    </>
  );
}
