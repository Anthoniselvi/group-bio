const handler = (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.status(200).json("signed Successfully");
    } else {
      res.status(400).json("Wrong Credentials!");
    }
  }
};

export default handler;
