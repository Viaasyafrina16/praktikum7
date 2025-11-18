const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes");
require("./config/db"); // menjalankan koneksi database

dotenv.config();

const app = express();

// Middleware umum
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routing utama
app.use("/api", router);

// Root test
app.get("/", (req, res) => {
  res.json({
    message: "API Key System Running Successfully",
  });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
