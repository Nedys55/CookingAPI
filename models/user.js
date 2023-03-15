import { mongoose, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },

    zipCode: {
      type: Number,
      min: [1000, "ZipCode is too short"],
      max: 99999,
    },

    password: {
      type: String,
      required: true,
    },

    token: {
      type: String,
    },

    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    subscribedAccount: {
      type: Schema.Types.ObjectId,
      ref: "Subscriber",
    },
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
