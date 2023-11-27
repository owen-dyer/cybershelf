const express = require("express");
const db = require("../database/init");
const { createUserQuery } = require("../database/queries");
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Register request received at ${new Date().toUTCString()}`);
  next();
});

router
  .route("/")
  .get((req, res, next) => {
    res.render("pages/register", {
      title: "Registration Form",
    });
  })
  .post((req, res, next) => {
    console.log(`Email: ${req.body.email}`);

    // Bcrypt won't work for some reason so not implementing it for now...
    //   const passwordHash = await bcrypt.hash(req.body.password, 10);

    const userObj = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmpassword,
    };

    // Server-side check to make sure that they are the same since the client-side check and be bypassed
    if (userObj.password !== userObj.confirmPassword) {
      return res.status(401).json({
        message: "The password and password confirmation fields do not match",
      });
    }

    db.one(createUserQuery, [userObj.email, userObj.name, userObj.password])
      .then((ret) => {
        console.log(`Successfully created user ${ret.email}`);
        return res.status(200).json({
          email: ret.email,
        });
      })
      .catch((e) => {
        console.log(`Failed to create user. ${e.message || e}`);
        return res.status(500).json({
          error: e.message || e,
        });
      });
  });

module.exports = router;
