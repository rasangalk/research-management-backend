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
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
const helloRoute = require("./routes/test-route");
const googleOAuth2Route = require("./routes/googleOAuth2Route");

app.use(cors());
app.use(express.json());
app.use("/templates", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", googleOAuth2Route);
app.use("/api", templateRoutes);
app.use("/api", topicRoutes);
app.use("/api", submissionRoutes);
app.use("/api", studentSubmissionRoutes);
app.use("/api", panelRoutes);
app.use("/api", markingSchemaRoutes);
app.use("/api", staffSchemaRoutes);
app.use("/", helloRoute);
