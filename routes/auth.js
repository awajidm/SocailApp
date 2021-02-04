const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requireLogin = require("../middleware/requireLogin");

router.get("/protected", requireLogin, (req, res) => {
  res.send("hello from prodected user");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password || !name) {
    res.status(422).json({ error: "please add the feilds" });
  }

  //finding exissted user
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "user Exists" });
      }
      //hashing th password
      bcrypt.hash(password, 10).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
        });

        user
          .save()
          .then((_user) => {
            res.json({ message: "saved in DB" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "add email and password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid email or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((domatch) => {
        if (domatch) {
          // res.json({ message: "logged in" });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          res.json({ token });
        } else {
          return res.status(422).json({ error: "invalid email or password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
