import { Subscriber } from "../models/subscriber.js";
import * as dotenv from "dotenv";
import { Course } from "../models/course.js";

dotenv.config();

export const getAllSuscribers = async (req, res) => {
  try {
    const subscriber = await Subscriber.find({}).populate("courses", "_id");
    res.status(200).send(subscriber);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error get all subscribers",
      success: false,
      error,
    });
  }
};

export const createSubscriber = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!(name && email)) {
      return res.status(400).send({
        success: false,
        message: "name and email are required",
      });
    }

    const subscriber = await Subscriber.create(req.body);

    return res.status(200).send({
      success: true,
      message: "Subscriber created successfully",
      subscriber,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error created subscriber",
      success: false,
      error,
    });
  }
};

export const getSuscriberbyId = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id).populate(
      "courses",
      "_id"
    );
    res.status(200).send(subscriber);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error get course",
      success: false,
      error,
    });
  }
};

export const joinCourse = async (req, res) => {
  try {
    // const course = await Course.findById(req.params.id);


    const subscriber = await Subscriber.findOne({email});
    if (subscriber) {
      sub.courses.push(Course.findById(req.params.id))
    }

    await subscriber.save()

    res.status(200).send({
      success: true,
      message: "Course joined successfully",
      subscriber,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error join course",
      success: false,
      error,
    });
  }
};

export const updateSubscriberById = async (req, res) => {
  try {
    await Subscriber.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "subscriber updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error updating subscriber",
      success: false,
      error,
    });
  }
};

export const removeSubscriber = async (req, res) => {
  try {
    await Subscriber.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: "subscriber deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "error deleting subscriber",
      success: false,
      error,
    });
  }
};
