import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
  removeUser,
  updateUserById,
} from "../Controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/:id", getUserById);
userRouter.put("/:id/update", verifyToken, updateUserById);
userRouter.delete("/:id/delete", verifyToken, removeUser);
