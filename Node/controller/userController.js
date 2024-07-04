import User from "../model/userModel.js";
import { checkValidation } from "../middleware/validation.js";

export const create = async (req, res) => {
  try {
    const errors = checkValidation(req.body);
    if (errors !== "") {
      return res.status(400).json({ errors: errors });
    } else {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res
        .status(200)
        .json({ message: "User created successfully", user: savedUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
