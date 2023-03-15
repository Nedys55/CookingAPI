import { Router } from "express";
import {
  createCourse,
  getAllCourse,
  getCourseById,
  removeCourse,
  updateCourseById,
} from "../Controllers/courseController.js";

export const courseRouter = Router();

courseRouter.get("/", getAllCourse);

courseRouter.post("/create", createCourse);

courseRouter.get("/:id", getCourseById);

courseRouter.put("/:id/update", updateCourseById);

courseRouter.delete("/:id/delete", removeCourse);