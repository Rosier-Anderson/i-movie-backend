const handleNewUser = (req, res) => {
  const { user, pwd } = req.body;
  try {
    if (!user || !pwd)
      return res
        .status(400)
        .json({ msg: "Username and password are required." });
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
};
