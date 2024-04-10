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

messageSchema.virtual("formattedCreationDate").get(function () {
  const createdAt = this.createdAt;
  const month = createdAt.getMonth() + 1;
  const day = createdAt.getDate();
  const year = createdAt.getFullYear();
  return `${month}/${day}/${year}`;
});

export const Message = mongoose.model("Message", messageSchema);
