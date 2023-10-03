const handleFieldChange = (
  event,
  fieldLabel,
  setInputFieldValues,
  setFieldErrors,
  validateField,
  setErrorState
) => {
  const newValue = event.target.value;

  // Validate the field and store the error in the fieldErrors state
  let validationFunction = null;

  switch (fieldLabel) {
    case "name":
      validationFunction = validateStep1;
      break;
    case "course":
      validationFunction = validateStep1;
      break;
    case "year":
      validationFunction = validateStep1;
      break;
    case "location":
      validationFunction = validateStep1;
      break;
    case "company":
      validationFunction = validateStep2;
      break;
    case "designation":
      validationFunction = validateStep2;
      break;
    case "industry":
      validationFunction = validateStep2;
      break;
    case "offers":
      validationFunction = validateStep2;
      break;
    case "linkedin":
      validationFunction = validateStep3;
      break;
    case "website":
      validationFunction = validateStep3;
      break;
    default:
      break;
  }

  if (validationFunction) {
    const error = validationFunction(newValue);
    switch (fieldLabel) {
      case "name":
        setIsNameError(!!error.name);
        if (error.name) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldLabel]: "",
          }));
        }
        break;
      case "course":
        setIsCourseError(!!error.course);
        if (error.course) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldLabel]: "",
          }));
        }
        break;
      case "year":
        setIsYearError(!!error.year);
        if (error.year) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldLabel]: "",
          }));
        }
        break;
      case "location":
        setIsLocationError(!!error.location);
        if (error.location) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldLabel]: "",
          }));
        }
        break;
      case "company":
        setIsCompanyError(!!error.company);
        if (error.company) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldLabel]: "",
          }));
        }
        break;
      case "designation":
        setIsDesignationError(!!error.designation);
        if (error.designation) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldLabel]: "",
          }));
        }
        break;
      case "industry":
        setIsIndustryError(!!error.industry);
        if (error.industry) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldLabel]: "",
          }));
        }
        break;
      case "offers":
        setIsOffersError(!!error.offers);
        if (error.offers) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldLabel]: "",
          }));
        }
        break;
      case "linkedin":
        setIsLinkedinError(!!error.linkedin);
        if (error.linkedin) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldLabel]: "",
          }));
        }
        break;
      case "website":
        setIsWebsiteError(!!error.website);
        if (error.website) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [fieldLabel]: "",
          }));
        }
        break;
      default:
        break;
    }
  }

  // Update the field value in the inputFieldValues state
  setInputFieldValues((prevValues) => ({
    ...prevValues,
    [fieldLabel]: newValue,
  }));

  const currentStepFilledFields = filledFields[activeStep];
  if (newValue) {
    currentStepFilledFields.add(fieldLabel);
  } else {
    currentStepFilledFields.delete(fieldLabel);
  }
};
