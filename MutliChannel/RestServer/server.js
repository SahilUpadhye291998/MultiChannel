const express = require("express");
const cors = require("cors");

const admin = require("./routes/api/admin");
const farmer = require("./routes/api/farmer");
const customer = require("./routes/api/customer");
const supplier = require("./routes/api/supplier");
const logistics = require("./routes/api/logistics");

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
app.use("/api/farmer", farmer);
app.use("/api/supplier", supplier);
app.use("/api/customer", customer);
app.use("/api/logistics", logistics);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, (req, res, next) => {
  console.log(`Server started at ${PORT}`);
});
