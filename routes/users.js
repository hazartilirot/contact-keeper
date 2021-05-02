const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

const User = require("../models/Users");

// @router      POST api/users
// @desc        Register a user
// @access      Public
router.post(
  "/",
  body("name", "Please, add a name").notEmpty(),
  body("email", "Please, include a valid email").isEmail(),
  body(
    "password",
    "Please,enter a password with 6 or more characters"
  ).isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) return res.status(400).json({ msg: "User already exists" });

      user = new User({ name, email, password });

      await bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(`${password}`, salt, (err, hash) => {
          user.password = hash;
          user.save();
        })
      );

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        config.get("secret"),
        { expiresIn: "12h" },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Error server");
    }
  }
);
module.exports = router;
