import React from "react";

const Step3 = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {/* LinkedIn Profile */}
      <input
        type="text"
        name="linkedin"
        value={formData.linkedin}
        onChange={handleInputChange}
        placeholder="LinkedIn Profile"
      />
      {/* Personal Website */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleInputChange}
        placeholder="Personal Website"
      />
    </div>
  );
};

export default Step3;
