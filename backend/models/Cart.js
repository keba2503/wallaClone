"use strict";

const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  username: String,
  ads: [Object],
});

const Carts = mongoose.model("Carts", cartSchema);

module.exports = Carts;
