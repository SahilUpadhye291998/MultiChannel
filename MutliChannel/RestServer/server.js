const express = require("express");
const cors = require("cors");

const admin = require("./routes/api/admin");

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());
app.options("*", cors());

app.use("/api/admin", admin);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, (req, res, next) => {
  console.log(`Server started at ${PORT}`);
});
