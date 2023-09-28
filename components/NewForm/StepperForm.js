import React, { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase"; // Make sure to import your Firebase configuration

const StepperForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    image: "", // Store the image download URL here
    name: "",
    course: "",
    year: "",
    location: "",
    phone: "",
    company: "",
    designation: "",
    industry: "",
    offers: "",
    linkedin: "",
    website: "",
  });
  const [file, setFile] = useState(null);
  const [per, setPerc] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    let isDataValid = true; // Assume data is initially valid

    if (step === 1) {
      // Validate data for Step 1
      if (
        !formData.name ||
        !formData.course ||
        !formData.year ||
        !formData.location ||
        !formData.phone ||
        !file
      ) {
        // If any of the required fields are missing, data is considered invalid
        isDataValid = false;
        alert(
          "Please fill out all required fields in Step 1 and select an image."
        );
      }
      // You can add more specific validation rules here if needed
    } else if (step === 2) {
      // Validate data for Step 2
      if (
        !formData.company ||
        !formData.designation ||
        !formData.industry ||
        !formData.offers
      ) {
        // If any of the required fields are missing, data is considered invalid
        isDataValid = false;
        alert("Please fill out all required fields in Step 2.");
      }
      // You can add more specific validation rules here if needed
    }

    if (isDataValid) {
      setStep(step + 1);
    }
    // You can add more steps and validations as needed
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Validate data for the final step (Step 3) if needed
    if (step === 3) {
      if (!formData.linkedin || !formData.website) {
        // If any of the required fields are missing, data is considered invalid
        alert("Please provide LinkedIn profile and personal website.");
        return;
      }
    }

    // Upload image to Firebase Storage and obtain download URL
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle upload progress if needed
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Upload completed successfully, get download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Include the download URL in the formData
          setFormData((prevData) => ({ ...prevData, image: downloadURL }));

          // Now, you can save the data to MongoDB
          saveDataToMongoDB();
        });
      }
    );
  };

  const saveDataToMongoDB = async () => {
    try {
      // Send a POST request to your MongoDB server with the data
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile/add`,
        formData
      );

      console.log("Profile data added successfully to MongoDB!");
      // Optionally, you can reset the form or perform any other actions after submission
    } catch (error) {
      console.error("Error adding profile data to MongoDB: ", error);
    }
  };

  return (
    <div style={{ paddingTop: "20vh" }}>
      {/* Render the appropriate step component based on the current step */}
      {step === 1 && (
        <Step1
          formData={formData}
          setFormData={setFormData}
          setFile={setFile}
        />
      )}
      {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
      {step === 3 && <Step3 formData={formData} setFormData={setFormData} />}

      {/* Buttons for navigating between steps */}
      <button onClick={handleBack} disabled={step === 1}>
        Back
      </button>
      <button onClick={handleNext} disabled={step === 3}>
        Next
      </button>

      {/* Submit button for the final step */}
      {step === 3 && (
        <button onClick={handleAdd} type="submit">
          Submit
        </button>
      )}
    </div>
  );
};

export default StepperForm;
