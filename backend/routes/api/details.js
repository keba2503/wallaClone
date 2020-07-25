"use strict";

const express = require("express");
const router = express();

const Ads = require("../../models/Anuncios");
const Cart = require("../../models/Cart");

router.get("/", async (req, res, next) => {
  try {
    const id_cards = req.query.id;
    const Id = {};
    Id.id = id_cards;
    const ads = await Ads.list(Id);
    res.send({
      result: 
      ads,
      msj: "",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
