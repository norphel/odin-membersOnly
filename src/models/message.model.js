import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
