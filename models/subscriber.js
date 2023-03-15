import { mongoose, Schema } from "mongoose";

const subscriberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },

    zipCode: {
      type: Number,
      min: [10000, "Zip code Postal too short"],
      max: 99999,
    },

    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },

  { timestamps: true }
);

export const Subscriber = mongoose.model("Subscriber", subscriberSchema);
