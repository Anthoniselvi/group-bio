import { connectToDatabase } from "../../../util/mongo";
import Profile from "../../../models/ProfileSchema";

export default async function handler(req, res) {
  const { method } = req;

  // Connect to the database
  await connectToDatabase();

  console.log("Server: Handling request for method:", method);
  console.log("Server: Profile model:", Profile);

  if (method === "GET") {
    console.log("Server: Handling GET request");
    try {
      console.log("Server: Before fetching profiles");
      const profiles = await Profile.find();
      console.log("Server: After fetching profiles", profiles);

      res.status(200).json(profiles);
    } catch (err) {
      console.error("Server: An error occurred:", err);
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    console.log("Server: Handling POST request");
    try {
      const profile = await Profile.create(req.body);
      console.log("Server: Created profile:", profile);
      res.status(201).json(profile);
    } catch (err) {
      console.error("Server: An error occurred:", err);
      res.status(500).json(err);
    }
  }
}
