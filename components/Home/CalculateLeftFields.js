import { steps } from "./steps";

export const calculateStepStatus = () => {
  const stepStatus = [...steps];
  let totalFilledMandatoryFields = 0;

  stepStatus.forEach((step) => {
    const filledMandatoryFieldsInStep = step.fields.filter(
      (field) =>
        inputFieldValues[field.label] || inputFieldValues[field.label] === ""
    ).length;

    totalFilledMandatoryFields += filledMandatoryFieldsInStep;

    step.status = `${
      step.fields.length - filledMandatoryFieldsInStep
    } fields left`;
  });

  return stepStatus;
};
