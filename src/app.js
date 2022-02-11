const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const dbConnect = require("../configs/db");

const app = express();

// app middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: process.env.CLIENT_URI }));
}
// import routes
const authRoutes = require("../routes/authRoutes");

// middlewares
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening at PORT ${PORT}`);
  dbConnect();
});
