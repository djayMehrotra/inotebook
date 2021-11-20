const express = require('express');
const router = express.Router();
const User = require('../models/Users');

const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "Dannyisagoodb$oy";

// Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
], async (req, res)=>{
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // check whether the user with this email already exists 
    try {
      //Logger
      //SQS
      // using if in case db error occurs
    let user = await User.findOne({email: req.body.email});
    console.log(user);
    if(user){
      return res.status(400).json({error: "Sorry user already exists with this email id"})
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
        user:{
          id: user.id
        }
      }

      /* const jwtData = jwt.sign(data, JWT_SECRET);
      console.log(jwtData); */
      
      const authtoken = jwt.sign(data, JWT_SECRET);

      //res.json({authtoken});
      res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).send("Some error occured");
      }

});

module.exports = router

/* 
http://localhost:3000/api/auth
*/

