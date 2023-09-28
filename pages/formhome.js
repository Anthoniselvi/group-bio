import React from "react";
import { userInputs } from "@/components/NewForm/FormSource";
import FormPage from "@/components/NewForm/formpage";
import StepperForm from "@/components/NewForm/StepperForm";
import Form from "@/components/Home/Form";

const FormHomePage = () => {
  return (
    <div>
      {/* <FormPage inputs={userInputs} title="Add New User" /> */}
      {/* <StepperForm inputs={userInputs} title="Add New User" /> */}
      <Form />
    </div>
  );
};

export default FormHomePage;
