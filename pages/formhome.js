import React from "react";
import { userInputs } from "@/components/NewForm/FormSource";
import FormPage from "@/components/NewForm/formpage";
import Form from "@/components/Home/Form";
import HomePage from "@/components/Home/homepage";

const FormHomePage = () => {
  return (
    <div>
      {/* <FormPage inputs={userInputs} title="Add New User" /> */}
      <HomePage />
      {/* <Form /> */}
    </div>
  );
};

export default FormHomePage;
