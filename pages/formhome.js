import React from "react";
import { userInputs } from "@/components/NewForm/FormSource";
import FormPage from "@/components/NewForm/formpage";

const FormHomePage = () => {
  return (
    <div>
      <FormPage inputs={userInputs} title="Add New User" />
    </div>
  );
};

export default FormHomePage;
