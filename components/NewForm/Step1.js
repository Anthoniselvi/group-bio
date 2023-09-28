import React from "react";

const Step1 = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {/* Image Upload */}
      <input
        type="file"
        name="image"
        onChange={handleInputChange}
        accept="image/*"
      />
      {/* Name */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      {/* Course */}
      <input
        type="text"
        name="course"
        value={formData.course}
        onChange={handleInputChange}
        placeholder="Course"
      />
      {/* Year */}
      <input
        type="text"
        name="year"
        value={formData.year}
        onChange={handleInputChange}
        placeholder="Year"
      />
      {/* Location */}
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        placeholder="Location"
      />
      {/* Phone */}
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone"
      />
    </div>
  );
};

export default Step1;
