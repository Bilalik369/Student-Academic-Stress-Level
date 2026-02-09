import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  inputs: Object,

  stressLevel: Number,
  category: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Prediction", predictionSchema);
