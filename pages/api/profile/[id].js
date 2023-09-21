// pages/api/profile/[id].js
import dbConnect from "@/util/mongo";
import Profile from "@/models/ProfileSchema";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  await dbConnect();

  if (method === "GET") {
    try {
      if (!id) {
        res.status(400).json({ error: "ID parameter is required" });
        return;
      }

      // Retrieve a single profile by ID
      const profile = await Profile.findById(_id);

      if (!profile) {
        res.status(404).json({ error: "Profile not found" });
        return;
      }

      res.status(200).json(profile);
    } catch (err) {
      console.error("Error fetching profile:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
