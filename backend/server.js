import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectdb } from "./lib/db.js"
import authRoutes from "./routes/auth.routes.js"
import predictRoutes from "./routes/predictRoutes.js";

dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/predict", predictRoutes);

const PORT = process.env.PORT || 5000
connectdb()
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
// 