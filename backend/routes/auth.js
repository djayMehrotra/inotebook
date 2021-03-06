const express = require('express');
const router = express.Router();
const User = require('../models/Users');

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Dannyisagoodb$oy";

// Route 1:: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }

  // check whether the user with this email already exists 
  try {
    //Logger
    //SQS
    // using if in case db error occurs
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      return res.status(400).json({success,  error: "Sorry user already exists with this email id" })
    }

    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);
    const saltRounds = 10;
    /* const secPass = bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt);
    }); */


    /* why to use jwt? after login  we give a token and not the user detials or his hash*/

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email
    })

    const data = {
      user: {
        id: user.id
      }
    }

    const jwtData = jwt.sign(data, JWT_SECRET);
    console.log(jwtData);

    //res.json({authtoken});
    success = true;
    res.json({success, user});
  } catch (error) {
    console.error(error);
    res.status(500).send("Create User :: Internal server error occured");
  }

});

// Route 2:: Login a user using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("hai error");
    return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with existing user" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success,  error: "Please try to login with correct password" })
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    const authtoken = jwt.sign(payload, JWT_SECRET);
    success = true
    res.json({success, authtoken});

  } catch (error) {
    console.error(error);
    res.status(500).send( success, "Login :: Internal server error occured");
  }

});

// Route 3:: Getting a loggedin user details using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
  console.log("user :1::");
  try {
    userId = req.user.id;
    console.log("user :::");
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
  
}
  
);

module.exports = router

/*
http://localhost:3000/api/auth
*/

