const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const admin = require("./routes/api/admin");
const customer = require("./routes/api/customer");
const supplier = require("./routes/api/supplier");
const farmer = require("./routes/api/farmer");
const logistics = require("./routes/api/logistics");

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.options("*", cors());

app.use("/api/admin", admin);
app.use("/api/customer", customer);
app.use("/api/supplier", supplier);
app.use("/api/farmer", farmer);
app.use("/api/logistics", logistics);
//
//start server.
const PORT = 5000 || process.env.PORT;
app.listen(PORT, (req, res, next) => {
  console.log(`Server started at ${PORT}`);
});
