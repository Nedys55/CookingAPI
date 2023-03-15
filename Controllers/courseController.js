import { Course } from "../models/course.js";

export const getAllCourse = async (req, res) => {
  try {
    const course = await Course.find({});
    res.status(200).send(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error get all courses",
      success: false,
      error,
    });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(200).json({
      success: true,
      message: "new course created successfully",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error creating courses",
      success: false,
      error,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    res.status(200).send(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error get course",
      success: false,
      error,
    });
  }
};

export const updateCourseById = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "course updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error updating course",
      success: false,
      error,
    });
  }
};

export const removeCourse = async (req, res) => {
  try {
    await Course.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "course deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "error deleting course",
      success: false,
      error,
    });
  }
};
