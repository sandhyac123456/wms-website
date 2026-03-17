import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  images: [
    {
      type: String,
    }
  ],

  projectLink: {
    type: String,
  },

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  }

}, { timestamps: true });

export default mongoose.model("Project", projectSchema);