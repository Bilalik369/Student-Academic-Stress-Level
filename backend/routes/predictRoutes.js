import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      Your_Academic_Stage,
      Peer_pressure,
      Academic_pressure_from_your_home,
      Study_Environment,
      Coping_Strategy,
      Bad_Habits,
      Academic_Competition
    } = req.body;

    const response = await axios.post("http://localhost:8000/predict", {
      Your_Academic_Stage,
      Peer_pressure,
      Academic_pressure_from_your_home,
      Study_Environment,
      Coping_Strategy,
      Bad_Habits,
      Academic_Competition
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Prediction error:", error.message);
    res.status(500).json({ 
      message: "Error getting prediction", 
      error: error.message 
    });
  }
});

export default router;

