import { User } from "../models/user.js";
import { Subscriber } from "../models/subscriber.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { encryptPassword, validatePassword } from "../middleware/password.js";

dotenv.config();

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error get all subscribers",
      success: false,
      error,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!(name && lastName && email && password)) {
      return res.status(400).send({
        success: false,
        message: "All input are required",
      });
    }

    const user = await User.create(req.body);
    user.password = await encryptPassword(req.body.password);

    const isSubscribe = await Subscriber.findOne({ email });
    if (isSubscribe) {
      user.subscribedAccount = isSubscribe._id;
    }

    const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    user.token = token;

    await user.save();

    return res.status(200).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error created user",
      success: false,
      error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send({
        success: false,
        message: "email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user does not exist",
      });
    } else if (!(await validatePassword(req.body.password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "password does not match",
      });
    } else if (
      user &&
      (await validatePassword(req.body.password, user.password))
    ) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      await user.save();
      return res.status(200).send({
        success: true,
        message: "user connected successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error login user",
      success: false,
      error,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    req.logout();
    res.send("successfully logout");
    res.redirect("/api/users/login");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error logout user",
      success: false,
      error,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error get user",
      success: false,
      error,
    });
  }
};

export const updateUserById = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "user updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error updating user",
      success: false,
      error,
    });
  }
};

export const removeUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "user deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "error deleting user",
      success: false,
      error,
    });
  }
};
