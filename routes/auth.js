const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth")
const { body, validationResult } = require("express-validator");

const User = require("../models/Users");

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server error')
  }
});

// @route     POST api/auth
// @desc      Auth user and get token
// @access    Public
router.post(
  "/",
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      await bcrypt.compare(`${password}`, `${user.password}`, (e, r) => {
        if (!r) return res.status(400).json({ msg: "Invalid credentials" });
      });
      
      const payload = {
        user: { id: user.id }
      }
      
      jwt.sign(
        payload,
        config.get('secret'),
        { expiresIn: '12h'},
        (err, token) => {
          if (err) throw err
          res.json({token})
        }
      ) 
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
