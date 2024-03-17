const express = require("express");
const connection = require("./config/db");
const { userRoute } = require("./router/userrouter");
const { auth } = require("./middleware/authmiddle");
const { roleroute } = require("./router/roleroute");
const { access } = require("./middleware/accessmiddle");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/user", userRoute);
app.use("/book", roleroute);

app.get("/", auth, access("CREATOR"), (req, res) => {
  res.json({ msg: "This is the home page" });
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`serer is running ${process.env.PORT}`);
    console.log("connection DB");
  } catch (err) {
    console.log(err);
  }
});
