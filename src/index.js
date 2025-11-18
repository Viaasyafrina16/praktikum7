import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";
import "./config/db.js"; // menjalankan koneksi database

dotenv.config();
const app = express();

// Middleware umum
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routing
app.use("/api", router);

// Root test
app.get("/", (req, res) => {
  res.json({
    message: "API Key System Running Successfully",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
