import { Router } from "express";
import {
  createSubscriber,
  getAllSuscribers,
  getSuscriberbyId,
  joinCourse,
  removeSubscriber,
  updateSubscriberById,
} from "../Controllers/subscriberController.js";

export const subscriberRouter = Router();

subscriberRouter.get("/", getAllSuscribers);
subscriberRouter.post("/create", createSubscriber);
subscriberRouter.get("/:id", getSuscriberbyId);
subscriberRouter.post("/id/join", joinCourse)
subscriberRouter.put("/:id/update", updateSubscriberById);
subscriberRouter.delete("/:id/delete", removeSubscriber);
