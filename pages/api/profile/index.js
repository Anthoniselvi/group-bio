import dbConnect from "../../../util/mongo";
import Profile from "../../../models/ProfileSchema";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const profiles = await Profile.find();
      res.status(200).json(profiles);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const profile = await Profile.create(req.body);
      res.status(201).json(profile);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
