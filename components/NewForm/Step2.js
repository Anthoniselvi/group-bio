import React from "react";

const Step2 = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {/* Company */}
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleInputChange}
        placeholder="Company"
      />
      {/* Designation */}
      <input
        type="text"
        name="designation"
        value={formData.designation}
        onChange={handleInputChange}
        placeholder="Designation"
      />
      {/* Industry */}
      <input
        type="text"
        name="industry"
        value={formData.industry}
        onChange={handleInputChange}
        placeholder="Industry"
      />
      {/* Offers */}
      <input
        type="text"
        name="offers"
        value={formData.offers}
        onChange={handleInputChange}
        placeholder="Offers"
      />
    </div>
  );
};

export default Step2;
