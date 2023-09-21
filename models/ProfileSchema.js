import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: Number, required: true },
    location: { type: String, required: true },
    phone: { type: Number, required: true },
    photo: { type: String, required: true },
    company: { type: String, required: true },
    designation: { type: String, required: true },
    industry: { type: String, required: true },
    offers: { type: String, required: true },
    linkedin: { type: String, required: true },
    website: { type: String, required: true },
  },
  { timestamps: true }
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);
export default Profile;
