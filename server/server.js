const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const mongoCon = require("./database/MongoConnect");
const auth = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UserRoutes")
app.use(cors());
//decode req.body (form-data)
app.use(express.urlencoded({ extended: true }));
//decode req.body (post body message)
app.use(express.json());

app.use("/auth", auth);
app.use("/user",userRoutes)

app.get("/", (req, res) => {
  res.send("ABC");
});

const port = process.env.PORT || 3001;

app.listen(3001, () => {
  console.log(`Listen on http://localhost:${port} !`);
});
