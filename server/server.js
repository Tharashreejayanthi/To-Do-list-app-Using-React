const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todoapp");

const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server started on port 5000"));