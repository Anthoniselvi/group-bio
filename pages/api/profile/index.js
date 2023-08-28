import dbConnect from "@/util/mongo";
import ProfileSchema from "@/models/ProfileSchema";

export default async function handler(req, res) {
  const { method, cookies } = req;

  //   const token = cookies.token;

  dbConnect();

  if (method === "GET") {
    try {
      const profiles = await ProfileSchema.find();
      res.status(200).json(profiles);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    // if (!token || token !== process.env.token) {
    //   return res.status(401).json("Not authenticated!");
    // }
    console.log("profileschema: " + ProfileSchema);
    try {
      const profile = await ProfileSchema.create(req.body);
      console.log("profile: " + profile);
      res.status(201).json(profile);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
