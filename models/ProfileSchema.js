import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
    },
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
    phone: {
      type: String,
      required: true,
      length: 10,
    },
    photo: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
      maxlength: 200,
    },
    designation: {
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
    linkedin: {
      type: String,
      required: true,
      maxlength: 200,
    },
    website: {
      type: String,
      required: true,
      maxlength: 200,
    },
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

export default Profile;
