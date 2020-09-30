const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectionString = require("./secret/secret.js").connectionString;
const user = require("./routes/api/user");
const admin = require("./routes/api/admin");

const app = express();
process.setMaxListeners(0);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.options("*", cors());

const db = process.env.MONGO_URI || connectionString;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection to database is done`);
  })
  .catch((err) => {
    console.error(`${err}`);
  });

app.use("/api/user", user);
app.use("/api/admin", admin);
const PORT = 3000 || process.env.PORT;
//starting point of the server is placed here
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
