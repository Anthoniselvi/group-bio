import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
    },
    batch: {
      type: String,
      required: true,
      maxlength: 200,
    },
    location: {
      type: String,
      required: true,
      maxlength: 200,
    },
    dob: {
      type: String,
      required: true,
      maxlength: 200,
    },
    interests: {
      type: String,
      required: true,
      maxlength: 200,
    },
    photo: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      maxlength: 200,
    },
    company: {
      type: String,
      required: true,
      maxlength: 200,
    },
    industry: {
      type: String,
      required: true,
      maxlength: 200,
    },
    offers: {
      type: String,
      required: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

// export default mongoose.models.Profile ||
//   mongoose.model("Profile", ProfileSchema);
const Profiles = mongoose.model("Profiles", ProfileSchema);
module.exports = Profiles;
