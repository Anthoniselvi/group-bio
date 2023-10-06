import axios from "axios";
import { validateStep1, validateStep2, validateStep3 } from "./Validation";

const handleSubmit = (inputFieldValues, groupId, router) => {
  const step1Errors = validateStep1(inputFieldValues);
  const step2Errors = validateStep2(inputFieldValues);
  const step3Errors = validateStep3(inputFieldValues);

  const combinedErrors = {
    ...step1Errors,
    ...step2Errors,
    ...step3Errors,
  };

  if (Object.keys(combinedErrors).length > 0) {
    setFieldErrors(combinedErrors);
  } else {
    inputFieldValues.groupId = groupId;
    const formData = new FormData();

    for (const fieldLabel in inputFieldValues) {
      formData.append(fieldLabel, inputFieldValues[fieldLabel]);
      console.log(`Appended ${fieldLabel}: ${inputFieldValues[fieldLabel]}`);
    }
    console.log("formData: " + JSON.stringify(inputFieldValues));

    axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/add`, inputFieldValues)
      .then((response) => {
        console.log("Profile added successfully!");

        router.push({
          pathname: "/",
        });
      })
      .catch((error) => {
        console.error("Error adding profile: ", error);
      });
  }
};

export default handleSubmit;
