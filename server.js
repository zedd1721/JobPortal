const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require('./routes/auth')

const app = express();

app.use(express.json());



app.get("/health", (req, res) => {
  console.log("Health API");
  res.json({
    service: "Backend Job Listing API",
    status: "OK",
    time: new Date().toLocaleString(),
  });
});

app.use("/api/v1/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port 5555");
  mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));
});
