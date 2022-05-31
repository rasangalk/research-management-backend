const express = require("express");
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//environment variable
env.config();

//MongoDB connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@sliit-research-tool.gmahe.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected !!");
  });
app.listen(process.env.PORT, () => {
  console.log(`Server in running on port ${process.env.PORT}`);
});

//--------------------------------------------------------------------------

//routes
const authRoutes = require("./routes/auth");
const templateRoutes = require("./routes/template");
const topicRoutes = require("./routes/topic");
const submissionRoutes = require("./routes/submission");
const studentSubmissionRoutes = require("./routes/student-submission");
const panelRoutes = require("./routes/panel");
const markingSchemaRoutes = require("./routes/markingSchema");
const staffSchemaRoutes = require("./routes/staff");

app.use(cors());
app.use(express.json());
app.use("/templates", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", templateRoutes);
app.use("/api", topicRoutes);
app.use("/api", submissionRoutes);
app.use("/api", studentSubmissionRoutes);
app.use("/api", panelRoutes);
app.use("/api", markingSchemaRoutes);
app.use("/api", staffSchemaRoutes);
