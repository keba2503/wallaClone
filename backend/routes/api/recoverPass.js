"use strict";

const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const jwt = require("jsonwebtoken");
const app = express();

router.post("/", async (req, res, next) => {
  const email = req.body.email;
  app.set("email", email);

  const userData = req.body;

  const users = new Users(userData)

  const user = await Users.findOne({ email: email });

  if (!user) {
    res.send({
      success: false,
      msj: "This email does not exist",
    });
    return;
  }


  res.json({
    success: true,
    msj: "Verifique en su email el correo de recuperación",
    link: 'https://localhost:3000/newpassword'
  });

  await users.sendEmail(
    process.env.ADMIN_EMAIL,
    "Recover password",
    `
    <p>click 
    <a href=https://localhost:3000/newpassword>here</a>
    to reset password
    </p>
    `
  );
});

router.put("/", async (req, res, next) => {
  const email = app.get("email");
  const password = await Users.hashPassword(req.body.password);
  const userData = req.body;
  const users = new Users(userData)

  const user = await Users.findOne({ email: email });

  if (!user) {
    res.send({ msj: "you must receive a gmail to change the password" });
    return;
  }

  const resetPass = await Users.findOneAndUpdate(
    { _id: user._id },
    { password },
    {
      new: true,
      useFindAndModify: false,
    }
  );

  await users.sendEmail(
    process.env.ADMIN_EMAIL,
    "Recover password",
    `
    Su contraseña ha sido cambiada.
    `
    );
  app.set("email", null);

  res.send({
    success: true,
    result: resetPass,
    msj: "Su contraseña ha sido cambiada",
  });

 
  

});

module.exports = router;
