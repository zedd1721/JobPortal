const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const isExistinguser = await User.findOne({ email: "email" });
    if (isExistinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    const userDetails = await User.findOne({ email: email });
    if (!userDetails) {
      return res.status(400).json({ message: "User Does not exist." });
    }

    //compare the password
    const isMatch = await bcrypt.compare(password, userDetails.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match." });
    }

    res.json({ message: "Logged In" });
  } catch (err) {
    res.status(500).json({ message: "User Does not exist." });
  }
};

module.exports = { 
  registerUser, 
  loginUser,
};
