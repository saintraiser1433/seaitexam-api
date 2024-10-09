require("dotenv").config();
const express = require("express");
const { sequelize } = require("./db/models");
const examineeRoute = require("./routes/examineeRoute");
const courseRoute = require("./routes/courseRoute");
const questionRoute = require("./routes/questionRoute");
const examRoute = require("./routes/examRoute");
const app = express();
const port = process.env.APP_PORT;
app.use(express.json());

app.use("/api/v1/examinee", examineeRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/exam", examRoute);
app.use("/api/v1/question", questionRoute);

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Route not found",
  });
});

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
