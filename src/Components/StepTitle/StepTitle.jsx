//

export default function StepTitle({ step, stepTitle }) {
  return (
    <p className="step-title">
      Step {step}: {stepTitle[step - 1]}
    </p>
  );
}
