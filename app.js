require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db/models");
const {
  examineeRoute,
  courseRoute,
  questionRoute,
  examRoute,
  choicesRoute,
  answerRoute,
} = require("./routes/index");

const app = express();
const port = process.env.APP_PORT;

app.use(express.json());
app.use(cors());
app.use("/api/v1/examinee", examineeRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/exam", examRoute);
app.use("/api/v1/question", questionRoute);
app.use("/api/v1/choices", choicesRoute);
app.use("/api/v1/answer", answerRoute);

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Route not found",
  });
});

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });
