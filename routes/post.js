const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.post("/createpost", (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({ error: "please add fields" });
  }
  console.log(req.user);
  res.send("ok");
  //   const post = new post({
  //     title,
  //     body,
  //     postedBy
  //   });
});

module.exports = router;
