// pages/api/profile/index.js
import dbConnect from "@/util/mongo";
import Profile from "@/models/ProfileSchema";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const Profiles = await Profile.find();
      res.status(200).json(Profiles);
    } catch (err) {
      console.error("Error fetching profiles:", err); // Log the error
      res.status(500).json({ error: "Internal Server Error" }); // Respond with an error message
    }
  }

  if (method === "POST") {
    try {
      const newprofile = await Profile.create(req.body);
      console.log("newprofile:" + JSON.stringify(newprofile));
      res.status(201).json(newprofile);
    } catch (err) {
      console.error("Error creating profile:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default handler;
