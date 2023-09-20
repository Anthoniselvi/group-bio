// pages/api/profile/index.js
import dbConnect from "@/util/mongo";
import Profile from "../../../models/ProfileSchema";
import multer from "multer";

dbConnect();

const upload = multer({ dest: "public/uploads/" });

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const profiles = await Profile.find({});
        res.status(200).json({ success: true, data: profiles });
      } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
      }
      break;

    case "POST":
      try {
        const profileData = req.body;
        console.log("Received profile data:", profileData);

        // Your code to save the data to the database

        res.status(201).json({ success: true, data: profileData });
      } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ success: false, error: "Bad Request" });
      }
      break;

    default:
      res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
