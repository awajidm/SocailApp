const express = require("express");
const mongoose = require("mongoose");
const { DB, PORT } = require("./keys");

//connect db
mongoose.connect(DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Conncted to mongo!!");
});
mongoose.connection.on("error", (err) => {
  console.log("Conncted to mongo!!", err);
});

//model imports

require("./models/userModel");
require("./models/postModel");

const app = express();
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen(PORT, () => {
  console.log(`lising at ${PORT}`);
});
