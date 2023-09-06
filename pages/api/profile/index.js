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
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const newprofile = await Profile.create(req.body);
      console.log("newprofile:" + JSON.stringify(newprofile));
      res.status(201).json(newprofile);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
